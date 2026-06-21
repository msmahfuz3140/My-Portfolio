"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const PHONE_NUMBER = "8801956016119";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;

export default function WhatsAppChat() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-3">
      {open && (
        <div className="glass-card p-4 rounded-2xl border border-green-500/30 w-64 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <div>
              <p className="text-sm font-bold text-on-background">Md Mahfuzul Haque</p>
              <p className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto p-1 rounded-lg hover:bg-surface-container text-muted" title="Close chat">
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-muted mb-3 leading-relaxed">
            {`Hi! 👋 I'm Mahfuz. How can I help you? Feel free to ask me anything.`}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={14} />
            Start Chat
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className={`w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}