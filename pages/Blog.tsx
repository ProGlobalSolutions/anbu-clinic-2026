import React, { useState } from 'react';
import { Calendar, ArrowRight, X } from 'lucide-react';

interface BlogPost {
  title: string;
  preview: string;
  fullContent: string;
  date: string;
  category: string;
}

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      title: "Natural Care for Psoriasis: A Siddha Perspective",
      preview:
        "Psoriasis is a chronic autoimmune skin condition marked by scaling and inflammation. Siddha medicine approaches it through internal detoxification and immune regulation.",
      fullContent:
        "Psoriasis is a long-term inflammatory skin condition caused by immune system imbalance and internal heat accumulation. In Siddha medicine, psoriasis is viewed as a disorder of blood impurity and digestive fire imbalance. Treatment focuses on cleansing internal toxins, regulating immune response, and calming inflammatory pathways. Herbal decoctions help purify blood and restore metabolic harmony. External herbal oils reduce scaling and soothe irritation. Dietary regulation plays a major role by eliminating trigger foods such as fermented and excessively spicy items. Stress management and lifestyle correction are also emphasized. Unlike steroid-based quick fixes, Siddha aims for gradual, sustainable recovery. With consistent treatment and discipline, patients can experience long-term remission and improved skin texture naturally.",
      date: "Oct 12, 2025",
      category: "Psoriasis"
    },
    {
      title: "Managing Acne through Herbal Care and Diet",
      preview:
        "Acne often reflects digestive imbalance and hormonal disturbance. Treating the root cause internally leads to long-lasting skin clarity.",
      fullContent:
        "Acne is not just a surface-level issue but often a sign of digestive heat, hormonal shifts, and toxin accumulation. Siddha medicine focuses on balancing internal heat and cleansing the bloodstream. Herbal combinations regulate sebum production and reduce inflammation. Gut health is corrected through mild detox protocols and dietary discipline. Avoiding oily, fried, and highly processed foods is critical. Natural antibacterial herbal masks assist in reducing active breakouts. Hormonal stabilization herbs support long-term control. Scar reduction is approached using botanical oils. With structured treatment, acne recurrence reduces significantly. The goal is stable, healthy skin without dependency on harsh chemicals.",
      date: "Sep 28, 2025",
      category: "Skin Care"
    },
    {
      title: "Preventing Recurrent Fungal Infections",
      preview:
        "Fungal infections often recur due to internal weakness and moisture imbalance. Strengthening immunity is key.",
      fullContent:
        "Fungal infections develop in moist environments and often recur when immunity is weak. Siddha treatment emphasizes internal antifungal herbs combined with blood purification. Strengthening immune resistance prevents recurrence. External hygiene practices are integrated with cooling herbal washes. Proper drying and moisture control are essential in treatment success. Dietary restrictions help reduce fungal growth triggers. Detoxification reduces systemic fungal susceptibility. Herbal powders and oils provide local relief. Preventive strategies are equally important as treatment. Sustainable immune correction ensures long-term protection against fungal recurrence.",
      date: "Aug 15, 2025",
      category: "Hygiene"
    },
    {
      title: "The Ultimate Diet for Eczema Relief",
      preview:
        "Eczema flare-ups are often linked to allergens and internal heat. Diet correction can significantly reduce inflammation.",
      fullContent:
        "Eczema is characterized by chronic inflammation, dryness, and itching. Siddha medicine identifies food triggers and immune imbalance as core causes. Eliminating allergenic and heat-producing foods reduces flare-ups. Herbal anti-inflammatory remedies calm irritated skin. Internal liver detox supports immune regulation. Moisture restoration through herbal salves helps rebuild skin barrier integrity. Stress reduction techniques are incorporated. Long-term dietary discipline plays a central role in sustained relief. Cooling herbs reduce systemic heat accumulation. Gradual correction improves both symptom severity and frequency.",
      date: "Jul 20, 2025",
      category: "Nutrition"
    },
    {
      title: "Understanding Skin Allergies in Children",
      preview:
        "Children's skin is sensitive and reactive. Identifying triggers early prevents chronic complications.",
      fullContent:
        "Skin allergies in children require careful evaluation and gentle management. Siddha medicine approaches pediatric allergies with mild detox herbs and immune balancing remedies. Identifying food and environmental triggers is the first step. Avoiding synthetic topical chemicals reduces irritation. Herbal oils soothe inflamed skin naturally. Gut correction improves immune tolerance. Proper nutrition strengthens long-term resilience. Treatment is gradual and safe for young patients. Parental education ensures better compliance. Early intervention prevents progression into chronic allergic conditions.",
      date: "Jun 10, 2025",
      category: "Pediatrics"
    },
    {
      title: "The Role of Detoxification in Skin Health",
      preview:
        "Internal detoxification is foundational in Siddha skin treatment. Clear blood reflects clear skin.",
      fullContent:
        "Detoxification is the cornerstone of Siddha dermatological treatment. Accumulated metabolic waste and blood impurities manifest through the skin. Herbal decoctions cleanse internal organs and purify circulation. Digestive fire correction enhances toxin elimination. Balanced metabolism improves nutrient absorption. External treatments complement internal cleansing. A detox cycle strengthens immunity and reduces inflammatory reactions. Dietary discipline enhances effectiveness. Lifestyle regulation ensures long-term maintenance. True skin recovery begins with internal purification.",
      date: "May 05, 2025",
      category: "Holistic Health"
    }
  ];

  return (
    <div className="pb-12 md:pb-24">

      {/* HERO */}
      <section className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Educational Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert insights and natural care tips for healthy skin.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${idx}/600/400`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                  <span className="bg-soft-beige text-herbal-green px-2 py-1 rounded font-bold">
                    {post.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  {post.preview}
                </p>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-herbal-green font-bold text-sm mt-auto flex items-center"
                >
                  Read Full Article <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL POPUP */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 relative">

            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {selectedPost.title}
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {selectedPost.fullContent}
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default Blog;
