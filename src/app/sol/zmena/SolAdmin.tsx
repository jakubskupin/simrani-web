"use client";

import { useActionState, useState } from "react";
import { parseInvite } from "@/lib/sol-parse";
import { pickWord } from "@/lib/sol-words";
import type { Sol } from "@/lib/sol";
import { saveSol, type SaveState } from "./actions";

const START: SaveState = { ok: false };

const labelClass =
  "block text-[11px] tracking-[2px] uppercase text-[var(--gold)] mb-2";
const inputClass =
  "w-full h-12 px-4 rounded-2xl bg-[var(--gold-06)] border border-[var(--gold-10)] focus:border-[var(--gold)] outline-none text-[16px] text-[var(--cream)] placeholder:text-[var(--cream-35)] transition-colors";

const EMPTY = { title: "", date: "", start: "", end: "", meetUrl: "" };

export function SolAdmin({
  klic,
  current,
  suggestedWord,
}: {
  klic: string;
  current: Sol | null;
  suggestedWord: string;
}) {
  const [state, action, pending] = useActionState(saveSol, START);
  const [invite, setInvite] = useState("");
  const [fields, setFields] = useState(current ?? EMPTY);
  const [word, setWord] = useState(current?.word ?? suggestedWord);
  const [copied, setCopied] = useState(false);

  const set = (name: keyof typeof EMPTY, value: string) =>
    setFields((f) => ({ ...f, [name]: value }));

  function onInvite(text: string) {
    setInvite(text);
    const parsed = parseInvite(text);
    setFields((f) => ({ ...f, ...parsed }));
    if (parsed.date && parsed.date !== current?.date) setWord(suggestedWord);
  }

  async function copyWord(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (state.ok && state.saved) {
    const saved = state.saved;
    return (
      <div className="flex flex-col gap-6">
        <h1 className="font-headline font-normal text-[40px] md:text-[56px] leading-[1.02] text-[var(--cream)]">
          Tradá, je to venku
        </h1>
        <p className="text-[16px] leading-[1.6] text-[var(--cream-60)] font-light">
          {saved.title} je teď na{" "}
          <a href="/sol" className="text-[var(--gold)] underline underline-offset-4">
            simrani.cz/sol
          </a>
          .
        </p>

        {saved.word ? (
          <div className="rounded-2xl border border-[var(--gold-25)] bg-[var(--gold-06)] p-6">
            <div className={labelClass}>Slovo do dílu</div>
            <div className="font-headline text-[40px] leading-[1.1] text-[var(--cream)] break-words">
              {saved.word}
            </div>
            <button
              type="button"
              onClick={() => copyWord(saved.word)}
              className="sol-cta mt-5 inline-flex items-center justify-center px-7 py-3 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[13px] font-medium hover:bg-[var(--gold)] hover:text-[var(--deep)]"
            >
              {copied ? "Zkopírováno" : "Zkopírovat slovo"}
            </button>
          </div>
        ) : (
          <p className="text-[15px] text-[var(--cream-60)] font-light">
            Bez slova: odkaz uvidí každý, kdo stránku otevře.
          </p>
        )}

        <QrLinks />
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="klic" value={klic} />

      <h1 className="font-headline font-normal text-[40px] md:text-[56px] leading-[1.02] text-[var(--cream)]">
        Nový ŠOL
      </h1>

      <div>
        <label htmlFor="pozvanka" className={labelClass}>
          Vlož pozvánku z kalendáře
        </label>
        <textarea
          id="pozvanka"
          rows={4}
          value={invite}
          onChange={(e) => onInvite(e.target.value)}
          placeholder="Celý text pozvánky, zbytek se vyplní sám"
          className={`${inputClass} h-auto py-3 resize-y leading-[1.45]`}
        />
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          Název
        </label>
        <input
          id="title"
          name="title"
          required
          value={fields.title}
          onChange={(e) => set("title", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[2fr_1fr_1fr] gap-3">
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="date" className={labelClass}>
            Den
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={fields.date}
            onChange={(e) => set("date", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="start" className={labelClass}>
            Od
          </label>
          <input
            id="start"
            name="start"
            type="time"
            required
            value={fields.start}
            onChange={(e) => set("start", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="end" className={labelClass}>
            Do
          </label>
          <input
            id="end"
            name="end"
            type="time"
            required
            value={fields.end}
            onChange={(e) => set("end", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="meetUrl" className={labelClass}>
          Odkaz na Google Meet
        </label>
        <input
          id="meetUrl"
          name="meetUrl"
          type="url"
          inputMode="url"
          required
          value={fields.meetUrl}
          onChange={(e) => set("meetUrl", e.target.value)}
          placeholder="https://meet.google.com/…"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="word" className={labelClass}>
          Slovo do dílu
        </label>
        <div className="flex gap-3">
          <input
            id="word"
            name="word"
            autoComplete="off"
            autoCapitalize="none"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setWord(pickWord(word))}
            className="sol-cta shrink-0 px-6 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[13px] font-medium hover:bg-[var(--gold)] hover:text-[var(--deep)]"
          >
            Jiné
          </button>
        </div>
      </div>

      {state.error && (
        <p role="alert" className="text-[15px] text-[#E8B4D8]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="sol-cta mt-1 inline-flex w-full items-center justify-center px-11 py-4 bg-[var(--gold)] rounded-full text-[15px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)] disabled:opacity-60"
      >
        {pending ? "Ukládám" : "Zveřejnit"}
      </button>

      <QrLinks />
    </form>
  );
}

function QrLinks() {
  return (
    <div className="flex items-center gap-4 pt-2">
      <img
        src="/sol-qr.svg"
        alt="QR kód na simrani.cz/sol"
        width={72}
        height={72}
        className="rounded-lg"
      />
      <div className="text-[14px] leading-[1.6] font-light text-[var(--cream-60)]">
        Adresa i QR zůstávají pořád stejné.
        <br />
        <a
          href="/sol-qr.png"
          download
          className="text-[var(--gold)] hover:text-[var(--cream)] transition-colors"
        >
          Stáhnout QR do dílu&nbsp;&rarr;
        </a>
      </div>
    </div>
  );
}
