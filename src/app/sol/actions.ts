"use server";

import { cookies } from "next/headers";
import {
  SOL_COOKIE,
  isWordRight,
  readSol,
  solPhase,
  unlockToken,
} from "@/lib/sol";

export type UnlockState = { wrong: boolean; tries: number };

export async function unlockSol(
  prev: UnlockState,
  form: FormData,
): Promise<UnlockState> {
  const sol = await readSol();
  if (!sol || solPhase(sol) === "over") return { wrong: false, tries: prev.tries };

  if (!isWordRight(sol, String(form.get("slovo") ?? ""))) {
    return { wrong: true, tries: prev.tries + 1 };
  }

  const jar = await cookies();
  jar.set(SOL_COOKIE, unlockToken(sol), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/sol",
    maxAge: 60 * 60 * 24 * 45,
  });

  return { wrong: false, tries: prev.tries };
}
