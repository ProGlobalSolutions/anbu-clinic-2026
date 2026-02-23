import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditHero = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    badge: "",
    title: "",
    highlight: "",
    description: "",
    buttonText: "",
    imageUrl: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "hero", "main"));
        if (snap.exists()) {
          setForm(snap.data() as any);
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
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
      await updateDoc(doc(db, "hero", "main"), form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Error updating hero:", error);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-8">

      <h1 className="text-3xl font-bold border-b pb-4">
        Edit Hero Section
      </h1>

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          Hero section updated successfully
        </div>
      )}

      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Badge Text
        </label>
        <input
          name="badge"
          value={form.badge}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Main Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Highlight Word
        </label>
        <input
          name="highlight"
          value={form.highlight}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Button Text
        </label>
        <input
          name="buttonText"
          value={form.buttonText}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Background Image URL
        </label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {form.imageUrl && (
        <div className="space-y-2">
          <p className="font-semibold text-gray-700">Image Preview</p>
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border"
          />
        </div>
      )}

      <button
        onClick={handleSave}
        className="bg-herbal-green text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90"
      >
        Save Changes
      </button>

    </div>
  );
};

export default EditHero;