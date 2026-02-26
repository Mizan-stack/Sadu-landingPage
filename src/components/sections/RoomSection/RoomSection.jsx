import React, { useRef } from "react";
import { motion } from "framer-motion";

import CardRail from "../../common/CardRail";
import TopFrameOrnament from "../../common/TopFrameOrnament";
import { useContentContext } from "../../../contexts/ContentContext";
import heroBg from "../../../assets/images/bg-4.png";
import card1 from "../../../assets/images/bg-16.png";
import card2 from "../../../assets/images/bg-17.png";
import card3 from "../../../assets/images/bg-18.png";
import card4 from "../../../assets/images/bg-8.png";
import topFrame from "../../../assets/icons/fram.png";

const DEFAULT_DESCRIPTION =
  "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nفلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة.";

function RoomSection() {
  const { config } = useContentContext();
  const data = config?.home?.room;
  const sliderRef = useRef(null);

  const description = data?.description ?? DEFAULT_DESCRIPTION;
  const descriptionParts = description.split("\n");

  const cards = (data?.cards || [
    { title: "الأصالة", imageUrl: card1, description: "إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل " },
    { title: "الكرم", imageUrl: card2, description: "حفاوة تفيض بالود والترحاب، وتجسد جود الضيافة" },
    { title: "التفرد", imageUrl: card3, description: "إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل " },
    { title: "الطموح", imageUrl: card4, description: "نبتكر آفاقًا جديدة للضيافة السعودية تجمع بين طموحنا ورؤية 2030." },
  ]).map((c) => ({
    img: c.imageUrl || c.img,
    title: c.title,
    desc: c.description || c.desc,
  }));

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.children[0].offsetWidth + 24;

    sliderRef.current.scrollBy({
      left: dir === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section dir="rtl" className="w-full overflow-hidden bg-[#F3E0CF]">
      <TopFrameOrnament
        src={data?.ornamentUrl || topFrame}
        className="pointer-events-none w-full object-cover opacity-70"
      />

      {/* ================= HERO ================= */}
      <div className="relative h-[620px] sm:h-[800px] w-full overflow-hidden">
        <motion.img
          src={data?.backgroundImageUrl || heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.04 }}
          viewport={{ once: true }}
          transition={{ duration: 16, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.15)_100%)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />

        {/* ===== TEXT ===== */}
        <div className="absolute inset-0 flex items-center justify-start px-5 sm:p-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-[560px] text-right text-white"
          >
            <h2 className="mb-4 sm:mb-5 text-[30px] sm:text-[52px] font-medium leading-[1.3]">
              {data?.heading || "قيمنا تنسج هويتنا في الضيافة"}
            </h2>

            <p className="text-[13px] sm:text-[15px] leading-[2] text-white/85">
              {descriptionParts.map((part, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {part}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>

      <CardRail
        cards={cards}
        sliderRef={sliderRef}
        onNext={() => scroll("next")}
        onPrev={() => scroll("prev")}
      />
    </section>
  );
}
export default React.memo(RoomSection);
