import { Link } from "react-router-dom";
import { SectionReveal } from "@/components/SectionReveal";

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-32 text-center">
      <SectionReveal>
        <p className="text-xs uppercase tracking-[0.25em] text-gold">404</p>
        <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">Not Found</h1>
        <p className="mx-auto mt-6 max-w-md text-chrome">
          The page you are looking for does not exist. Perhaps it was a limited edition.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
        >
          Return Home
        </Link>
      </SectionReveal>
    </div>
  );
}
