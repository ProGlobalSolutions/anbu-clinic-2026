import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AdminDashboard = () => {

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/#/admin";
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="space-y-4 text-lg">

        <Link to="/admin-hero" className="block text-blue-600">
          Edit Hero Section
        </Link>

        <Link to="/admin-about" className="block text-blue-600">
          Edit About Page
        </Link>

        <Link to="/admin-faqs" className="block text-blue-600">
          Edit FAQs
        </Link>

        <Link to="/admin-treatments" className="block text-blue-600">
          Edit Treatments
        </Link>

        <Link to="/admin-process" className="block text-blue-600">
          Edit Treatment Process
        </Link>

      </div>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-500 text-white px-6 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
