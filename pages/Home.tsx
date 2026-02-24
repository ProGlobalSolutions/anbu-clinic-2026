import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import imghome from '../assets/imghome.webp';
import heroBg from '../assets/hero.webp'
import psoriasisIcon from '../assets/icons/psoriasis-removebg-preview.png';
import acneIcon from '../assets/icons/acne.png';
import tineaIcon from '../assets/icons/tinea.png';
import eczemaIcon from '../assets/icons/eczema.png';
import fungalIcon from '../assets/icons/fungal.png';
import allergyIcon from '../assets/icons/skinallergy.png';
import { SKIN_CONDITIONS, WHY_CHOOSE_US } from '../constants';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {

  const [heroData, setHeroData] = useState<any>(null);
  const [whyVisible, setWhyVisible] = useState(false);
  const whyRef = useRef<HTMLDivElement>(null);

  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const statsData = [
    { value: 5000, suffix: "+", label: "Patients Treated" },
    { value: 95, suffix: "%", label: "Long-Term Recovery Rate" },
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "%", label: "Herbal & Steroid-Free Care" }
  ];

  /* ================= HERO FETCH ================= */
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const snap = await getDoc(doc(db, "hero", "main"));
        if (snap.exists()) setHeroData(snap.data());
      } catch (error) {
        console.error(error);
      }
    };
    fetchHero();
  }, []);

  /* ================= WHY ANIMATION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setWhyVisible(true),
      { threshold: 0.25 }
    );
    if (whyRef.current) observer.observe(whyRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= STATS ANIMATION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStatsVisible(true),
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    statsData.forEach((stat, index) => {
      let start = 0;
      const duration = 1500;
      const increment = stat.value / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          start = stat.value;
          clearInterval(counter);
        }

        setCounts(prev => {
          const updated = [...prev];
          updated[index] = Math.floor(start);
          return updated;
        });
      }, 16);
    });
  }, [statsVisible]);

  return (
    <div>

      {/* ================= HERO ================= */}
      <section
        className="relative h-[47vh] md:h-[80vh] flex items-center justify-center text-white"
        style={{
      backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-xl mx-auto px-6 text-center space-y-5">
          <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-semibold">
            {heroData?.badge}
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug">
            {heroData?.titleLine1}{" "}
            <span className="text-grass-green">{heroData?.highlight}</span><br />
            {heroData?.titleLine2}
          </h1>

       
          <Link
            to="/contact"
            className="inline-block bg-white text-herbal-green px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
          >
            Book Consultation
          </Link>
        </div>
      </section>


      {/* ================= NEW PREMIUM SKIN CONDITIONS ================= */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Skin Conditions We Manage
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Specialized Siddha-based herbal protocols for chronic and inflammatory skin disorders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {SKIN_CONDITIONS.map((condition, index) => {

              const iconSet = [
  { icon: psoriasisIcon, color: "bg-blue-100" },
  { icon: acneIcon, color: "bg-green-100" },
  { icon: tineaIcon, color: "bg-red-100" },
  { icon: eczemaIcon, color: "bg-purple-100" },
  { icon: fungalIcon, color: "bg-amber-100" },
  { icon: allergyIcon, color: "bg-emerald-100" }
];
              const current = iconSet[index % iconSet.length];

              return (
                <div
                  key={condition.id}
                  className="group bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-center md:justify-start mb-6">
                  <div className="w-[120px] h-[120px] md:w-20 md:h-20 flex items-center justify-center">
  <img
    src={current.icon}
    alt={condition.name}
   className="w-[70px] h-[70px] md:w-11 md:h-11 object-contain"
  />
</div>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 group-hover:text-herbal-green transition text-center md:text-left">
                    {condition.name}
                  </h3>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 text-center md:text-left">
                    {condition.shortDesc}
                  </p>

                  <div className="text-center md:text-left">
                    <Link 
                      to={`/process/${condition.id}`}
                      className="inline-flex items-center text-herbal-green text-sm font-semibold hover:translate-x-1 transition-transform"
                    >
                      View Treatment
                    
                    </Link>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

       
      {/* ================= WHY CHOOSE US ================= */}
     <section className="py-20 text-gray-900">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose Us
            </h2>
          <div className="w-20 h-1 bg-herbal-green mx-auto mt-4 rounded"></div>
          </div>

          <div
            ref={whyRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  whyVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-16"
                }`}
                style={{ transitionDelay: `${idx * 0.2}s` }}
              >
                <div className="bg-white/10 p-6 rounded-xl text-center">
                  <div className="inline-flex p-4 bg-white rounded-xl text-herbal-green mb-4">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold mb-2">
                    {item.title}
                  </h3>

                 <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    {/* ================= TRUST SECTION ================= */}
<section className="py-24 bg-white">
  <div
    ref={statsRef}
    className="max-w-7xl mx-auto px-6 text-center"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
      Trusted Healing. Proven Results.
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {statsData.map((stat, idx) => (
        <div
          key={idx}
          className={`transition-all duration-700 ${
            statsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: `${idx * 0.2}s` }}
        >
          <div className="text-4xl font-bold text-herbal-green mb-2">
            {counts[idx]}{stat.suffix}
          </div>
          <p className="text-gray-700 text-sm font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      
    </div>
  );
};

export default Home;