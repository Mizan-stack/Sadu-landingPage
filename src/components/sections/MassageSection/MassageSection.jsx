import React from "react";
import { motion } from "framer-motion";

import { useContentContext } from "../../../contexts/ContentContext";
import FloatingImagePair from "../../common/FloatingImagePair";
import PageContainer from "../../common/PageContainer";
import bigImage from "../../../assets/images/bg-8.png";
import smallImage from "../../../assets/images/bg-6.png";

function MassageSection() {
  const { config } = useContentContext();
  const data = config?.home?.massage;

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#F3E0CF]"
    >
      <PageContainer className="relative z-[2] mx-auto max-w-[1320px] px-4 sm:px-6 py-[70px] sm:py-[120px]">
        <div className="grid items-center gap-12 sm:gap-16 lg:grid-cols-2">
          {/* ================= MOBILE IMAGE FIRST ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full order-1 lg:order-1"
          >
            <FloatingImagePair
              bigImageSrc={data?.mainImageUrl || bigImage}
              bigImageClassName="w-full max-w-[620px] object-cover"
              smallWrapperClassName="
                absolute
                bottom-[-30px] right-[20px]
                sm:bottom-[40px] sm:right-[-40px]
                w-[120px] sm:w-[160px]
                border-[6px] sm:border-[8px]
                border-[#F3E0CF]
                bg-white
                shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              "
              smallImageSrc={data?.smallImageUrl || smallImage}
              smallImageClassName="h-auto w-full object-cover"
            />
          </motion.div>

          {/* ================= TEXT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right order-2 mt-[40px] lg:mt-0"
          >
            <h2 className="mb-5 text-[30px] sm:text-[48px] font-medium text-[#7A1E2C]">
              {data?.heading || "رسالتنا"}
            </h2>

            <p className="mb-6 sm:mb-8 max-w-[520px] text-[14px] sm:text-[16px] leading-[2] text-[#6B5B4D]">
              {data?.body || "تقديم تجربة ضيافة متكاملة، تنبع من روح السعودية، بأسلوب يجمع بين حفاوة المكان وطمأنينة الإقامة ليجد ضيوفنا في رحابنا ألفة الدار وفخامة الوجهة."}
            </p>

            <div className="h-[24px]" aria-hidden />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
export default React.memo(MassageSection);
