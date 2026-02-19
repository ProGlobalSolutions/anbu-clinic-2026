import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  ArrowRight,
  Leaf,
  Shield,
  Droplet,
  Activity,
  HeartPulse,
  Sparkles
} from 'lucide-react';
import { SKIN_CONDITIONS, WHY_CHOOSE_US, CONTACT_INFO } from '../constants';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {

  /* ================= HERO STATE ================= */
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const docRef = doc(db, "hero", "main");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };

    fetchHero();
  }, []);

  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative h-[50vh] md:h-[80vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${heroData?.imageUrl || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-xl mx-auto px-6 text-center space-y-5">

          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-xs font-semibold tracking-wide">
              {heroData?.badge}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug">
            {heroData?.titleLine1}{" "}
            <span className="text-green-300">
              {heroData?.highlight}
            </span><br />
            {heroData?.titleLine2}
          </h1>

          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            {heroData?.description}
          </p>

          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-block bg-white text-herbal-green px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-soft-beige transition shadow-md"
            >
              Book Consultation
            </Link>
          </div>

        </div>
      </section>
      {/* ================= END HERO ================= */}


      {/* ================= CONDITIONS SECTION ================= */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Skin Conditions We Manage
            </h2>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              Evidence-based herbal care for complex dermatological challenges
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">

            {SKIN_CONDITIONS.map((condition, index) => {

              const icons = [
                { icon: <Leaf className="w-4 h-4 text-green-600" />, bg: "bg-green-100" },
                { icon: <Shield className="w-4 h-4 text-blue-600" />, bg: "bg-blue-100" },
                { icon: <Droplet className="w-4 h-4 text-cyan-600" />, bg: "bg-cyan-100" },
                { icon: <Activity className="w-4 h-4 text-purple-600" />, bg: "bg-purple-100" },
                { icon: <HeartPulse className="w-4 h-4 text-red-600" />, bg: "bg-red-100" },
                { icon: <Sparkles className="w-4 h-4 text-amber-600" />, bg: "bg-amber-100" }
              ];

              const current = icons[index % icons.length];

              return (
                <div
                  key={condition.id}
                  className="p-4 md:p-6 lg:p-8 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300 space-y-3 group"
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${current.bg}`}>
                    {current.icon}
                  </div>

                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 group-hover:text-herbal-green transition-colors">
                    {condition.name}
                  </h3>

                  <p className="hidden md:block text-gray-600 text-sm leading-relaxed">
                    {condition.shortDesc}
                  </p>

                  <Link 
                    to={`/process/${condition.id}`}
                    className="inline-flex items-center text-herbal-green text-xs md:text-sm font-semibold hover:translate-x-1 transition-transform"
                  >
                    View
                    <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>
      {/* ================= END CONDITIONS ================= */}


      {/* Why Choose Us (UNCHANGED) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="space-y-4 text-center md:text-left">
                <div className="inline-block p-4 bg-white rounded-xl shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-herbal-green text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
            Begin Your Natural Skin Recovery Journey Today
          </h2>
          <p className="text-white/80 text-sm md:text-lg">
            Safe. Ethical. Professional Siddha Herbal Care.
          </p>
          <div className="flex flex-col items-center space-y-3 md:space-y-4">
            <Link
              to="/contact"
              className="bg-white text-herbal-green px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-base md:text-xl hover:bg-soft-beige transition-all shadow-xl"
            >
              Book Appointment
            </Link>
            <div className="flex items-center space-x-2 text-white/90 font-medium text-sm md:text-base">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
