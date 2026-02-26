import React from "react";
import { motion } from "framer-motion";

import { useContentContext } from "../../../contexts/ContentContext";
import mainImage from "../../../assets/images/bg-9.png";
import patternBg from "../../../assets/images/bg-3.png";

const defaultBody =
  "نستمد من عمق التراث السعودي فنون الضيافة الأصيلة، لتجربة فندقية تعكس هويتنا وتمنح ضيوفنا لحظات إقامة لا تُنسى بتجربة وروح سعودية خالصة.\n\nيجمع نموذجنا الفندقي بين مرونة الابتكار ودقة التنفيذ عبر اعتماد أرقى الممارسات التي تحقق النجاح لشركائنا وتمنح ضيوفنا أعلى معايير جودة الإقامة.";

function IdentitySection() {
  const { config } = useContentContext();
  const data = config?.home?.identity;
  const bodyParts = (data?.body ?? defaultBody).split("\n\n");

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden"
    >
      {/* ===== layered background colors ===== */}
      <div className="absolute inset-0 bg-[#E9DFD2]" />
      <div className="absolute inset-y-0 left-0 w-[80%] bg-[#E3D6C6]" />

      {/* ===== pattern ===== */}
      <img
        src={data?.patternImageUrl || patternBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-[55%] object-cover opacity-60 mix-blend-multiply"
        loading="lazy"
        decoding="async"
      />

      {/* ================= CONTAINER ================= */}
      <div
        className="
          relative z-[2] mx-auto max-w-[1320px]

          /* ✅ mobile padding */
          px-5 py-[70px]

          /* ✅ desktop untouched */
          sm:px-6 sm:py-[120px]
        "
      >
        {/* ================= GRID ================= */}
        <div
          className="
            grid items-center gap-10

            /* ✅ mobile: صورة فوق */
            grid-cols-1

            /* ✅ desktop كما هو */
            lg:grid-cols-2 lg:gap-16
          "
        >
          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="
              relative flex justify-center

              /* desktop يرجع مكانه */
              lg:justify-start
            "
          >
            <div
              className="
                w-full

                /* ✅ mobile height */
                max-w-[520px]

                /* desktop */
                lg:w-[941px] lg:max-w-full
              "
            >
              <img
                src={data?.mainImageUrl || mainImage}
                alt=""
                className="
                  w-full object-cover

                  /* ✅ mobile height */
                  h-[420px]

                  /* desktop */
                  lg:h-[500px]

                  shadow-[0_40px_120px_rgba(0,0,0,0.25)]
                "
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* ================= TEXT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="
              text-right

              /* ✅ mobile spacing */
              px-2

              /* desktop untouched */
              lg:px-0
            "
          >
            <h2
              className="
                mb-4 font-medium text-[#7A1E2C]

                /* ✅ mobile size */
                text-[28px]

                /* desktop */
                lg:mb-6 lg:text-[48px]
              "
            >
              {data?.heading || "هويتنا أصل ضيافتنا"}
            </h2>

            <p
              className="
                mb-6 leading-[2] text-[#6B5B4D]

                /* ✅ mobile */
                text-[13px] max-w-full

                /* desktop */
                lg:mb-8 lg:text-[16px] lg:max-w-[520px]
              "
            >
              {bodyParts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < bodyParts.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </span>
              ))}
            </p>

            <div className="h-[24px]" aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(IdentitySection);
