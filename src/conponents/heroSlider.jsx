"use client";
import { useState, useEffect } from "react";
import {useTranslations} from 'next-intl';


export default function HeroSlider() {
  const t = useTranslations('Home')
  const [current, setCurrent] = useState(0);
  const phoneNumber = "0952684662"; 

const slides = [
  {
    id: 1,
    message : "أريد ان استفسر عن الكورسات التي تقدمونها",
    title: t('titleslide1'),
    desc: t("descslide1"),
    btnText: t("btnTextslide1"),
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1900&q=80",
  },
  { 
    id: 2,
    message : "أريد ان ابني موقع الكتروني ممكن مساعدة؟",
    title: t('titleslide2'),
    desc: t("descslide2"),
    btnText: t("btnTextslide2"),
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1900&q=80",
  },
];

 
  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full md:mt-[177px] h-[55vh] md:h-[75vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="relative w-full h-full bg-center bg-cover flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            {/* 🔹 Black overlay for better contrast */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Slide Content */}
            <div className="relative text-center text-white px-6 md:px-20 max-w-3xl z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg text-white capitalize md:text-xl mb-6">{slide.desc}</p>
              <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(slide.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--main-color)] hover:bg-[var(--main-color)] text-white px-6 py-3 rounded-full text-lg transition"
          >
            {slide.btnText}
          </a>
            </div>
          </div>
        </div>
      ))}

      {/* Always visible Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[var(--secondary-color-1)] w-4"
                : "bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
