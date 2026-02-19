import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import logo from '../assets/logo.webp';

/* ================= HEADER ================= */

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2 lg:py-3'
          : 'bg-white py-2 lg:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Desktop Logo */}
          <Link to="/" className="hidden lg:block">
            <img
              src={logo}
              alt="Logo"
              className="h-[6.5rem] w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">

                {link.children ? (
                  <>
                    <button className="relative flex items-center text-gray-700 font-medium transition-all duration-300 hover:text-herbal-green">
                      {link.label}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-herbal-green transition-all duration-300 group-hover:w-full"></span>
                      <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-soft-beige hover:text-herbal-green transition-all duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="relative text-gray-700 font-medium transition-all duration-300 hover:text-herbal-green"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-herbal-green transition-all duration-300 hover:w-full"></span>
                  </Link>
                )}

              </div>
            ))}

            <Link
              to="/admin"
              className="relative text-gray-700 font-medium transition-all duration-300 hover:text-herbal-green"
            >
              Admin
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-herbal-green transition-all duration-300 hover:w-full"></span>
            </Link>

            <Link
              to="/contact"
              className="bg-herbal-green text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="flex-1 flex justify-center lg:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-[4.5rem] w-auto object-contain"
              />
            </Link>
          </div>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6"
            >
              <X className="w-7 h-7 text-gray-700" />
            </button>

            <img src={logo} alt="Logo" className="h-16 mb-10" />

            <div className="flex flex-col items-center space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-semibold text-gray-700 hover:text-herbal-green transition"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-xl font-semibold text-gray-700 hover:text-herbal-green transition"
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
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <img src={logo} alt="Logo" className="h-16 w-auto mx-auto" />
        <p className="mt-6 text-gray-400 text-xs">
          © {new Date().getFullYear()} {CONTACT_INFO.hospitalName} – All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

/* ================= LAYOUT ================= */

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-x-hidden">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex-1 pt-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;
