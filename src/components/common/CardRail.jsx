import { motion } from "framer-motion";

export default function CardRail({ cards, sliderRef, onNext, onPrev }) {
  return (
    <div className="px-5 sm:px-6 pb-[90px] pt-[40px] sm:pt-[50px]">
      <div className="mx-auto">
        <div
          ref={sliderRef}
          className="
              flex gap-5 overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              lg:grid lg:grid-cols-4 lg:overflow-visible
            "
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="
                  group relative
                  min-w-[78%] sm:min-w-[320px] lg:min-w-0
                  h-[360px] sm:h-[430px]
                  overflow-hidden bg-black
                  snap-start
                "
            >
              <img
                src={card.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.7)_100%)]" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-right text-white">
                <h3 className="mb-2 text-[18px] sm:text-[22px] font-medium">
                  {card.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] leading-[1.9] text-white/85">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 sm:mt-8 flex w-full items-center justify-start text-[#7A1E2C]"
        >
          <div className="flex items-center gap-4">
            <button onClick={onNext} className="transition hover:opacity-70">
              →
            </button>
            <button onClick={onPrev} className="transition hover:opacity-70">
              ←
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
