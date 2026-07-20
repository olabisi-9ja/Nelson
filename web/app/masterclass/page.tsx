import Link from "next/link";
import { ArrowUpRight, GraduationCap, Video, Users } from "lucide-react";

const COURSES = [
  {
    title: "Masterclass: Pattern Making & Last Design",
    level: "Advanced",
    duration: "12 Hours",
    price: "$450",
    desc: "A full masterclass teaching traditional pattern drafting, custom last modification, and fit correction for bespoke shoemaking.",
  },
  {
    title: "The Art of Patina & Dyeing",
    level: "Intermediate",
    duration: "8 Hours",
    price: "$290",
    desc: "Learn to build multi-dimensional finishes using vegetable-tanned leathers, pigments, alcohol solutions, and hand waxes.",
  },
  {
    title: "Hand-Welted Goodyear Construction",
    level: "Expert Only",
    duration: "16 Hours",
    price: "$550",
    desc: "An intensive course focusing on creating insole ribs, pulling uppers over the last, and stitching the hand welt.",
  },
];

export default function MasterclassPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-border/20 pb-12">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Academy</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-none">
            Nelson Masterclass.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mt-4">
            Preserving legacy techniques through interactive, high-production curriculum designed for aspiring shoemakers and artisans.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-border/20 p-8 flex items-center gap-6">
            <GraduationCap size={32} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-3xl font-light">12,000+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Active Students</span>
            </div>
          </div>
          <div className="border border-border/20 p-8 flex items-center gap-6">
            <Video size={32} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-3xl font-light">4k Ultra HD</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Streaming Resolution</span>
            </div>
          </div>
          <div className="border border-border/20 p-8 flex items-center gap-6">
            <Users size={32} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-3xl font-light">1-on-1</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Artisan Feedback</span>
            </div>
          </div>
        </section>

        {/* Course Cards */}
        <section className="flex flex-col gap-8">
          <h2 className="text-2xl uppercase tracking-widest font-light border-b border-border/10 pb-4">Curriculum Catalog</h2>
          
          <div className="flex flex-col gap-8">
            {COURSES.map((course, idx) => (
              <div 
                key={idx} 
                className="flex flex-col lg:flex-row lg:items-center justify-between p-8 border border-border/20 hover:border-primary/55 transition-colors gap-8"
              >
                <div className="flex flex-col gap-3 lg:w-2/3">
                  <div className="flex items-center gap-4 text-xs text-primary/70 uppercase tracking-widest">
                    <span>{course.level}</span>
                    <span>&bull;</span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="text-2xl uppercase tracking-wide font-light">{course.title}</h3>
                  <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed mt-2">
                    {course.desc}
                  </p>
                </div>

                <div className="flex flex-col items-start lg:items-end justify-between gap-6 lg:w-1/4">
                  <div className="flex flex-col lg:text-right">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Tuition Fee</span>
                    <span className="text-3xl font-light text-foreground mt-1">{course.price}</span>
                  </div>
                  <button className="px-8 py-3 bg-foreground text-background text-xs uppercase tracking-widest font-semibold hover:bg-primary transition-colors flex items-center gap-1 w-full lg:w-auto justify-center">
                    Enroll Course <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
