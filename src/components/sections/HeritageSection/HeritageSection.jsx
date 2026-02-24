import { motion } from "framer-motion";

import PageContainer from "../../common/PageContainer";
import TopFrameOrnament from "../../common/TopFrameOrnament";
import topFrame from "../../../assets/icons/fram.png";
import img1 from "../../../assets/images/bg-12.png";
import img2 from "../../../assets/images/bg-13.png";
import img3 from "../../../assets/images/bg-14.png";

export default function HeritageSection() {
  const images = [img1, img2, img3];

  return (
    <section id="heritage" dir="rtl" className="w-full overflow-hidden bg-[#F3E0CF]">
      {/* ===== top ornament ===== */}
      <TopFrameOrnament
        src={topFrame}
        className="pointer-events-none w-full object-cover opacity-70"
      />

      <PageContainer className="mx-auto max-w-[1320px] px-4 sm:px-6 pb-[90px] sm:pb-[120px] pt-[50px] sm:pt-[70px]">
        {/* ================= HEADER ================= */}

        {/* ✅ MOBILE HEADER (طبق الصورة) */}
        <div className="mb-10 block lg:hidden text-center">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-[32px] font-medium text-[#7A1E2C]"
          >
            ثقافة تاريخية
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-[520px] text-[14px] leading-[2.1] text-[#6B5B4D]"
          >
            علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من
            فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.
            <br />
            <br />
            تُجسد فلسفة سدو في كمال التفاصيل بدءًا من التصاميم المكانية التي
            تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة
            التي تمنح الضيف شعورًا حقيقيًا بالترحيب والانتماء.
          </motion.p>
        </div>

        {/* ❌ DESKTOP HEADER — UNCHANGED */}
        <div className="mb-16 hidden lg:grid items-start gap-4 lg:grid-cols-2">
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-right text-[48px] font-medium text-[#7A1E2C]"
          >
            ثقافة تاريخية
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-[620px] text-right leading-[2.1] text-[#6B5B4D] lg:mx-auto"
          >
            علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من
            فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.
            <br />
            <br />
            تُجسد فلسفة سدو في كمال التفاصيل بدءًا من التصاميم المكانية التي
            تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة
            التي تمنح الضيف شعورًا حقيقيًا بالترحيب والانتماء.
          </motion.p>
        </div>

        {/* ================= IMAGES ================= */}

        {/* ✅ MOBILE — صورتين جنب بعض */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {[images[0], images[2]].map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="overflow-hidden bg-black"
            >
              <img src={img} alt="" className="h-[220px] w-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* ❌ DESKTOP GRID — UNCHANGED */}
        <div className="hidden lg:grid gap-10 md:grid-cols-3">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group overflow-hidden bg-black"
            >
              <img
                src={img}
                alt=""
                className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
