"use client";

import React from "react";

/**
 * CodeLoader
 * - Tailwind only (uses a tiny bit of internal CSS for keyframes that Tailwind default doesn't include)
 * - Accessible (role="status")
 * - Use anywhere: <CodeLoader size="md" />
 *
 * props:
 * - size: "sm" | "md" | "lg"  (يتحكم بحجم الواجهة)
 */

export default function CodeLoader({ size = "md" }) {
  const sizes = {
    sm: { card: "w-40 h-28", font: "text-xs", icon: "w-6 h-6" },
    md: { card: "w-56 h-36", font: "text-sm", icon: "w-8 h-8" },
    lg: { card: "w-80 h-48", font: "text-base", icon: "w-10 h-10" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className={`flex items-center justify-center`}
      >
        <div
          className={`relative ${s.card} bg-[#0f1724] rounded-2xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col`}
        >
          {/* Header bar */}
          <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-b from-black/30 to-transparent">
            {/* window dots */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
            </div>

            {/* title */}
            <div className={`ml-2 ${s.font} text-gray-300 opacity-85`}>MBD • running</div>

            {/* rotating tag icon */}
            <div className="ml-auto">
              <div
                className={`inline-flex items-center justify-center ${s.icon} text-[var(--main-color)]`}
                aria-hidden
              >
                <svg
                  className="animate-spin-slow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M21 12h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M8 7L3 12l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 7l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Code area */}
          <div className="flex-1 p-3 sm:p-4">
            <div className="w-full h-full rounded-md bg-gradient-to-b from-[#071028] to-[#071321] p-3 relative">
              {/* faux lines */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-3 bg-[rgba(255,255,255,0.06)] rounded"></div>
                  <div className="h-3 bg-[rgba(255,255,255,0.08)] rounded flex-1 overflow-hidden relative">
                    <span className="block absolute left-0 top-0 h-full bg-[var(--main-color)] typing-line" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-3 bg-[rgba(255,255,255,0.06)] rounded"></div>
                  <div className="h-3 bg-[rgba(255,255,255,0.05)] rounded flex-1 overflow-hidden relative">
                    <span className="block absolute left-0 top-0 h-full bg-[var(--secondary-color-1)] typing-line2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-3 bg-[rgba(255,255,255,0.06)] rounded"></div>
                  <div className="h-3 bg-[rgba(255,255,255,0.04)] rounded flex-1 overflow-hidden relative">
                    <span className="block absolute left-0 top-0 h-full bg-[var(--main-color)] typing-line3" />
                  </div>
                </div>

                {/* cursor line */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-3 bg-[rgba(255,255,255,0.06)] rounded"></div>
                  <div className="h-3 bg-[rgba(255,255,255,0.03)] rounded flex-1 relative">
                    <span className="typing-cursor" />
                  </div>
                </div>
              </div>

              {/* optional overlay code brackets for style */}
              <div className="absolute right-3 bottom-3 text-[10px] text-gray-400 opacity-80">
                <span className="block">&lt;code&gt;</span>
                <span className="block">&lt;/code&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hidden text for screen readers */}
      <span className="sr-only">Loading — تحميل المحتوى</span>

      {/* Inline small CSS for animations (no external libs) */}
      <style jsx>{`
        /* slow spin for tag icon */
        .animate-spin-slow {
          animation: spin 3s linear infinite;
          width: 1.75rem;
          height: 1.75rem;
          color: var(--main-color);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* typing bars animations */
        .typing-line {
          width: 0%;
          animation: typing 2s linear infinite;
          opacity: 0.95;
        }
        .typing-line2 {
          width: 0%;
          animation: typing 2.2s linear 0.2s infinite;
          opacity: 0.9;
        }
        .typing-line3 {
          width: 0%;
          animation: typing 1.8s linear 0.4s infinite;
          opacity: 0.85;
        }

        @keyframes typing {
          0% { width: 0%; }
          40% { width: 65%; }
          70% { width: 55%; }
          100% { width: 0%; }
        }

        /* blinking cursor */
        .typing-cursor {
          position: absolute;
          right: 0;
          top: 0.15rem;
          width: 2px;
          height: calc(100% - 0.15rem);
          background: var(--main-color);
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* responsive tweaks */
        @media (max-width: 640px) {
          .typing-line, .typing-line2, .typing-line3 { animation-duration: 1.6s; }
        }
      `}</style>
    </>
  );
}
