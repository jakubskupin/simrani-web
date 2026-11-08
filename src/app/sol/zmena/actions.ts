"use server";

import { revalidatePath } from "next/cache";
import { isAdminKey, writeSol, type Sol } from "@/lib/sol";

export type SaveState = {
  ok: boolean;
  error?: string;
  saved?: Sol;
};

const field = (form: FormData, name: string) =>
  String(form.get(name) ?? "").trim();

export async function saveSol(
  _prev: SaveState,
  form: FormData,
): Promise<SaveState> {
  if (!isAdminKey(field(form, "klic"))) {
    return { ok: false, error: "Tenhle odkaz už neplatí." };
  }

  const sol: Sol = {
    title: field(form, "title"),
    date: field(form, "date"),
    start: field(form, "start"),
    end: field(form, "end"),
    meetUrl: field(form, "meetUrl"),
    word: field(form, "word"),
  };

  if (!sol.title || !sol.date || !sol.start || !sol.end) {
    return { ok: false, error: "Chybí název, den nebo čas." };
  }
  if (!/^https:\/\/\S+\.\S+/.test(sol.meetUrl)) {
    return { ok: false, error: "Odkaz musí začínat https://" };
  }

  try {
    await writeSol(sol);
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Uložení se nepovedlo, zkus to znovu." };
  }

  revalidatePath("/sol");
  return { ok: true, saved: sol };
}
