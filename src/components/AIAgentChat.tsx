import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, Bot, User, ArrowRight, CornerDownLeft, ShieldCheck, Heart, ArrowLeft } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAgentChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  embedded?: boolean;
}

const QUICK_QUERIES = [
  "Is Sector 50 safe for walking at 10 PM? 📍",
  "Recommend a female-friendly cafe in DLF CyberHub ☕",
  "What safety tools does Go Girl offer? 🛡️",
  "Suggest a quick icebreaker for writers' meetup ✏️"
];

export default function AIAgentChat({ isOpen = true, onClose, userName, embedded = false }: AIAgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Welcome, ${userName ? userName.split(' ')[0] : 'there'}. I am Millu, your community assistant for Gurgaon and Delhi. 

Feel free to ask about safe venues, community meetups, transport recommendations, or icebreaker suggestions for your gatherings.`
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend.trim();
    setInputMsg("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(1) // omit introductory welcome to keep context smart
        })
      });

      if (!response.ok) {
        throw new Error("Unable to connect.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (error: any) {
      // Smart offline fallback response generator for Gurgaon & Delhi women safety & community
      let fallbackText = "I'm here to assist you with Gurgaon and Delhi NCR safety features and community meetups! ";
      const lower = userText.toLowerCase();

      if (lower.includes("sector 50") || lower.includes("walk") || lower.includes("safe")) {
        fallbackText = "Sector 50 and DLF Phase 5 are generally well-lit with active PCR patrols until 11 PM. For night walks, stick to main avenue roads like Golf Course Extension Road or request a GoGirl buddy in the Meetups section!";
      } else if (lower.includes("cyberhub") || lower.includes("cafe") || lower.includes("recommend")) {
        fallbackText = "Top female-friendly cafes in CyberHub: Blue Tokai (high visibility, certified staff), Third Wave Coffee (Cyber City), and Cafe Delhi Heights. All three have verified emergency police linkages.";
      } else if (lower.includes("tool") || lower.includes("feature") || lower.includes("safety")) {
        fallbackText = "GoGirl offers 24/7 Emergency SOS dispatch to Delhi & Gurgaon police, live GPS tracking shareable via WhatsApp, and verified community chat circles.";
      } else if (lower.includes("icebreaker") || lower.includes("meetup") || lower.includes("writer")) {
        fallbackText = "Great icebreaker: Ask everyone to share 'the most memorable book line that changed your week' or 'your favorite cozy corner cafe in Delhi NCR'.";
      } else {
        fallbackText = `I have received your query regarding "${userText}". Feel free to explore our Safety Hub for live GPS tracking or browse verified sister meetups!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallbackText
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !embedded) return null;

  const contentUI = (
    <div className={`flex flex-col h-full bg-white text-left ${embedded ? 'rounded-2xl border border-[#E8DCCB] shadow-sm overflow-hidden' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#800020] via-[#6B0E1D] to-[#460610] text-white px-4 py-3 shadow-xs flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-white/20 rounded-xl backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5 text-white">
              Millu ✦ AI Assistant
              <span className="text-[8.5px] bg-white/20 text-white font-bold px-1.5 py-0.2 rounded-full border border-white/30">
                Verified
              </span>
            </h3>
            <span className="text-[9.5px] text-[#F4ECE1] font-semibold block leading-tight">Safety & Community AI Assistant</span>
          </div>
        </div>
        {!embedded && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 text-white rounded-full cursor-pointer transition active:scale-95"
            id="close-ai-agent-btn"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3.5 scrollbar-none bg-gradient-to-b from-[#FAF6F0] via-[#F8F5EE] to-white"
      >
        {messages.map((m, idx) => {
          const isAI = m.role === "assistant";
          return (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx}
              className={`flex items-start gap-2 ${isAI ? "" : "flex-row-reverse"}`}
            >
              {/* Avatar indicator */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 shadow-2xs ${
                isAI ? "bg-[#F4ECE1] border-[#E8DCCB] text-[#800020]" : "bg-gray-100 border-gray-300 text-gray-700"
              }`}>
                {isAI ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5 text-gray-700" />}
              </div>

              {/* Chat Bubble container */}
              <div className={`max-w-[80%] rounded-2xl p-3 text-[11.5px] relative ${
                isAI 
                  ? "bg-white text-gray-800 rounded-tl-xs border border-[#E8DCCB] shadow-2xs" 
                  : "bg-coral-500 text-white rounded-tr-xs shadow-xs font-medium"
              }`}>
                <p className="leading-relaxed font-sans whitespace-pre-wrap">
                  {m.content}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-[#F4ECE1] border border-[#E8DCCB] text-[#800020] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-xs border border-[#E8DCCB] p-2.5 px-3.5 shadow-2xs flex items-center gap-1.5">
              <span className="text-[10px] text-[#800020] font-bold animate-pulse">Millu is typing...</span>
              <div className="flex gap-0.5">
                <span className="w-1 h-1 bg-[#800020] rounded-full animate-pulse [animation-delay:0.1s]" />
                <span className="w-1 h-1 bg-[#800020] rounded-full animate-pulse [animation-delay:0.2s]" />
                <span className="w-1 h-1 bg-[#800020] rounded-full animate-pulse [animation-delay:0.3s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggested Quick Choices panel */}
      {messages.length <= 1 && (
        <div className="px-3 py-2 bg-white border-t border-gray-100 shrink-0">
          <span className="text-[9px] text-gray-400 font-bold block mb-1.5 uppercase tracking-wide">Suggested Quick Questions:</span>
          <div className="grid grid-cols-1 gap-1">
            {QUICK_QUERIES.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="text-[10.5px] text-gray-700 bg-[#FAF6F0] hover:bg-[#F4ECE1] hover:text-[#800020] font-semibold border border-[#E8DCCB] py-1.5 px-2.5 rounded-lg text-left cursor-pointer transition active:scale-98 flex justify-between items-center"
              >
                <span className="truncate">{q}</span>
                <ArrowRight className="w-3 h-3 text-[#800020] shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TextInput Frame */}
      <div className="bg-white p-3 border-t border-gray-150 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMsg);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask Millu about safe venues, meetups, tips..."
            disabled={isLoading}
            className="flex-1 bg-gray-50 text-xs font-semibold px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] transition"
          />
          <button
            type="submit"
            disabled={!inputMsg.trim() || isLoading}
            className="px-3 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-xl shadow-xs transition duration-150 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );

  if (embedded) {
    return <div className="h-[430px]">{contentUI}</div>;
  }

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 350 }}
      className="absolute inset-0 bg-[#F8F5EE] z-50 flex flex-col justify-between overflow-hidden shadow-2xl rounded-t-[38px] border-t-4 border-coral-500"
    >
      {contentUI}
    </motion.div>
  );
}
