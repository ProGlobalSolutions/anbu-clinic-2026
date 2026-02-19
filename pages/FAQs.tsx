import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-4 transition-all hover:border-herbal-green/30 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-herbal-green" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <div className={`transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden bg-gray-50`}>
        <div className="p-6 text-gray-600 leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQs = () => {
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "faqs"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-soft-beige py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common queries about our treatment processes and philosophy.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div>
          {faqs.map((faq) => (
            <FAQItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQs;
