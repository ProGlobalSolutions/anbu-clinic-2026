import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore";

const EditTreatments = () => {
  const [treatments, setTreatments] = useState<any[]>([]);

  const fetchTreatments = async () => {
    const snapshot = await getDocs(collection(db, "treatments"));
    const data = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data()
    }));
    setTreatments(data);
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...treatments];
    updated[index][field] = value;
    setTreatments(updated);
  };

  const handlePointChange = (tIndex: number, pIndex: number, value: string) => {
    const updated = [...treatments];
    updated[tIndex].points[pIndex] = value;
    setTreatments(updated);
  };

  const addPoint = (index: number) => {
    const updated = [...treatments];
    updated[index].points.push("");
    setTreatments(updated);
  };

  const deletePoint = (tIndex: number, pIndex: number) => {
    const updated = [...treatments];
    updated[tIndex].points.splice(pIndex, 1);
    setTreatments(updated);
  };

  const handleSave = async (id: string, data: any) => {
    await updateDoc(doc(db, "treatments", id), data);
    alert("Treatment Updated");
  };

  const handleDeleteTreatment = async (id: string) => {
    await deleteDoc(doc(db, "treatments", id));
    fetchTreatments();
  };

  const handleAddTreatment = async () => {
    await addDoc(collection(db, "treatments"), {
      title: "",
      imageUrl: "",
      points: []
    });
    fetchTreatments();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Edit Treatment Programs</h1>

      <button
        onClick={handleAddTreatment}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Add New Treatment
      </button>

      {treatments.map((treatment, index) => (
        <div
          key={treatment.id}
          className="border p-6 rounded-xl bg-white shadow space-y-5"
        >
          <h2 className="text-xl font-semibold">
            Treatment Document ID: {treatment.id}
          </h2>

          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              value={treatment.title || ""}
              onChange={(e) =>
                handleChange(index, "title", e.target.value)
              }
              className="w-full border p-2"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              value={treatment.imageUrl || ""}
              onChange={(e) =>
                handleChange(index, "imageUrl", e.target.value)
              }
              className="w-full border p-2"
            />
          </div>

          {/* Points */}
          <div>
            <label className="block font-medium mb-2">Points</label>

            {treatment.points?.map((point: string, pIndex: number) => (
              <div key={pIndex} className="flex space-x-2 mb-2">
                <input
                  value={point}
                  onChange={(e) =>
                    handlePointChange(index, pIndex, e.target.value)
                  }
                  className="w-full border p-2"
                />
                <button
                  onClick={() => deletePoint(index, pIndex)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              onClick={() => addPoint(index)}
              className="text-blue-600 mt-2"
            >
              + Add Point
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSave(treatment.id, treatment)}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => handleDeleteTreatment(treatment.id)}
              className="bg-red-600 text-white px-6 py-2 rounded"
            >
              Delete Treatment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditTreatments;
