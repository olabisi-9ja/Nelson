import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, MessageCircle } from "lucide-react";
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback to mock responses if no API key is provided
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", text: reply(userMsg) }]);
      }, 600);
      return;
    }

    try {
      // Create a temporary "typing" message
      setMessages((m) => [...m, { role: "assistant", text: "..." }]);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `You are Nelson's digital concierge, a luxury shoemaker assistant. Be very polite, brief, and luxurious. Answer this: ${userMsg}` }]
            }
          ]
        })
      });

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I am unable to process that request at the moment.";
      
      setMessages((m) => {
        const newM = [...m];
        newM[newM.length - 1] = { role: "assistant", text: aiText };
        return newM;
      });
    } catch (error) {
      setMessages((m) => {
        const newM = [...m];
        newM[newM.length - 1] = { role: "assistant", text: "I apologize, but my connection was interrupted." };
        return newM;
      });
    }
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
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/2349012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full hover:bg-emerald-500/20 transition font-bold"
                  title="Contact via WhatsApp"
                >
                  <svg className="h-3.5 w-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-4 w-4 text-chrome hover:text-warm-white" />
                </button>
              </div>
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
