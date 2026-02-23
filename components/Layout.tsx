import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, CONTACT_INFO } from "../constants";

import logo from "../assets/logobgremoved.webp";
import footlogo from "../assets/footlogo.webp";

/* ================= HEADER ================= */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
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
    setMobileDropdown(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setDesktopDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setDesktopDropdown(null);
    }, 150);
  };

  return (
    <nav
  className={`fixed w-full z-[999] transition-all duration-300 ${
    scrolled 
      ? "bg-[#C7EABB] shadow-md py-2 lg:py-3" 
      : "bg-[#C7EABB] py-2 lg:py-4"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Desktop Logo */}
          <Link to="/" className="hidden lg:block">
            <img src={logo} alt="Logo" className="h-[6.5rem]" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {link.children ? (
                  <>
                    <button className="flex items-center text-gray-700 font-medium hover:text-herbal-green transition">
                      {link.label}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {desktopDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 border z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-soft-beige hover:text-herbal-green"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="text-gray-700 font-medium hover:text-herbal-green"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <Link to="/admin" className="text-gray-700 font-medium hover:text-herbal-green">
              Admin
            </Link>

            <Link
              to="/contact"
              className="bg-herbal-green text-white px-6 py-2.5 rounded-lg font-semibold hover:scale-105 transition"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden -ml-8">
  <Link to="/">
    <img src={logo} alt="Logo" className="h-[4.5rem]" />
  </Link>
</div>

          {/* Hamburger */}
          <div className="lg:hidden flex-shrink-0">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-7 h-7 text-gray-800" />
              ) : (
                <Menu className="w-7 h-7 text-gray-800" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6"
            >
              <X className="w-7 h-7 text-gray-800" />
            </button>

            <img src={logo} alt="Logo" className="h-16 mb-8" />

            <div className="flex flex-col items-center space-y-6">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="flex flex-col items-center">
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === link.label ? null : link.label
                          )
                        }
                        className="text-xl font-semibold text-gray-700 flex items-center"
                      >
                        {link.label}
                        <ChevronDown className="ml-2 w-5 h-5" />
                      </button>

                      <AnimatePresence>
                        {mobileDropdown === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden flex flex-col items-center mt-3 space-y-3"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.path}
                                onClick={() => setIsOpen(false)}
                                className="text-lg text-gray-600"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-semibold text-gray-700"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-xl font-semibold text-gray-700"
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

/* ================= FOOTER ================= */

/* ================= FOOTER ================= */

const Footer = () => {
  return (
    <footer className="bg-herbal-green text-white py-4 sm:py-4">
      <div className="max-w-4xl mx-auto px-6">

        {/* Logo + Description */}
        <div className="text-center mb-4 sm:mb-4">
          <img
            src={footlogo}
            alt="Footer Logo"
            className="h-11 mx-auto mb-2 scale-110"
          />
          <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto leading-snug">
            {CONTACT_INFO.hospitalName} provides natural Siddha-based
            treatments focused on long-term healing and wellness.
          </p>
        </div>

        {/* Contact + Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">

          {/* Contact */}
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-semibold text-sm sm:text-base">Contact</h3>
            <div className="space-y-1 text-xs sm:text-sm text-white/90 leading-snug">
              <p>78, Jawahar Main Rd</p>
              <p>S S Colony, Madurai</p>
              <p>Tamil Nadu 600016</p>
              <p>Phone: 081898 98232</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-center sm:text-right">
            <h3 className="font-semibold text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>
              <li><Link to="/treatments" className="hover:text-gray-300 transition">Treatments</Link></li>
              <li><Link to="/faqs" className="hover:text-gray-300 transition">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition">Contact</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-4 pt-2 text-center text-[11px] sm:text-xs text-white/80">
          © {new Date().getFullYear()} {CONTACT_INFO.hospitalName} – All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

/* ================= LAYOUT ================= */

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#A2CB8B]">
      <Header />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;