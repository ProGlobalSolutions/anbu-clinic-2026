import React, { useEffect, useState } from "react";
import { Calendar, ArrowRight, X } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  bigpara: string;
  date: string;
  category: string;
  imageurl: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "blog"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<BlogPost, "id">),
        }));
        setPosts(data);
      }
    );

    return () => unsubscribe();
  }, []);

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

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.imageurl}
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
                  {post.description}
                </p>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-herbal-green font-bold text-sm mt-auto flex items-center"
                >
                  Read Full Article
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* MODAL */}
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

            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {selectedPost.bigpara}
            </p>

          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;