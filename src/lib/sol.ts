import { get, put } from "@vercel/blob";
import { createHash, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { SolDraft } from "./sol-parse";

export type Sol = SolDraft & {
  /** Slovo z dílu. Prázdné = stránka se ptát nebude a odkaz uvidí každý. */
  word: string;
};

export type SolPhase = "upcoming" | "live" | "over";

const TZ = "Europe/Prague";
const BLOB_PATH = "sol.json";
const LOCAL_FILE = path.join(process.cwd(), ".data", "sol.json");

export const SOL_COOKIE = "sol_uvnitr";

/* ────────────── Úložiště: soukromý Vercel Blob na webu, soubor na lokálu ────────────── */

const usesBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function readSol(): Promise<Sol | null> {
  if (usesBlob()) {
    const res = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!res?.stream) return null;
    return (await new Response(res.stream).json()) as Sol;
  }

  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8")) as Sol;
  } catch {
    return null;
  }
}

export async function writeSol(sol: Sol): Promise<void> {
  if (usesBlob()) {
    await put(BLOB_PATH, JSON.stringify(sol), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(sol, null, 2));
}

/* ────────────── Slovo a klíč ────────────── */

export const normalizeWord = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "");

export function isWordRight(sol: Sol, attempt: string): boolean {
  return !sol.word || normalizeWord(attempt) === normalizeWord(sol.word);
}

export function unlockToken(sol: Sol): string {
  return createHash("sha256")
    .update(`${sol.date}:${normalizeWord(sol.word)}`)
    .digest("hex")
    .slice(0, 32);
}

export function isAdminKey(attempt: string | undefined): boolean {
  const key = process.env.SOL_ADMIN_KEY;
  if (!key || !attempt) return false;
  const a = Buffer.from(attempt);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

/* ────────────── Čas ────────────── */

/** Převede pražský čas z kalendáře na skutečný okamžik, včetně letního času. */
function pragueInstant(date: string, time: string): Date {
  const guess = new Date(`${date}T${time}:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(guess);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const seenInPrague = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
  );
  return new Date(guess.getTime() - (seenInPrague - guess.getTime()));
}

function solTimes(sol: Sol) {
  const start = pragueInstant(sol.date, sol.start);
  const end = pragueInstant(sol.date, sol.end);
  if (end <= start) end.setTime(end.getTime() + 864e5);
  return { start, end };
}

const OPENS_BEFORE_MS = 15 * 60e3;
const STAYS_AFTER_MS = 60 * 60e3;

export function solPhase(sol: Sol, now: Date = new Date()): SolPhase {
  const { start, end } = solTimes(sol);
  const t = now.getTime();
  if (t > end.getTime() + STAYS_AFTER_MS) return "over";
  if (t >= start.getTime() - OPENS_BEFORE_MS) return "live";
  return "upcoming";
}

const WEEKDAYS = [
  "v neděli",
  "v pondělí",
  "v úterý",
  "ve středu",
  "ve čtvrtek",
  "v pátek",
  "v sobotu",
];

const hourPreposition = (hour: number) =>
  [2, 3, 4, 12, 13, 14, 20, 21, 22, 23].includes(hour) ? "ve" : "v";

export function solLabels(sol: Sol, now: Date = new Date()) {
  const { start } = solTimes(sol);
  const raw = new Intl.DateTimeFormat("cs-CZ", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(start);
  const day = (raw[0].toUpperCase() + raw.slice(1)).replace(
    /(\d+\.) /,
    "$1 ",
  );

  const today = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now);
  const diff = Math.round(
    (Date.parse(`${sol.date}T12:00:00Z`) - Date.parse(`${today}T12:00:00Z`)) /
      864e5,
  );
  const relative =
    diff === 0
      ? "dnes"
      : diff === 1
        ? "zítra"
        : diff < 7
          ? WEEKDAYS[new Date(`${sol.date}T12:00:00Z`).getUTCDay()]
          : day.replace(/^\S+ /, "");

  return {
    day,
    time: `${sol.start}–${sol.end}`,
    when: `${relative} ${hourPreposition(parseInt(sol.start, 10))} ${sol.start}`,
  };
}
