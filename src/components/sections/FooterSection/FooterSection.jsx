import { motion } from "framer-motion";

import InlineBookingCTA from "../../common/InlineBookingCTA";
import footerBg from "../../../assets/images/bg-11.png";
import bookingIcon from "../../../assets/icons/booking-1.png";
import { BOOKING_URL, UNIFIED_PHONE_NUMBER } from "../../../constants/siteConfig";

export default function FooterSection() {
  return (
    <footer id="contact" dir="rtl" className="w-full overflow-hidden bg-[#E9DFD2]">
      {/* ===== HERO AREA ===== */}
      <div id="start-story" className="relative h-[620px] w-full overflow-hidden">
        {/* background image */}
        <motion.img
          src={footerBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 18, ease: "easeOut" }}
        />

        {/* ===== floating card (LEFT + TOP) ===== */}
        <div className="absolute inset-0 flex items-start justify-start px-6 ">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[520px] bg-[#EAE3D6] p-10 text-right shadow-[0_40px_120px_rgba(0,0,0,0.25)]"
          >
            {/* small ornament */}
            <div className="mb-6 flex justify-end">
              <img
                src={bookingIcon}
                alt=""
                className="h-[18px] w-auto transition duration-300 group-hover:translate-x-[-4px]"
              />
            </div>

            <h2 className="mb-6 text-[44px] font-medium leading-[1.3] text-[#7A1E2C]">
              ابدأ قصتك في
              <br />
              سدو
            </h2>

            <p className="mb-8 leading-[2] text-[#6B5B4D]">
              هنا لا تقيم، بل تعيش تجربة مصممة لتشبهك. كل تفصيل، كل ضوء، وكل
              مساحة خُلقت لتمنحك شعورًا بالانتماء لا يمكن تكراره.
            </p>

            <InlineBookingCTA
              iconSrc={bookingIcon}
              iconClassName="h-[18px] w-auto transition duration-300 group-hover:translate-x-[-4px]"
              label="احجز الآن"
              labelClassName="text-[16px]"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          </motion.div>
        </div>
      </div>

      {/* ===== bottom bar ===== */}
      <div className="flex items-center justify-between bg-[#E9DFD2] px-6 py-4 text-[14px] text-[#7A1E2C]">
        {/* left text */}
        <span>2026 © جميع الحقوق محفوظة سدو بوتيك</span>

        {/* right number */}
        <span>{UNIFIED_PHONE_NUMBER}</span>
      </div>
    </footer>
  );
}
