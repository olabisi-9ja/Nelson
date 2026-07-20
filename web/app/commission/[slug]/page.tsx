"use client";

import { useState } from "react";
import ShoeConfigurator from "@/components/ShoeConfigurator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const LEATHER_COLORS = [
  { name: "Matte Black", hex: "#111111" },
  { name: "Chestnut", hex: "#4A2B18" },
  { name: "Burgundy", hex: "#40131A" },
  { name: "Warm Ivory", hex: "#F5F0E6" },
];

const SOLE_COLORS = [
  { name: "Natural Oak", hex: "#D4B895" },
  { name: "Black Chrome", hex: "#222222" },
];

const STEPS = [
  "Customization",
  "Measurements",
  "Upload References",
  "Timeline",
  "Deposit"
];

export default function CommissionFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [leatherColor, setLeatherColor] = useState(LEATHER_COLORS[0].hex);
  const [soleColor, setSoleColor] = useState(SOLE_COLORS[0].hex);
  
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(curr => curr + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  return (
    <main className="w-full h-screen bg-background text-foreground flex overflow-hidden">
      
      {/* LEFT: 3D Configurator */}
      <section className="relative w-1/2 h-full bg-secondary/10 flex flex-col items-center justify-center border-r border-border/20 hidden md:flex">
        <div className="absolute top-8 left-8 z-50">
          <Link href="/product/the-classic" className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mix-blend-difference">
            <ArrowLeft size={16} /> Exit Commission
          </Link>
        </div>
        
        <ShoeConfigurator leatherColor={leatherColor} soleColor={soleColor} />
        
        <div className="absolute bottom-8 left-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Live Preview (Placeholder Mesh)
          </span>
        </div>
      </section>

      {/* RIGHT: Controls & Flow */}
      <section className="w-full md:w-1/2 h-full flex flex-col bg-background relative">
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-secondary/30 flex">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-12 py-16 flex flex-col">
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-4">
            Step 0{currentStep + 1}
          </span>
          <h1 className="text-4xl font-light uppercase tracking-tight mb-12">
            {STEPS[currentStep]}
          </h1>

          {/* STEP 1: Customization */}
          {currentStep === 0 && (
            <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Leather Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Select Leather</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {LEATHER_COLORS.map(color => (
                    <button
                      key={color.hex}
                      onClick={() => setLeatherColor(color.hex)}
                      className={`flex flex-col items-center gap-3 p-4 border transition-all ${
                        leatherColor === color.hex ? "border-primary bg-primary/5" : "border-border/30 hover:border-primary/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full shadow-inner border border-white/10" style={{ backgroundColor: color.hex }} />
                      <span className="text-[10px] uppercase tracking-widest">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sole Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Select Sole Finish</h3>
                <div className="grid grid-cols-2 gap-4">
                  {SOLE_COLORS.map(color => (
                    <button
                      key={color.hex}
                      onClick={() => setSoleColor(color.hex)}
                      className={`flex flex-col items-center gap-3 p-4 border transition-all ${
                        soleColor === color.hex ? "border-primary bg-primary/5" : "border-border/30 hover:border-primary/50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full shadow-inner border border-white/10" style={{ backgroundColor: color.hex }} />
                      <span className="text-[10px] uppercase tracking-widest">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other steps */}
          {currentStep === 1 && (
             <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <p className="text-muted-foreground font-light">Upload your 3D foot scan or enter manual measurements provided by our bespoke guide.</p>
               <div className="w-full h-48 border border-dashed border-primary/30 flex items-center justify-center text-primary/50 text-sm uppercase tracking-widest">
                 Upload Foot Scan (.STL, .OBJ)
               </div>
             </div>
          )}

          {currentStep > 1 && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-muted-foreground font-light">Continuing the {STEPS[currentStep].toLowerCase()} process...</p>
            </div>
          )}
          
          <div className="mt-auto pt-12 flex items-center justify-between">
             <button 
                onClick={handlePrev} 
                disabled={currentStep === 0}
                className="px-8 py-3 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
             >
                Back
             </button>
             <button 
                onClick={handleNext}
                className="px-12 py-3 bg-foreground text-background text-sm uppercase tracking-widest font-medium hover:bg-primary transition-colors"
             >
                {currentStep === STEPS.length - 1 ? "Pay Deposit" : "Next Step"}
             </button>
          </div>

        </div>
      </section>

    </main>
  );
}
