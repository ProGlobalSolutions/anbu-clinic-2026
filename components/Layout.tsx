import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, CONTACT_INFO } from "../constants";
import { MapPin, Phone } from "lucide-react";

import logo from "../assets/logobgremoved.webp";
import footlogo from "../assets/footlogo.png";

/* ================= HEADER ================= */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  let closeTimeout = null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleMouseEnter = (label) => {
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="hidden lg:block">
            <img src={logo} className="h-[5.5rem]" />
          </Link>

          {/* MENU */}
          <div className="hidden lg:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {link.children ? (
                  <>
                    {/* DROPDOWN BUTTON */}
                    <button className={navClass + " flex items-center"}>
                      {link.label}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    {/* DROPDOWN MENU */}
                    <AnimatePresence>
                      {desktopDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-3 w-56 bg-white shadow-lg rounded-lg py-2 border"
                        >
                          {link.children.map((child) => (
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

          {/* MOBILE */}
          <div className="lg:hidden flex justify-between w-full items-center">
            <Link to="/">
              <img src={logo} className="h-[4rem]" />
            </Link>

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white p-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/admin" className="block font-semibold">
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

/* ================= FOOTER ================= */
const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-4 text-center">
      <img src={footlogo} className="h-16 mx-auto mb-2" />
      <p>{CONTACT_INFO.hospitalName}</p>
      <p className="text-sm mt-2">© {new Date().getFullYear()}</p>
    </footer>
  );
};

/* ================= LAYOUT ================= */
const Layout = ({ children }) => {
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