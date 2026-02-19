import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditHero = () => {
  const [loading, setLoading] = useState(true);

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
        const docRef = doc(db, "hero", "main");
        const snap = await getDoc(docRef);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "hero", "main"), form);
      alert("Hero section updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating hero");
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

      {/* Badge */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Badge Text (Top Small Label)
        </label>
        <input
          name="badge"
          value={form.badge}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Premium Siddha Care"
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Main Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Advanced Siddha-Based"
        />
      </div>

      {/* Highlight Word */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Highlight Word (Green Part)
        </label>
        <input
          name="highlight"
          value={form.highlight}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Herbal Care"
        />
      </div>

      {/* Description */}
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
          placeholder="Natural treatment. Root-cause approach..."
        />
      </div>

      {/* Button Text */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Button Text
        </label>
        <input
          name="buttonText"
          value={form.buttonText}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Book Consultation"
        />
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-700">
          Background Image URL
        </label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Preview */}
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
