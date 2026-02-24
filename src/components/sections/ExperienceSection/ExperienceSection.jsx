import { motion } from "framer-motion";
import { useRef } from "react";
import CardRail from "../../common/CardRail";
import heroBg from "../../../assets/images/bg-4.png";
import card1 from "../../../assets/images/bg-5.png";
import card2 from "../../../assets/images/bg-6.png";
import card3 from "../../../assets/images/bg-7.png";
import card4 from "../../../assets/images/bg-8.png";

const cards = [
  {
    img: card1,
    title: "إقامة متفردة",
    desc: "خصوصية تامة تحيط بكم وتصميم يعكس الطابع الأصيل والرفاهية.",
  },
  {
    img: card2,
    title: "كرم الضيافة",
    desc: "خدمة تُقدَّم بشغف، تُعنى بالتفاصيل لتمنحكم تجربة لا تُنسى.",
  },
  {
    img: card3,
    title: "جودة السكن",
    desc: "مساحات ورفاهية عصرية صُممت لتأخذ بكم إلى أقصى درجات الراحة.",
  },
  {
    img: card4,
    title: "رحابة الاستقبال",
    desc: "فريق محترف يستقبلكم بروح الضيافة السعودية الأصيلة.",
  },
];

export default function ExperienceSection() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.children[0].offsetWidth + 24;

    sliderRef.current.scrollBy({
      left: dir === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="experience"
      dir="rtl"
      className="w-full overflow-hidden bg-[#E9DFD2]"
    >
      {/* ================= HERO ================= */}
      <div className="relative h-[620px] sm:h-[800px] w-full overflow-hidden">
        <motion.img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.04 }}
          viewport={{ once: true }}
          transition={{ duration: 16, ease: "easeOut" }}
        />

        {/* overlay */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.15)_100%)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />

        {/* ===== TEXT (mobile fixed) ===== */}
        <div className="absolute inset-0 flex items-center justify-start px-5 sm:p-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-[560px] text-right text-white"
          >
            <h2
              className="
              mb-4 sm:mb-5
              text-[30px] sm:text-[52px]
              font-medium leading-[1.3]
            "
            >
              على الرحب والقلب
              <br />
              أوسع من الدار
            </h2>

            <p className="text-[13px] sm:text-[15px] leading-[2] text-white/85">
              علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين
              من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.
              <br />
              فلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص
              الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة.
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
