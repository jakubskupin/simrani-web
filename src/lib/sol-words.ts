/** Slova ze světa Šimrání. Na stránce nezáleží na velikosti písmen ani diakritice. */
export const SOL_WORDS = [
  "tradá",
  "mrkmrk",
  "tybrďo",
  "povykládat",
  "buřty",
  "jeskyňka",
  "zvědavost",
  "odvaha",
  "hravost",
  "bezpečí",
  "otevřenost",
  "háček",
  "baterka",
  "čaj",
  "sekáč",
  "kudrny",
  "brýle",
  "svetr",
  "rtěnka",
];

export function pickWord(except?: string): string {
  const pool = SOL_WORDS.filter((w) => w !== except);
  return pool[Math.floor(Math.random() * pool.length)];
}
