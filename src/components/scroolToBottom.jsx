"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ إظهار الزر عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ العودة للأعلى
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-28 z-50 p-3 rounded-full shadow-lg text-white transition-all duration-300 
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"} 
        bg-[var(--main-color)] hover:bg-[var(--secondary-color-1)]`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
}
