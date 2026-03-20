"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-5">
      <h2 className="font-headline text-[28px] text-[var(--cream)]">
        Něco se pokazilo
      </h2>
      <p className="text-[var(--cream-60)] text-[15px]">
        Zkuste stránku načíst znovu.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-[var(--gold)] text-[var(--deep)] text-[14px] font-semibold hover:bg-[var(--cream)] transition-colors"
      >
        Zkusit znovu
      </button>
    </div>
  );
}
