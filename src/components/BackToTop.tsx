"use client";

import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all"
      aria-label="Back to Top"
    >
      <FaArrowUp size={20} />
    </button>
  );
}
