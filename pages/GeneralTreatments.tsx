import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const GeneralTreatments = () => {
  const { id } = useParams();
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const snapshot = await getDocs(collection(db, "treatments"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTreatments(data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const selectedProgram = treatments.find(p => p.id === id);

  // =============================
  // INDIVIDUAL PROGRAM VIEW
  // =============================
  if (selectedProgram) {
    return (
      <div className="pb-24">

        {/* Hero */}
        <section className="bg-herbal-green text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
            <h1 className="text-4xl font-bold">
              {selectedProgram.title}
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 space-y-10">
          {/* Image */}
          <div>
            <img
              src={selectedProgram.imageUrl}
              alt={selectedProgram.title}
              className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
            />
          </div>
              
              {/* Description from Firebase */}
{selectedProgram.description && (
  <p className="text-gray-700 text-lg leading-relaxed">
    {selectedProgram.description}
  </p>
)}


          {/* Points */}
          <div className="space-y-6 ml-12">
          <h2 className="text-2xl font-bold text-gray-900 ml-12">
              What’s Included
            </h2>

            <ul className="space-y-5">
              {selectedProgram.points?.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-herbal-green shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">{point}</span>
                </li>
              ))}
            </ul>

           <Link
  to="/contact"
  className="inline-block ml-6 mt-4 bg-herbal-green text-white px-3 py-2 text-sm rounded-lg font-semibold hover:opacity-90 transition-all"
>
  Book Personalized Consultation
</Link>
          </div>

        </section>
      </div>
    );
  }

  // =============================
  // LIST VIEW
  // =============================
  return (
    <div className="pb-24">

      <section className="bg-soft-beige py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Treatment Programs
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10">
        {treatments.map(program => (
          <div
            key={program.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col"
          >

            {/* Image Preview */}
            <img
              src={program.imageUrl}
              alt={program.title}
              className="rounded-xl mb-6 w-full object-cover aspect-[4/3]"
            />

            <h3 className="text-2xl font-bold text-herbal-green mb-4">
              {program.title}
            </h3>

            <ul className="space-y-3 mb-6">
              {program.points?.slice(0, 3).map((p: string, i: number) => (
                <li key={i} className="flex items-center space-x-2 text-gray-600">
                  <span className="w-2 h-2 bg-herbal-green rounded-full"></span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <Link
              to={`/treatments/${program.id}`}
              className="inline-flex items-center text-herbal-green font-bold mt-auto"
            >
              View Details <ChevronRight className="ml-1 w-4 h-4" />
            </Link>

          </div>
        ))}
      </section>

    </div>
  );
};

export default GeneralTreatments;
