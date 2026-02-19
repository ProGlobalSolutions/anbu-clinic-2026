import React, { useEffect, useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ShieldCheck, Leaf, Scale } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const About = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docRef = doc(db, "about", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        }
      } catch (error) {
        console.error("Firestore error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        About data not found
      </div>
    );
  }

  return (
    <div className="pb-24">

      {/* Hero */}
      <section className="bg-soft-beige py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            {aboutData.title}
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Dedicated center for chronic skin care using the profound wisdom of Siddha Medicine.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 space-y-32">

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-herbal-green">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {aboutData.mission}
            </p>

            <h2 className="text-3xl font-bold text-herbal-green pt-6">
              Our Treatment Philosophy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {aboutData.vision}
            </p>
          </div>

          {aboutData.imageUrl && (
            <img
              src={aboutData.imageUrl}
              alt="About"
              className="rounded-2xl shadow-lg aspect-[4/3] object-cover"
            />
          )}
        </div>

        {/* Static Siddha Section (can make dynamic later) */}
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              About Siddha Medicine
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Siddha is one of the world's oldest medical systems, originating in South India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-soft-beige rounded-full flex items-center justify-center mx-auto text-herbal-green">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-bold">Plant-Based</h3>
              <p className="text-sm text-gray-500">
                Primarily uses botanical herbs.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-soft-beige rounded-full flex items-center justify-center mx-auto text-herbal-green">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="font-bold">Holistic Balance</h3>
              <p className="text-sm text-gray-500">
                Treats the individual, not just the symptom.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-soft-beige rounded-full flex items-center justify-center mx-auto text-herbal-green">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold">Preventive Care</h3>
              <p className="text-sm text-gray-500">
                Strong emphasis on diet and routines.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment */}
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Ethical Clinical Commitment
          </h2>

          <p className="italic text-gray-700">
            We focus on measurable improvement in skin texture and patient quality of life through professional herbal management.
          </p>

          <div className="pt-12 text-gray-500 text-sm">
            <p className="font-bold text-gray-800">
              {CONTACT_INFO.hospitalName}
            </p>
            <p>{CONTACT_INFO.address}</p>
            <p>Phone: {CONTACT_INFO.phone}</p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default About;
