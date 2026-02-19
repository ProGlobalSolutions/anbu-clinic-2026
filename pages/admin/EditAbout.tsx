import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditAbout = () => {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    mission: "",
    vision: "",
    imageUrl: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "about", "main"));
        if (snap.exists()) {
          setForm(snap.data() as any);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "about", "main"), form);
      alert("About page updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating page");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-8">

      <h1 className="text-3xl font-bold border-b pb-4">
        Edit About Page
      </h1>

      {/* TITLE */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* MISSION */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Mission
        </label>
        <textarea
          name="mission"
          value={form.mission}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* VISION */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Vision
        </label>
        <textarea
          name="vision"
          value={form.vision}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* IMAGE URL */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">
          Image URL
        </label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="mt-4 w-full h-64 object-cover rounded-lg border"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="bg-herbal-green text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90"
      >
        Save Changes
      </button>

    </div>
  );
};

export default EditAbout;
