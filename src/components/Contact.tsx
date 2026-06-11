"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Globe, Send, ArrowRight, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import Toast from "./Toast";

const EMAIL = "mdmahfuzulhaque3140@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".contact-info-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });

      gsap.from(".contact-form-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8 relative overflow-hidden" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-radial -z-10 opacity-20"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">Get in Touch</h2>
          <p className="font-label-caps text-blue-400 tracking-widest uppercase">Let&apos;s Create Something Together</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-h3 text-[24px] text-on-background mb-8">Talk to me</h4>
            <div className="contact-info-card glass-card p-6 rounded-2xl group hover:border-green-400 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="text-green-400 group-hover:scale-110 transition-transform" size={32} />
                <h5 className="text-on-background font-h3 text-[18px]">Call</h5>
              </div>
              <p className="text-muted text-sm mb-4">01956016119</p>
              <a
                href="tel:01956016119"
                className="text-green-400 flex items-center gap-2 font-label-caps text-xs group-hover:gap-4 transition-all"
              >
                Call me <ArrowRight size={14} />
              </a>
            </div>
            <div className="contact-info-card glass-card p-6 rounded-2xl group hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                <h5 className="text-on-background font-h3 text-[18px]">Email</h5>
              </div>
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-sm mb-4 block hover:text-blue-400 transition-colors cursor-pointer"
              >
                {EMAIL}
              </a>
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 flex items-center gap-2 font-label-caps text-xs group-hover:gap-4 transition-all"
              >
                Write me <ArrowRight size={14} />
              </a>
            </div>

            <div className="contact-info-card glass-card p-6 rounded-2xl group hover:border-cyan-400 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <Globe className="text-cyan-400 group-hover:scale-110 transition-transform" size={32} />
                <h5 className="text-on-background font-h3 text-[18px]">LinkedIn</h5>
              </div>
              <p className="text-muted text-sm mb-4">msmahfuz3140</p>
              <a
                href="https://www.linkedin.com/in/msmahfuz3140"
                target="_blank"
                className="text-cyan-400 flex items-center gap-2 font-label-caps text-xs group-hover:gap-4 transition-all"
              >
                Text me <ArrowRight size={14} />
              </a>
            </div>

          </div>

          {/* Contact Form */}
          <div className="md:col-span-8 contact-form-container">
            <h4 className="font-h3 text-[24px] text-on-background mb-8">Write me your project</h4>
            <div className="glass-card p-8 md:p-10 rounded-[32px] relative overflow-hidden">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-h2 text-on-background">Message Sent!</h3>
                  <p className="text-muted max-w-sm">
                    Thank you for reaching out. I have received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-blue-400 hover:underline font-label-caps text-sm pt-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setStatus("loading");
                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    const payload = {
                      name: formData.get("name") as string,
                      address: formData.get("address") as string,
                      phone: formData.get("phone") as string,
                      email: formData.get("email") as string,
                      message: formData.get("message") as string,
                    };

                    try {
                      const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });
                      const data = await response.json();
                      if (data.success) {
                        setStatus("success");
                        form.reset();
                        setToastMessage("✅ Message sent successfully! I'll get back to you soon.");
                        setToastType("success");
                        setShowToast(true);
                      } else {
                        setStatus("error");
                        setFormMessage(data.message || "Something went wrong.");
                        setToastMessage("❌ Failed to send message. Please try again.");
                        setToastType("error");
                        setShowToast(true);
                      }
                    } catch {
                      setStatus("error");
                      setFormMessage("Failed to send message. Please try again.");
                      setToastMessage("❌ Network error. Please check your connection and try again.");
                      setToastType("error");
                      setShowToast(true);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-caps text-muted text-xs">NAME</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Insert your name"
                        className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-caps text-muted text-xs">ADDRESS</label>
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Insert your address"
                        className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-caps text-muted text-xs">PHONE</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{11}"
                        title="Please enter a valid 11-digit phone number"
                        placeholder="Insert your phone number"
                        className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-caps text-muted text-xs">MAIL</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Insert your email"
                        className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-muted text-xs">MESSAGE</label>
                    <div className="relative rounded-2xl border border-outline-variant bg-surface-container overflow-hidden focus-within:border-blue-500 transition-colors">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/50 bg-surface/50">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary text-xs font-bold">
                          You
                        </div>
                        <span className="text-muted text-xs font-label-caps">Write your project message</span>
                      </div>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Hi Mahfuz, I have a project idea and would like to discuss..."
                        className="w-full bg-transparent px-4 py-4 text-on-background focus:ring-0 outline-none resize-none placeholder:text-muted/50"
                      ></textarea>
                      <div className="px-4 py-2 border-t border-outline-variant/50 flex items-center justify-between">
                        <span className="text-muted/60 text-[10px] font-label-caps">Your message will be delivered securely</span>
                        <Send size={14} className="text-muted/40" />
                      </div>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                      <AlertCircle size={16} />
                      <span>{formMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="gradient-border-btn w-full md:w-auto px-12 py-4 rounded-xl font-h3 text-[18px] text-on-background flex items-center justify-center gap-3 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending..." : "Send"}
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-2 border-on-background/30 border-t-on-background rounded-full animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </section>
  );
}
