import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { products } from "@/data/mock";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Good day. I am Nelson's digital concierge. How may I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const reply = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("size") || lower.includes("fit")) {
      return "For most clients, our shoes fit true to size. If you are between sizes or have a high instep, I recommend scheduling a foot scan with our team.";
    }
    if (lower.includes("leather")) {
      return "Our Italian box calf is perfect for polished formals, while kudu leather offers rich texture for limited editions. For daily wear, I recommend waxed calf.";
    }
    if (lower.includes("recommend") || lower.includes("which") || lower.includes("best")) {
      if (lower.includes("formal") || lower.includes("wedding") || lower.includes("black tie")) {
        return `For formal occasions, I recommend the ${products.find((p) => p.slug === "sovereign-formal")?.name}. It is cut from patent box calf and polished to a mirror finish.`;
      }
      if (lower.includes("boot") || lower.includes("casual")) {
        return `Consider the ${products.find((p) => p.slug === "duke-chelsea")?.name}. It transitions effortlessly from day to evening.`;
      }
      return `May I suggest the ${products[0].name}? It is our signature wholecut Oxford and a wonderful starting point for a bespoke commission.`;
    }
    if (lower.includes("price") || lower.includes("cost")) {
      return "Our bespoke commissions begin at ₦115,000 and are priced according to materials, construction, and customization.";
    }
    if (lower.includes("time") || lower.includes("long")) {
      return "Most commissions take 4 to 6 weeks from measurements to delivery. Rush production is available for private clients.";
    }
    if (lower.includes("order") || lower.includes("commission")) {
      return "To begin a commission, visit the Commission page. You may also book an appointment for measurements and a foot scan.";
    }
    return "I can help with size recommendations, leather guidance, product suggestions, pricing, and production timelines. What would you like to explore?";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply(userMsg) }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI concierge"
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-charcoal/80 text-gold backdrop-blur-md transition hover:border-gold/40"
      >
        <Sparkles className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-20 left-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-warm-white">Nelson Concierge</p>
                  <p className="text-[10px] uppercase tracking-widest text-chrome">AI Assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-4 w-4 text-chrome hover:text-warm-white" />
              </button>
            </div>
            <div className="h-80 space-y-4 overflow-y-auto p-5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-gold text-obsidian"
                      : "bg-charcoal text-cream"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about size, leather, styles..."
                className="flex-1 rounded-full border border-white/10 bg-obsidian px-4 py-2 text-sm text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-obsidian transition hover:bg-gold-light"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
