export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "1",
    question: "What type of projects do you work on?",
    answer:
      "I specialize in full-stack web applications using the MERN stack and Next.js. This includes marketplaces, dashboards, landing pages, news portals, and custom business websites. I also handle bug fixes and maintenance for existing projects.",
  },
  {
    id: "2",
    question: "How long does a typical project take?",
    answer:
      "A landing page typically takes 1–2 weeks. A full-stack web application takes 4–8 weeks depending on complexity. I always provide a timeline estimate before starting and keep you updated throughout the process.",
  },
  {
    id: "3",
    question: "Do you work remotely?",
    answer:
      "Yes! I work with clients both locally in Bangladesh and internationally. I'm comfortable with remote collaboration via WhatsApp, email, Google Meet, and project management tools.",
  },
  {
    id: "4",
    question: "What is your payment method?",
    answer:
      "I accept bKash, Nagad, and bank transfer for local clients. For international clients, I accept payment via PayPal or Wise. Typically 50% upfront and 50% on delivery for new projects.",
  },
  {
    id: "5",
    question: "Do you provide source code after completion?",
    answer:
      "Yes, you receive the full source code, deployment access, and documentation upon project completion. The code is clean, well-structured, and ready for future maintenance.",
  },
  {
    id: "6",
    question: "Are you available for internship or full-time roles?",
    answer:
      "Absolutely! I'm currently open to internship, freelance, and full-time opportunities as a Junior Full Stack Developer. I'm based in Netrakona, Bangladesh and open to remote or on-site roles.",
  },
];
