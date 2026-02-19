import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import GeneralTreatments from './pages/GeneralTreatments';
import ConditionTreatment from './pages/ConditionTreatment';
import FAQs from './pages/FAQs';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// 🔥 IMPORT ADMIN EDIT PAGES
import EditHero from './pages/admin/EditHero';
import EditAbout from './pages/admin/EditAbout';
import EditFaqs from './pages/admin/EditFaqs';
import EditTreatments from './pages/admin/EditTreatments';
import EditProcess from './pages/admin/EditProcess';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/treatments" element={<GeneralTreatments />} />
          <Route path="/treatments/:id" element={<GeneralTreatments />} />

          <Route path="/process/:id" element={<ConditionTreatment />} />

          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN EDIT ROUTES ================= */}
          <Route
            path="/admin-hero"
            element={
              <ProtectedRoute>
                <EditHero />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-about"
            element={
              <ProtectedRoute>
                <EditAbout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-faqs"
            element={
              <ProtectedRoute>
                <EditFaqs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-treatments"
            element={
              <ProtectedRoute>
                <EditTreatments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-process"
            element={
              <ProtectedRoute>
                <EditProcess />
              </ProtectedRoute>
            }
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Home />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
