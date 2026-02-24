import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import heroImage from "../../../assets/images/hero.png";
import heroImage2 from "../../../assets/images/bg-10.png";
import heroImage3 from "../../../assets/images/bg-11.png";

const heroSlides = [heroImage, heroImage2, heroImage3];
const slides = [...new Set(heroSlides.filter(Boolean))];
const fallbackSlides = slides.length > 0 ? slides : [heroImage];

const stats = [
  { value: "24/7", label: "خدمة ضيوف مخصصة" },
  { value: "233+", label: "غرفة وجناح" },
  { value: "5", label: "وجهة بوتيكية" },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % fallbackSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const next = () => setIndex((p) => (p + 1) % fallbackSlides.length);
  const prev = () =>
    setIndex((p) => (p - 1 + fallbackSlides.length) % fallbackSlides.length);

  return (
    <section
      id="hero"
      dir="rtl"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* BG */}
      <motion.img
        key={index}
        src={fallbackSlides[index]}
        alt=""
        aria-hidden
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.02, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* overlays */}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_30%,rgba(0,0,0,0.65)_100%)]" />
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(120deg,rgba(138,84,47,0.15)_0%,rgba(33,18,10,0.15)_100%)]" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-[4]">
        <div className="mx-auto flex h-full max-w-[1320px] items-end justify-end pr-4 pl-4 pb-[26vh] sm:pb-[12vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="ml-auto w-full max-w-[820px] text-right"
          >
            <h1 className="test-font-check [font-family:'TS_Zunburk_VF2','IBM_Plex_Sans_Arabic',Tajawal,sans-serif] text-[34px] leading-[1.35] sm:text-[44px] md:text-[80px] lg:text-[80px] font-medium text-[#F3E8DA]">
              <span className="block">اختبر الرفاهية كما</span>
              <span className="block">يجب أن تكون</span>
            </h1>

            {/* STATS */}
            <div className="mt-8 w-full text-right">
              <div className="flex w-full flex-row-reverse items-end justify-between gap-4 sm:w-fit sm:justify-start sm:gap-14">
                {stats.map((item) => (
                  <div key={item.value} className="text-right">
                    <p className="text-[26px] sm:text-[42px] font-medium text-[#F3E7D6]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[12px] sm:text-[18px] text-[#E6D7C2]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* SLIDER */}
              <div className="mt-6 flex w-full flex-row-reverse items-center justify-end gap-3 sm:w-fit sm:gap-4">
                <button
                  onClick={next}
                  className="text-white/80 transition hover:text-white"
                >
                  ←
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                  {fallbackSlides.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className={`h-[54px] w-[80px] sm:h-[78px] sm:w-[120px] object-cover transition ${
                        i === index
                          ? "opacity-90 ring-1 ring-white/40"
                          : "opacity-60"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={prev}
                  className="text-white/80 transition hover:text-white"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* فنادقنا */}
      <div className="hidden sm:block pointer-events-none absolute bottom-[120px] left-[20px] sm:left-[60px] z-[4]">
        <div className="relative w-[140px] sm:w-[200px] overflow-hidden border border-white/25 bg-black/25 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <img
            src={fallbackSlides[index]}
            alt=""
            className="h-[100px] sm:h-[130px] w-full object-cover opacity-85"
          />
          <div className="p-3 text-xs text-white/90">فنادقنا</div>
          <div className="pointer-events-none absolute left-3 top-3 text-white/80">
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}
