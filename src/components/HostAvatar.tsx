import Link from "next/link";
import type { HostLite } from "@/lib/archiv";

/** Malý kulatý avatar hosta se jménem, vede na medailonek /host/<jmeno>. */
export function HostOdkaz({ h, size = 24, jmeno, className = "" }: { h: HostLite; size?: number; jmeno?: string; className?: string }) {
  const ini = h.jmeno.split(/\s+/).map((s) => s[0]).join("").slice(0, 2);
  return (
    <Link href={`/host/${h.slug}`} className={`inline-flex items-center gap-2 group ${className}`} title={`Medailonek: ${h.jmeno}`}>
      {h.foto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={h.foto} alt="" width={size} height={size} className="rounded-full object-cover border border-[var(--gold)] shrink-0" style={{ width: size, height: size }} />
      ) : (
        <span className="rounded-full bg-[var(--wine-bg)] border border-[var(--gold-25)] flex items-center justify-center font-headline text-[var(--gold)] shrink-0" style={{ width: size, height: size, fontSize: size * 0.42 }}>
          {ini}
        </span>
      )}
      <span className="text-[var(--cream)] font-medium underline decoration-[var(--gold-25)] underline-offset-4 group-hover:text-[var(--gold)] group-hover:decoration-[var(--gold)]">{jmeno ?? h.jmeno}</span>
    </Link>
  );
}
