import { SectionReveal } from "@/components/SectionReveal";
import { courses } from "@/data/mock";
import { formatNaira } from "@/data/mock";
import { Play, Clock, BookOpen, BarChart3 } from "lucide-react";

export function Masterclass() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Academy</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            Masterclass
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chrome">
            Learn the art and business of bespoke shoemaking from Nelson and guest master artisans.
            Stream lessons, download resources, earn certificates.
          </p>
        </SectionReveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {courses.map((course, idx) => (
            <SectionReveal key={course.id} delay={idx * 0.1}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-charcoal/40 transition hover:border-gold/30">
                <div className="relative aspect-video">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-obsidian/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                      <Play className="h-5 w-5 fill-warm-white text-warm-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-gold">{course.level}</p>
                  <h3 className="mt-2 font-display text-2xl text-warm-white">{course.title}</h3>
                  <p className="mt-1 text-sm text-chrome">{course.instructor}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-chrome">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" /> Certificate
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg text-warm-white">{formatNaira(course.price)}</span>
                    <button className="rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
