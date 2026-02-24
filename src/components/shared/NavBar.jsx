import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PageContainer from "../common/PageContainer";
import bookingIcon from "../../assets/icons/booking.png";
import bookingIconAlt from "../../assets/icons/booking-1.png";
import mainTitleLogo from "../../assets/icons/main-title.png";
import mainTitleSidebar from "../../assets/icons/main-title-3.png";
import menuIcon from "../../assets/icons/menu.png";
import phoneIcon from "../../assets/icons/phone.png";
import { BOOKING_URL, UNIFIED_PHONE_NUMBER } from "../../constants/siteConfig";

const sections = [
  { id: "hero", label: "الرئيسية" },
  { id: "experience", label: "التجربة" },
  { id: "destinations", label: "الوجهات" },
  { id: "heritage", label: "الثقافة" },
  { id: "start-story", label: "الحجوزات" },
  { id: "contact", label: "تواصل معنا", route: "/contact" },
];
const PENDING_SCROLL_SECTION_KEY = "pending-scroll-section";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const pendingSection = window.sessionStorage.getItem(
      PENDING_SCROLL_SECTION_KEY,
    );
    if (!pendingSection) return;
    window.sessionStorage.removeItem(PENDING_SCROLL_SECTION_KEY);
    window.requestAnimationFrame(() => {
      const el = document.getElementById(pendingSection);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  }, [isHome, location.pathname]);

  const goToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSidebarNavigation = (sec) => {
    if (sec.id === "start-story") {
      setMenuOpen(false);
      if (isHome) {
        goToSection(sec.id);
      } else {
        window.sessionStorage.setItem(PENDING_SCROLL_SECTION_KEY, sec.id);
        navigate("/");
      }
      return;
    }

    if (sec.route) {
      setMenuOpen(false);
      navigate(sec.route);
      return;
    }

    goToSection(sec.id);
  };

  // ================= CONTACT NAVBAR =================
  if (!isHome) {
    return (
      <header className="sticky top-0 z-50 bg-[#7A1E2C] shadow-lg">
        <PageContainer className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="flex min-h-[80px] items-center justify-between text-white">
            {/* RIGHT */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-3"
            >
              <span>احجز الآن</span>
              <img src={bookingIconAlt} className="h-5 invert" />
            </a>

            {/* CENTER */}
            <Link to="/">
              <img
                src={mainTitleLogo}
                className="w-[160px] sm:w-[200px]"
                alt="logo"
              />
            </Link>

            {/* LEFT (CHANGED) */}
            <Link to="/" className="flex items-center gap-3">
              <span>الصفحة الرئيسية</span>
              <img src={menuIcon} className="h-5 invert" />
            </Link>
          </div>
        </PageContainer>
      </header>
    );
  }

  // ================= HOME NAVBAR =================
  return (
    <>
      {/* ================= SIDEBAR ================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed right-0 top-0 z-[100] h-full w-full sm:w-[420px] bg-[#E9DFD2] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#7A1E2C]/10">
                <img src={mainTitleSidebar} className="w-[140px]" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-[#7A1E2C] text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-2 p-6">
                {sections.map((sec, i) => (
                  <motion.button
                    key={sec.id}
                    onClick={() => handleSidebarNavigation(sec)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="text-right text-[22px] font-medium text-[#7A1E2C] py-4 px-4 rounded-lg hover:bg-[#7A1E2C]/5 transition"
                  >
                    {sec.label}
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.nav
        className={`
          fixed inset-x-0 top-0 z-[60]
          transition-all duration-500
          ${
            scrolled
              ? "bg-[#7A1E2C]/95 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <PageContainer className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="relative flex min-h-[72px] sm:min-h-[96px] items-center justify-between">
            {/* LEFT */}
            <div
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-3 text-white cursor-pointer"
            >
              <img src={menuIcon} className="h-5" />
              <span className="text-[14px] sm:text-base">قائمة</span>

              <div className="hidden sm:flex items-center gap-3">
                <img src={phoneIcon} className="h-5" />
                <span>{UNIFIED_PHONE_NUMBER}</span>
              </div>
            </div>

            {/* CENTER LOGO */}
            <img
              src={mainTitleLogo}
              alt="logo"
              className="pointer-events-none absolute left-1/2 hidden sm:block w-[200px] -translate-x-1/2"
            />

            {/* RIGHT */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-3 text-white"
            >
              <span>احجز الآن</span>
              <img src={bookingIcon} className="h-5" />
            </a>

            {/* MOBILE LOGO */}
            <img
              src={mainTitleLogo}
              alt="logo"
              className="w-[120px] sm:hidden"
            />
          </div>
        </PageContainer>
      </motion.nav>
    </>
  );
}
