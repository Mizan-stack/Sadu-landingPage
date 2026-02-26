import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import PageContainer from "../../common/PageContainer";
import { useContentContext } from "../../../contexts/ContentContext";
import img1 from "../../../assets/images/bg-11.png";
import img2 from "../../../assets/images/bg-8.png";
import img3 from "../../../assets/images/bg-10.png";

function DestinationsSection() {
  const shouldReduceMotion = useReducedMotion();
  const dragHintMotionProps = shouldReduceMotion
    ? {}
    : {
        animate: { x: [0, 8, 0], opacity: [0.78, 1, 0.78] },
        transition: {
          duration: 2.1,
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
        },
        whileHover: { x: 0, opacity: 1 },
      };

  const { config } = useContentContext();
  const data = config?.home?.destinations;
  const cards = data?.cards || [
    { name: "سدو بوتيك الخبر", imageUrl: img1, description: "مساحة مصممة للهدوء وخصوصية الإقامة." },
    { name: "سدو بوتيك الرياض", imageUrl: img2, description: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة." },
    { name: "سدو بوتيك المدينة", imageUrl: img3, description: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section
      dir="rtl"
      className="w-full overflow-hidden bg-[#E9DFD2] py-[80px] sm:py-[110px]"
    >
      <PageContainer className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* ===== title ===== */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mb-8 text-right font-medium text-[#7A1E2C]

            /* mobile */
            text-[28px]

            /* desktop */
            sm:mb-12 sm:text-[44px]
          "
        >
          {data?.heading || "اختر وجهتك"}
        </motion.h2>

        {/* ================= MOBILE ================= */}
        <div className="block lg:hidden">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="group"
          >
            {/* image */}
            <div className="relative overflow-hidden bg-black">
              <img
                src={cards[activeIndex].imageUrl}
                alt={cards[activeIndex].name}
                className="h-[460px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />

              {/* drag circle */}
              <motion.div
                drag="x"
                dragConstraints={{ left: -140, right: 140 }}
                dragElastic={0.35}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 60) handleNext();
                  if (info.offset.x < -60) handlePrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
              >
                <motion.div
                  {...dragHintMotionProps}
                  className="flex h-[90px] w-[90px] items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-md"
                >
                  اسحب
                </motion.div>
              </motion.div>
            </div>

            {/* text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-5 text-center"
            >
              <h3 className="mb-2 text-[22px] font-medium text-[#7A1E2C]">
                {cards[activeIndex].name}
              </h3>
              <p className="text-[14px] leading-[1.9] text-[#6B5B4D]">
                {cards[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ================= DESKTOP (UNCHANGED) ================= */}
        <div className="hidden lg:flex items-start gap-6">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`group ${isActive ? "flex-[2.2]" : "flex-1"}`}
              >
                <div className="relative overflow-hidden bg-black">
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                      isActive ? "h-[460px]" : "h-[420px]"
                    }`}
                    loading="lazy"
                    decoding="async"
                  />

                  {isActive && (
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: -120, right: 120 }}
                      dragElastic={0.3}
                      onDragEnd={(e, info) => {
                        if (info.offset.x > 60) handleNext();
                        if (info.offset.x < -60) handlePrev();
                      }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    >
                      <motion.div
                        {...dragHintMotionProps}
                        className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-md transition hover:scale-105"
                      >
                        اسحب
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={isActive ? "active" : "idle"}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="mt-5 text-right"
                  >
                    <h3 className="mb-2 text-[22px] font-medium text-[#7A1E2C]">
                      {card.name}
                    </h3>
                    <p className="text-[14px] leading-[1.9] text-[#6B5B4D]">
                      {card.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
export default React.memo(DestinationsSection);
