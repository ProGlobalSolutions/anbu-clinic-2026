import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import {
  Layout,
  Info,
  HelpCircle,
  Activity,
  Settings,
  FileText,
  Users
} from "lucide-react";

const AdminDashboard = () => {

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/#/admin";
  };

  const cards = [
    { title: "Hero Section", icon: <Layout />, path: "/admin-hero" },
    { title: "About Page", icon: <Info />, path: "/admin-about" },
    { title: "FAQs", icon: <HelpCircle />, path: "/admin-faqs" },
    { title: "Treatments", icon: <Activity />, path: "/admin-treatments" },
    { title: "Process", icon: <Settings />, path: "/admin-process" },
    { title: "Blog", icon: <FileText />, path: "/admin-blog" }
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-100">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* 🔥 FEATURE CARD - PATIENTS */}
      <Link to="/admin-patients">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Users className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Patient Examination</h2>
              <p className="text-sm text-white/80">
                View and manage patient records
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold bg-white text-green-600 px-4 py-1 rounded-full">
            Open
          </span>

        </div>
      </Link>

      {/* 🔥 OTHER MODULES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {cards.map((card, index) => (
          <Link key={index} to={card.path}>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer flex items-center gap-4">

              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                {card.icon}
              </div>

              <h2 className="text-lg font-semibold">
                {card.title}
              </h2>

            </div>
          </Link>
        ))}

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
};

export default AdminDashboard;