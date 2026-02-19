import React, { useState } from "react";
import EditHero from "./admin/EditHero";
import EditAbout from "./admin/EditAbout";
import EditFaqs from "./admin/EditFaqs";
import EditTreatments from "./admin/EditTreatments";
import EditProcess from "./admin/EditProcess";

const Admin = () => {
  const [section, setSection] = useState("hero");

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>

        <button onClick={() => setSection("hero")} className="block w-full text-left">Hero</button>
        <button onClick={() => setSection("about")} className="block w-full text-left">About</button>
        <button onClick={() => setSection("faqs")} className="block w-full text-left">FAQs</button>
        <button onClick={() => setSection("treatments")} className="block w-full text-left">Treatments</button>
        <button onClick={() => setSection("process")} className="block w-full text-left">Treatment Process</button>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 bg-gray-50">
        {section === "hero" && <EditHero />}
        {section === "about" && <EditAbout />}
        {section === "faqs" && <EditFaqs />}
        {section === "treatments" && <EditTreatments />}
        {section === "process" && <EditProcess />}
      </div>

    </div>
  );
};

export default Admin;
