import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";

export function Home() {
  return (
    <div className="bg-warm-white text-obsidian font-sans">
      {/* HERO SECTION - Video starts below Nav */}
      <section className="px-4 pb-4 md:px-8 md:pb-8">
        <div className="relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-obsidian">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          >
            <source src="/videos/Nelson header video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center text-white">
            <h1 className="mb-4 text-sm font-bold uppercase tracking-widest md:text-base">
              Responsibility
            </h1>
            <p className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-5xl lg:text-6xl tracking-tight">
              Together we will build a better future from the ground up.
            </p>
            <div className="absolute bottom-8 flex gap-4">
              <span className="cursor-pointer border-b-2 border-white pb-1 text-xs font-bold uppercase tracking-widest">
                Purpose
              </span>
              <span className="cursor-pointer border-b-2 border-transparent pb-1 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white">
                Planet
              </span>
              <span className="cursor-pointer border-b-2 border-transparent pb-1 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white">
                Product
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CREATING A SHARED IMPACT */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-16 md:w-2/3">
          <h2 className="text-5xl font-black tracking-tight md:text-7xl lg:text-8xl leading-none">
            Creating <br /> a shared impact.
          </h2>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
          <div className="overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200" 
              alt="Impact" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
              We are on a journey to become a more responsible and sustainable enterprise. We're prioritizing our people, our planet, and our product footprint.
            </h3>
            <p className="mb-8 text-obsidian/70 md:text-lg">
              As a footwear company, we have an incredible opportunity to drive positive change in our industry. By building better, we can help protect the environments where our consumers live, work, and play.
            </p>
            <Link to="/about" className="flex items-center gap-2 font-bold uppercase tracking-widest text-obsidian hover:underline">
              Read Our Report <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-16 border-t border-obsidian/20 pt-8">
              <div className="flex items-center justify-between py-4 border-b border-obsidian/10">
                <span className="font-bold">Our ESG Strategy</span>
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-obsidian/10">
                <span className="font-bold">Material Innovation</span>
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-obsidian/10">
                <span className="font-bold">Supply Chain</span>
                <Plus className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: GLOBAL DAY OF PURPOSE */}
      <section className="w-full">
        <div className="relative h-[60vh] w-full bg-obsidian">
          <img 
            src="https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=2000" 
            alt="Day of Purpose" 
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <h2 className="text-5xl font-black text-white md:text-7xl lg:text-8xl tracking-tight">
              Global Day of <br /> Purpose.
            </h2>
          </div>
        </div>
        <div className="bg-obsidian px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-2xl font-bold md:text-3xl leading-tight">
                Our annual global day of service brings our team together to support the communities where we live and work.
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <div className="mb-8 flex gap-12 border-b border-white/20 pb-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60">Total Hours</p>
                  <p className="text-4xl font-black mt-2">1,500+</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60">Trees Planted</p>
                  <p className="text-4xl font-black mt-2">10,000</p>
                </div>
              </div>
              <Link to="/journal" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:underline">
                Explore the impact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: NEWS & STORIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            News & Stories
          </h2>
          <Link to="/journal" className="hidden items-center gap-2 font-bold uppercase tracking-widest hover:underline md:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Building a Better Supply Chain", date: "Oct 12, 2024", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
            { title: "Introducing Recycled Leather", date: "Sep 28, 2024", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800" },
            { title: "Community Grant Winners", date: "Sep 15, 2024", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800" }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="mb-4 overflow-hidden rounded-lg bg-obsidian/5 aspect-[4/3]">
                <img src={post.img} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-obsidian/50">{post.date}</p>
              <h3 className="text-xl font-bold leading-tight group-hover:underline">{post.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: LOWER IMPACT */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-24 text-center">
        <h2 className="mb-16 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl leading-none">
          A path toward <br /> lower impact.
        </h2>
        <div className="mb-16 w-full overflow-hidden rounded-xl">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Lower Impact" 
            className="w-full object-cover aspect-[21/9]"
          />
        </div>
        <div className="grid gap-12 text-left md:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="mb-6 text-2xl font-bold md:text-3xl leading-tight">
              Our products are designed to last, but our commitment doesn't stop there. We are working to reduce the environmental footprint of every pair.
            </h3>
            <div className="flex gap-12 border-t border-obsidian/10 pt-8 mt-8">
              <div>
                <p className="text-4xl font-black">40%</p>
                <p className="text-xs uppercase tracking-widest font-bold mt-2 text-obsidian/60">Recycled Materials</p>
              </div>
              <div>
                <p className="text-4xl font-black">100%</p>
                <p className="text-xs uppercase tracking-widest font-bold mt-2 text-obsidian/60">Carbon Neutral Ops</p>
              </div>
            </div>
          </div>
          <div>
            <div className="border-t border-obsidian/20">
              <div className="flex items-center justify-between py-6 border-b border-obsidian/10 cursor-pointer">
                <span className="text-xl font-bold">Climate Action</span>
                <Plus className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between py-6 border-b border-obsidian/10 cursor-pointer">
                <span className="text-xl font-bold">Water Stewardship</span>
                <Plus className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between py-6 border-b border-obsidian/10 cursor-pointer">
                <span className="text-xl font-bold">Waste Reduction</span>
                <Plus className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: RESPONSIBILITY STARTS AT THE SOURCE */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <h2 className="mb-16 text-center text-5xl font-black tracking-tight md:text-7xl lg:text-8xl leading-none">
          Responsibility <br /> starts at the <br /> source.
        </h2>
        <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
          <div className="overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1200" 
              alt="Source" 
              className="h-full w-full object-cover aspect-[4/5]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold md:text-3xl leading-tight">
              We partner with suppliers who share our commitment to ethical manufacturing and environmental stewardship.
            </h3>
            <p className="mb-8 text-obsidian/70 md:text-lg">
              Every tannery we work with must adhere to strict environmental standards, ensuring water is treated properly and chemicals are managed safely. We believe transparency is the first step toward accountability.
            </p>
            <Link to="/about" className="flex items-center gap-2 font-bold uppercase tracking-widest text-obsidian hover:underline">
              View Our Suppliers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="bg-obsidian text-warm-white py-32 px-6 text-center">
        <h2 className="mb-12 text-6xl font-black tracking-tight md:text-8xl lg:text-9xl leading-[0.9]">
          Build <br /> Better <br /> With Us
        </h2>
        <Link 
          to="/contact" 
          className="inline-block bg-white text-obsidian px-10 py-4 font-bold uppercase tracking-widest transition hover:bg-white/90"
        >
          Join Our Team
        </Link>
      </section>
    </div>
  );
}
