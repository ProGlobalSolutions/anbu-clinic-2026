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

import EditHero from './pages/admin/EditHero';
import EditAbout from './pages/admin/EditAbout';
import EditFaqs from './pages/admin/EditFaqs';
import EditTreatments from './pages/admin/EditTreatments';
import EditProcess from './pages/admin/EditProcess';
import EditBlog from './pages/admin/EditBlog';

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

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/treatments" element={<GeneralTreatments />} />
          <Route path="/treatments/:id" element={<GeneralTreatments />} />

          {/* Dynamic Treatment Process */}
          <Route path="/process/:id" element={<ConditionTreatment />} />

          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

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
  path="/admin-blog"
  element={
    <ProtectedRoute>
      <EditBlog />
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

          {/* Fallback */}
          <Route path="*" element={<Home />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;