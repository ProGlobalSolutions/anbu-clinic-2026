import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ConditionTreatment = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "treatmentProcess", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching treatment process:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center py-20">No Data Found</div>;
  }

  return (
    <div className="pb-24">

      {/* HERO SECTION */}
      <section className="bg-herbal-green text-white py-20 text-center">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/80">
          {data.shortDesc}
        </p>
      </section>

      {/* IMAGE */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <img
          src={data.imageurl}
          alt={data.name}
          className="rounded-2xl shadow-lg w-full object-cover aspect-[16/9]"
        />
      </section>

      {/* SECTIONS */}
      <section className="max-w-6xl mx-auto px-4 space-y-16">
        {data.sections?.map((section: any, index: number) => (
          <div key={index} className="space-y-6">
            <h2 className="text-2xl font-bold text-herbal-green">
              {section.title}
            </h2>

            <ul className="space-y-3">
              {section.points?.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-herbal-green rounded-full mt-2"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

    </div>
  );
};

export default ConditionTreatment;
