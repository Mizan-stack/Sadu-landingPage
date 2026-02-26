import { motion } from "framer-motion";
import PageContainer from "../components/common/PageContainer";
import bookingIcon from "../assets/icons/booking-1.png";
import contactImage from "../assets/images/bg-8.png";
import { useContentContext } from "../contexts/ContentContext";

const CONTACT_EMAIL = "info@sduksa.com";

export default function ContactPage() {
  const { config } = useContentContext();
  const data = config?.contact;

  return (
    <div dir="rtl" className="min-h-screen bg-[#F3E0CF]">
      {/* ================= HERO TITLE ================= */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[32px] sm:text-[52px] font-medium text-[#7A1E2C]"
        >
          {data?.title || "للتواصل مع سدو بوتيك"}
        </motion.h1>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="pb-16">
        <PageContainer className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* ================= IMAGE SIDE ================= */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="order-2 lg:order-1"
            >
              <div className="overflow-hidden">
                <img
                  src={data?.sideImageUrl || contactImage}
                  alt=""
                  className="h-[320px] sm:h-[420px] lg:h-[520px] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* ================= FORM SIDE ================= */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-1 lg:order-2"
            >
              <p className="mb-10 max-w-[520px] text-[14px] leading-[2] text-[#6B5B4D]">
                {data?.intro ||
                  "كل تواصل معنا هو بداية تجربة مصممة بعناية. يسعدنا أن نكون على تواصل معك، شاركنا استفساراتك أو خططك للإقامة، ودع فريق سدو يعتني بكل التفاصيل لنمنحك تجربة راقية ومطمئنة."}
              </p>

              <form className="space-y-6">
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-[#7A1E2C]">
                    {data?.form?.nameLabel || "الاسم"}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder={data?.form?.placeholders?.name || "مثال: محمد أمين"}
                    className="w-full border-b border-[#7A1E2C]/20 bg-transparent py-3 outline-none focus:border-[#7A1E2C] placeholder:text-gray-400"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-[#7A1E2C]">
                    {data?.form?.phoneLabel || "رقم الجوال"}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder={data?.form?.placeholders?.phone || "مثال: 1256 123 961"}
                    className="w-full border-b border-[#7A1E2C]/20 bg-transparent py-3 outline-none focus:border-[#7A1E2C] placeholder:text-gray-400"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-[#7A1E2C]">
                    {data?.form?.emailLabel || "بريدك الإلكتروني"}
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder={data?.form?.placeholders?.email || "username@example.com"}
                    className="w-full border-b border-[#7A1E2C]/20 bg-transparent py-3 outline-none focus:border-[#7A1E2C] placeholder:text-gray-400"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="mb-2 block text-[#7A1E2C]">
                    {data?.form?.messageLabel || "الرسالة"}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={data?.form?.placeholders?.message || "اكتب ما يأتي في خاطرك"}
                    className="w-full resize-none border-b border-[#7A1E2C]/20 bg-transparent py-3 outline-none focus:border-[#7A1E2C] placeholder:text-gray-400"
                  />
                </div>

                {/* TODO: Integrate form submission backend to send messages to CONTACT_EMAIL (info@sduksa.com). */}
                {/* BUTTON */}
                <button
                  type="submit"
                  className="mt-4 inline-flex items-center gap-2 bg-[#7A1E2C] px-8 py-3 text-white transition hover:bg-[#651823]"
                >
                  <span>{data?.form?.submitText || "أرسل"}</span>
                  <img src={bookingIcon} className="h-4 invert" alt="" loading="lazy" decoding="async" />
                </button>
              </form>
            </motion.div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
