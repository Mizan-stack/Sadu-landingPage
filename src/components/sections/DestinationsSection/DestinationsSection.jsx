import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import PageContainer from "../../common/PageContainer";
import img1 from "../../../assets/images/bg-11.png";
import img2 from "../../../assets/images/bg-8.png";
import img3 from "../../../assets/images/bg-10.png";

export default function DestinationsSection() {
  const cards = [
    {
      img: img1,
      title: "سدو بوتيك الخبر",
      desc: "مساحة مصممة للهدوء وخصوصية الإقامة.",
    },
    {
      img: img2,
      title: "سدو بوتيك الرياض",
      desc: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة.",
    },
    {
      img: img3,
      title: "سدو بوتيك المدينة",
      desc: "مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة.",
    },
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
      id="destinations"
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
          اختر وجهتك
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
                src={cards[activeIndex].img}
                alt={cards[activeIndex].title}
                className="h-[460px] w-full object-cover"
              />

              {/* drag circle */}
              <motion.div
                drag="x"
                dragConstraints={{ left: -140, right: 140 }}
                dragElastic={0.35}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) handleNext();
                  if (info.offset.x > 60) handlePrev();
                }}
                className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
              >
                <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-md">
                  اسحب
                </div>
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
                {cards[activeIndex].title}
              </h3>
              <p className="text-[14px] leading-[1.9] text-[#6B5B4D]">
                {cards[activeIndex].desc}
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
                    src={card.img}
                    alt={card.title}
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                      isActive ? "h-[460px]" : "h-[420px]"
                    }`}
                  />

                  {isActive && (
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: -120, right: 120 }}
                      dragElastic={0.3}
                      onDragEnd={(e, info) => {
                        if (info.offset.x < -60) handleNext();
                        if (info.offset.x > 60) handlePrev();
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-md transition hover:scale-105">
                        اسحب
                      </div>
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
                      {card.title}
                    </h3>
                    <p className="text-[14px] leading-[1.9] text-[#6B5B4D]">
                      {card.desc}
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
