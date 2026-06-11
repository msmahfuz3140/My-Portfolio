"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminInboxPanel from "./AdminInboxPanel";

type AdminInboxModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AdminInboxModal({ open, onClose }: AdminInboxModalProps) {
  const [panelKey, setPanelKey] = useState(0);

  useEffect(() => {
    if (open) {
      setPanelKey((k) => k + 1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 cursor-auto"
        >
          <button
            type="button"
            aria-label="Close inbox"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-auto"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl glass-card rounded-[24px] shadow-2xl overflow-hidden border border-outline-variant cursor-auto"
          >
            <AdminInboxPanel key={panelKey} mode="modal" onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
