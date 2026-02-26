import React from "react";
import { motion } from "framer-motion";
import FloatingImagePair from "../../common/FloatingImagePair";
import PageContainer from "../../common/PageContainer";
import TopFrameOrnament from "../../common/TopFrameOrnament";
import { useContentContext } from "../../../contexts/ContentContext";
import titleIcon from "../../../assets/icons/main-title-2.png";
import topFrame from "../../../assets/icons/fram.png";
import bgMain from "../../../assets/images/bg-1.png";
import bgSmall from "../../../assets/images/bg-2.png";
import bgPattern from "../../../assets/images/bg-3.png";

const INTRO_FALLBACK =
  "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nعلامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.";

const BODY_FALLBACK =
  "علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nتحت مظلة علامة سدو، تتجسد التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي تلامس خصوصية الضيف وتمنحه شعورًا حقيقيًا بالترحيب والانتماء.";

function HadaraSection() {
  const { config } = useContentContext();
  const data = config?.home?.hadara;

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#F3E0CF]"
    >
      {/* ===== TOP FULL WIDTH FRAME ===== */}
      <TopFrameOrnament
        src={data?.ornamentUrl || topFrame}
        ariaHidden
        className="w-full object-cover"
      />

      <PageContainer className="relative z-[2] mx-auto w-full max-w-[1320px] px-6 py-[80px] sm:py-[120px]">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-[60px] sm:mb-[80px] max-w-[720px] text-center"
        >
          <img
            src={data?.titleIconUrl || titleIcon}
            alt="حضارة حيّة"
            className="mx-auto mb-6 h-auto w-[180px] sm:w-[220px]"
            loading="lazy"
            decoding="async"
          />

          <p className="mx-auto max-w-[640px] whitespace-pre-line text-[14px] sm:text-[16px] leading-[2] text-[#6B5B4D]">
            {data?.introText ?? INTRO_FALLBACK}
          </p>
        </motion.div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid items-center gap-12 sm:gap-16 lg:grid-cols-2">
          {/* ===== IMAGE BLOCK (يظهر أول في الموبايل) ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full order-1 lg:order-2"
          >
            <FloatingImagePair
              bigImageSrc={data?.mainImageUrl || bgMain}
              bigImageClassName="w-full max-w-[640px] object-cover"
              smallWrapperClassName="
    absolute 
    bottom-[-48px] right-[18px]       
    sm:bottom-[40px] sm:right-[-40px]  
    w-[120px] sm:w-[160px]
    border-[3px] border-[#F3E0CF]
    bg-white
    shadow-[0_25px_60px_rgba(0,0,0,0.25)]
  "
              smallImageSrc={data?.smallImageUrl || bgSmall}
              smallImageClassName="h-auto w-full object-cover"
            />
          </motion.div>

          {/* ===== TEXT BLOCK ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative text-right order-2 lg:order-1"
          >
            {/* pattern */}
            <img
              src={data?.patternImageUrl || bgPattern}
              alt=""
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 z-0 w-[260px] sm:w-[520px] -translate-y-1/2 opacity-40"
              loading="lazy"
              decoding="async"
            />

            <div className="relative z-[2]">
              <h2 className="mb-6 text-[32px] sm:text-[44px] font-medium text-[#7A1E2C]">
                {data?.heading ?? "هوية نعتز بها"}
              </h2>

              <p className="mb-8 max-w-[520px] whitespace-pre-line text-[14px] sm:text-[16px] leading-[2] text-[#6B5B4D]">
                {data?.body ?? BODY_FALLBACK}
              </p>

              <div className="h-[24px]" aria-hidden />
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
export default React.memo(HadaraSection);
