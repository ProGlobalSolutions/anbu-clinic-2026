import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MapPin, Phone, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, CONTACT_INFO } from "../constants";

import logo from "../assets/logobgremoved.webp";
import footlogo from "../assets/footlogo.png";

/* ================= MOBILE DROPDOWN ================= */
const MobileDropdown = ({ link, setIsOpen }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl font-medium flex items-center gap-2"
      >
        {link.label}
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex flex-col items-center mt-4 space-y-3"
          >
            {link.children.map((child: any) => (
              <Link
                key={child.label}
                to={child.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-500 text-lg"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================= HEADER ================= */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  let closeTimeout: any = null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleMouseEnter = (label: any) => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setDesktopDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setDesktopDropdown(null);
    }, 150);
  };

  const navClass =
    "relative inline-block text-gray-700 font-medium transition-all duration-300 hover:text-green-600 " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-600 " +
    "after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav
      className={`fixed w-full z-[999] ${
        scrolled ? "bg-white shadow-md py-2 lg:py-3" : "bg-white py-3"
      }`}
    >
      <div className="w-full pl-1 pr-4 lg:pl-3 lg:pr-8">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="hidden lg:block">
            <img src={logo} className="h-[5.5rem]" />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-10">
            {NAV_LINKS
  .filter(link => link.label !== "Patient Examination")
  .map((link: any) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {link.children ? (
                  <>
                    <button className={navClass + " flex items-center"}>
                      {link.label}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {desktopDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-3 w-56 bg-white shadow-lg rounded-lg py-2 border"
                        >
                          {link.children.map((child: any) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-green-600 hover:pl-5 transition-all"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={link.path} className={navClass}>
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* ADMIN BUTTON */}
          <div className="hidden lg:block">
            <Link
              to="/admin"
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Admin
            </Link>
          </div>

          {/* MOBILE HEADER */}
          <div className="lg:hidden flex justify-between w-full items-center pl-0 pr-2">
            <Link to="/">
             <img src={logo} className="h-[4rem] -ml-1" />
            </Link>

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

        </div>
      </div>

      {/* 🔥 NEW MOBILE MENU (FIXED DESIGN) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[999] flex flex-col items-center pt-20"
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5"
            >
              <X size={28} />
            </button>

            {/* LOGO CENTER */}
            <img src={logo} className="h-16 mb-10" />

            {/* MENU ITEMS */}
         <div className="flex flex-col items-center space-y-8">

  {NAV_LINKS
    .filter(link => link.label !== "Patient Examination")
    .map((link: any) => (
      <div key={link.label}>
        {link.children ? (
          <MobileDropdown link={link} setIsOpen={setIsOpen} />
        ) : (
          <Link
            to={link.path}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-medium"
          >
            {link.label}
          </Link>
        )}
      </div>
    ))}

  <Link
    to="/admin"
    onClick={() => setIsOpen(false)}
    className="text-2xl font-semibold"
  >
    Admin
  </Link>

</div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ================= FOOTER ================= */
const Footer = () => {
  return (
    <footer className="bg-green-700 text-white pt-12">

      {/* TOP SECTION */}
      <div className="w-full px-5 lg:max-w-7xl lg:mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">

        {/* LEFT - LOGO + DESCRIPTION */}
  <div className="flex flex-col items-center text-center">
  <img
    src={footlogo}
    alt="footer logo"
    className="h-28 md:h-32 object-contain"
  />

  <p className="text-sm leading-relaxed max-w-xs mt-2">
    Specialized Siddha-based natural treatments for skin conditions.
    Safe, effective, and personalized care for long-term healing.
  </p>
</div>

        {/* MIDDLE - QUICK LINKS */}
      <div className="hidden md:block text-center md:text-left">
  <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>

         <div className="flex flex-col space-y-2 text-sm items-center md:items-start">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <Link to="/about" className="hover:text-green-600">About</Link>
            <Link to="/treatments" className="hover:text-green-600">Treatments</Link>
            <Link to="/process/acne">Treatment Process</Link>
            <Link to="/faqs" className="hover:text-green-600">FAQs</Link>
            <Link to="/blog" className="hover:text-green-600">Blog</Link>
            <Link to="/contact" className="hover:text-green-600">Contact</Link>
            <Link to="/patient-examination" className="hover:text-green-600">Patient Examination</Link>
          </div>
        </div>

        {/* RIGHT - CONTACT */}
       <div className="text-center md:text-left">
  <h3 className="font-semibold mb-4 text-lg">Contact</h3>

         <div className="space-y-2 text-sm flex flex-col items-center md:items-start">
 
            {/* ADDRESS */}
            <div className="flex items-start gap-3 justify-center md:justify-start text-center md:text-left">
              <MapPin className="text-green-600 mt-1" size={18} />
              <p>
                Anbu Naturo Hospital <br />
                78, Jawahar Main Rd, S S Colony, <br />
                Madurai, Tamil Nadu 600016
              </p>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3">
              <Phone className="text-green-600" size={18} />
              <p>081898 98232</p>
            </div>

            {/* WORKING HOURS */}
            <div className="flex items-start gap-3 justify-center md:justify-start text-center md:text-left">
              <Clock className="text-green-600 mt-1" size={18} />
              <p>
                Mon - Sat: 9:00 AM - 8:00 PM <br />
                Sun: Closed
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t mt-10 py-4 text-center text-sm">
        © {new Date().getFullYear()} Anbu Naturo Hospital. All Rights Reserved.
      </div>

    </footer>
  );
};

/* ================= LAYOUT ================= */
const Layout = ({ children }: any) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 pt-24"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;