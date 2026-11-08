"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { unlockSol, type UnlockState } from "./actions";
import { SolMark } from "./SolMark";

const FORENDORS = "https://www.forendors.cz/simrani.cz";
const START: UnlockState = { wrong: false, tries: 0 };
const REDIRECT_DELAY_MS = 1400;

type Props = {
  title: string;
  day: string;
  time: string;
  when: string;
  live: boolean;
  meetUrl: string | null;
};

/** Předložky a spojky nezůstávají viset na konci řádku. */
const glue = (s: string) => s.replace(/(^|\s)([ksvzouai])\s/gi, "$1$2 ");

export function SolDoor({ title, day, time, when, live, meetUrl }: Props) {
  const [state, action, pending] = useActionState(unlockSol, START);

  useEffect(() => {
    if (!live || !meetUrl) return;
    const timer = window.setTimeout(
      () => window.location.replace(meetUrl),
      REDIRECT_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [live, meetUrl]);

  return (
    <div className="sol-page">
      <SolMark lifted={Boolean(meetUrl)} />
      <div className="sol-grain" />

      <main className="relative z-[2] min-h-[100svh] flex flex-col px-5 md:px-16 lg:px-[120px] pt-6 md:pt-9 pb-7 md:pb-10">
        <Link
          href="/"
          className="sol-rise self-start font-headline text-[20px] md:text-[22px] text-[var(--cream)]"
          style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
        >
          Šimrání
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-[680px] py-10">
          <div
            className="sol-rise text-[11px] tracking-[3px] uppercase text-[var(--gold)]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {live ? "Právě to běží" : "Šimrání online live"}
          </div>

          <h1
            className={`sol-rise font-headline font-normal leading-[0.98] text-[var(--cream)] mt-4 ${
              title.length > 32
                ? "text-[clamp(40px,10.5vw,84px)]"
                : "text-[clamp(54px,14.6vw,112px)]"
            }`}
            style={
              {
                "--i": 2,
                fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
              } as React.CSSProperties
            }
          >
            {glue(title)}
          </h1>

          <p
            className="sol-rise mt-5 text-[16px] md:text-[18px] leading-[1.5] text-[var(--cream-60)] font-light"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {day}, {time}
          </p>

          <div
            className="sol-rise mt-9 md:mt-12 min-h-[190px]"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <AnimatePresence mode="wait" initial={false}>
              {meetUrl ? (
                <motion.div
                  key="uvnitr"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-headline italic text-[26px] md:text-[32px] leading-[1.2] text-[var(--gold)]">
                    Tradá, jsi uvnitř
                  </div>
                  <p className="mt-3 text-[15px] md:text-[16px] leading-[1.6] text-[var(--cream-60)] font-light max-w-[440px]">
                    {live
                      ? "Otevírám ti Google Meet."
                      : `Uvidíme se ${when}. Stačí se sem vrátit, slovo si pamatuju.`}
                  </p>
                  <a
                    href={meetUrl}
                    rel="noreferrer"
                    className="sol-cta mt-7 inline-flex w-full md:w-auto items-center justify-center px-11 py-4 bg-[var(--gold)] rounded-full text-[15px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)]"
                  >
                    Jdu na ŠOL
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="dvere"
                  action={action}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-[440px]"
                >
                  <label
                    htmlFor="sol-slovo"
                    className="font-headline italic text-[26px] md:text-[32px] leading-[1.2] text-[var(--cream)]"
                  >
                    Znáš slovo?
                  </label>
                  <div
                    key={state.tries}
                    className={state.wrong ? "sol-nope" : undefined}
                  >
                    <input
                      id="sol-slovo"
                      name="slovo"
                      type="text"
                      required
                      autoFocus={state.tries > 0}
                      autoComplete="off"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="go"
                      aria-invalid={state.wrong}
                      aria-describedby="sol-zprava"
                      placeholder="Napiš ho sem"
                      className="mt-3 w-full bg-transparent border-b border-[var(--gold-25)] focus:border-[var(--gold)] outline-none py-3 font-headline text-[24px] md:text-[28px] text-[var(--cream)] placeholder:text-[var(--cream-35)] transition-colors"
                    />
                  </div>

                  <p
                    id="sol-zprava"
                    aria-live="polite"
                    className="mt-3 min-h-[44px] text-[14px] md:text-[15px] leading-[1.55] font-light text-[var(--cream-60)]"
                  >
                    {state.wrong
                      ? "Tohle slovo to není. A to je velmi v pořádku, zkus to znovu."
                      : "Šimrači ho najdou na začátku aktuálního dílu. Mrk\u00A0mrk."}
                  </p>

                  <button
                    type="submit"
                    disabled={pending}
                    className="sol-cta mt-4 inline-flex w-full md:w-auto items-center justify-center px-11 py-4 bg-[var(--gold)] rounded-full text-[15px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)] disabled:opacity-60"
                  >
                    Pusť mě dovnitř
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {!meetUrl && (
          <a
            href={FORENDORS}
            target="_blank"
            rel="noopener noreferrer"
            className="sol-rise self-start text-[13px] md:text-[14px] leading-[1.5] text-[var(--gold)] hover:text-[var(--cream)] transition-colors"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            Ještě nejsi v Šimracím gangu? Přidej se na Forendors&nbsp;&rarr;
          </a>
        )}
      </main>
    </div>
  );
}
