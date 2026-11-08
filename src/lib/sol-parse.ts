export type SolDraft = {
  title: string;
  date: string; // YYYY-MM-DD, pražský kalendář
  start: string; // HH:MM
  end: string; // HH:MM
  meetUrl: string;
};

const MONTHS: Record<string, number> = {
  ledna: 1,
  unora: 2,
  brezna: 3,
  dubna: 4,
  kvetna: 5,
  cervna: 6,
  cervence: 7,
  srpna: 8,
  zari: 9,
  rijna: 10,
  listopadu: 11,
  prosince: 12,
};

const plain = (s: string) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

const pad = (n: number | string) => String(n).padStart(2, "0");

/**
 * Vytáhne z textu pozvánky Google Kalendáře název, den, čas a odkaz na Meet.
 * Vrací jen to, co v textu opravdu našel; zbytek se doplní ručně ve formuláři.
 */
export function parseInvite(
  raw: string,
  now: Date = new Date(),
): Partial<SolDraft> {
  const text = raw.normalize("NFC");
  const out: Partial<SolDraft> = {};

  const meet = text.match(/(?:https?:\/\/)?meet\.google\.com\/[a-z0-9-]+/i);
  if (meet) {
    out.meetUrl = meet[0].startsWith("http") ? meet[0] : `https://${meet[0]}`;
  }

  // Hledá jen velká písmena, aby nechytil „ten šol bude tady" ze zprávy nad pozvánkou.
  const title = text.match(/(?:[ŠŚ]OL|(?<!\p{L})SOL)(?!\p{L})[^\n]*/u);
  if (title) out.title = title[0].replace(/^[ŚS]OL/, "ŠOL").trim();

  for (const m of plain(text).matchAll(
    /(\d{1,2})\.\s*([a-z]+)(?:\s+(\d{4}))?/g,
  )) {
    const month = MONTHS[m[2]];
    const day = Number(m[1]);
    if (!month || day < 1 || day > 31) continue;

    let year = m[3] ? Number(m[3]) : now.getFullYear();
    // Pozvánka bez roku na den dávno za námi znamená příští rok.
    if (!m[3] && Date.UTC(year, month - 1, day) < now.getTime() - 7 * 864e5) {
      year += 1;
    }
    out.date = `${year}-${pad(month)}-${pad(day)}`;
    break;
  }

  const time = text.match(/(\d{1,2})[:.](\d{2})\s*[–—-]\s*(\d{1,2})[:.](\d{2})/);
  if (time) {
    out.start = `${pad(time[1])}:${time[2]}`;
    out.end = `${pad(time[3])}:${time[4]}`;
  }

  return out;
}
