import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

const EditProcess = () => {
  const [processes, setProcesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "treatmentProcess"));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setProcesses(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (docId: string, field: string, value: any) => {
    setProcesses((prev) =>
      prev.map((item) =>
        item.id === docId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSectionChange = (
    docId: string,
    sectionIndex: number,
    field: string,
    value: any
  ) => {
    setProcesses((prev) =>
      prev.map((item) => {
        if (item.id !== docId) return item;

        const updatedSections = [...item.sections];
        updatedSections[sectionIndex] = {
          ...updatedSections[sectionIndex],
          [field]: value,
        };

        return { ...item, sections: updatedSections };
      })
    );
  };

  const handlePointChange = (
    docId: string,
    sectionIndex: number,
    pointIndex: number,
    value: string
  ) => {
    setProcesses((prev) =>
      prev.map((item) => {
        if (item.id !== docId) return item;

        const updatedSections = [...item.sections];
        const updatedPoints = [...updatedSections[sectionIndex].points];
        updatedPoints[pointIndex] = value;

        updatedSections[sectionIndex].points = updatedPoints;

        return { ...item, sections: updatedSections };
      })
    );
  };

  const handleSave = async (docId: string, data: any) => {
    await updateDoc(doc(db, "treatmentProcess", docId), {
      name: data.name,
      imageurl: data.imageurl,
      shortDesc: data.shortDesc,
      sections: data.sections,
    });

    alert("Updated Successfully");
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="space-y-12 p-6">
      <h1 className="text-3xl font-bold">Treatment Process Editor</h1>

      {processes.map((item) => (
        <div key={item.id} className="border p-6 rounded-xl bg-white shadow space-y-6">

          {/* BIG CONDITION HEADING */}
          <h2 className="text-2xl font-bold text-herbal-green uppercase">
            {item.id.replace("-", " ")}
          </h2>

          {/* BASIC INFO */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Basic Information</h3>

            <div>
              <label className="font-semibold">Treatment Name</label>
              <input
                className="w-full border p-2 mt-1"
                value={item.name}
                onChange={(e) =>
                  handleChange(item.id, "name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="font-semibold">Image URL</label>
              <input
                className="w-full border p-2 mt-1"
                value={item.imageurl}
                onChange={(e) =>
                  handleChange(item.id, "imageurl", e.target.value)
                }
              />
            </div>

            <div>
              <label className="font-semibold">Short Description</label>
              <textarea
                className="w-full border p-2 mt-1"
                value={item.shortDesc}
                onChange={(e) =>
                  handleChange(item.id, "shortDesc", e.target.value)
                }
              />
            </div>
          </div>

          {/* SECTIONS */}
          <div className="space-y-8">
            <h3 className="font-bold text-lg">Sections</h3>

            {item.sections?.map((section: any, sIndex: number) => (
              <div key={sIndex} className="border p-4 rounded-lg bg-gray-50 space-y-4">

                <h4 className="font-bold">
                  Section {sIndex + 1}
                </h4>

                <div>
                  <label className="font-semibold">Section Title</label>
                  <input
                    className="w-full border p-2 mt-1"
                    value={section.title}
                    onChange={(e) =>
                      handleSectionChange(
                        item.id,
                        sIndex,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-3">
                  <label className="font-semibold">Points</label>

                  {section.points?.map((point: string, pIndex: number) => (
                    <input
                      key={pIndex}
                      className="w-full border p-2"
                      value={point}
                      onChange={(e) =>
                        handlePointChange(
                          item.id,
                          sIndex,
                          pIndex,
                          e.target.value
                        )
                      }
                    />
                  ))}
                </div>

              </div>
            ))}
          </div>

          <button
            onClick={() => handleSave(item.id, item)}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Save Changes
          </button>

        </div>
      ))}
    </div>
  );
};

export default EditProcess;
