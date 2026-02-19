import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const EditFaqs = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const fetchFaqs = async () => {
    const snap = await getDocs(collection(db, "faqs"));
    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    setFaqs(data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAdd = async () => {
    if (!newFaq.question || !newFaq.answer) return;

    await addDoc(collection(db, "faqs"), newFaq);
    setNewFaq({ question: "", answer: "" });
    fetchFaqs();
  };

  const handleUpdate = async (id: string, question: string, answer: string) => {
    await updateDoc(doc(db, "faqs", id), { question, answer });
    fetchFaqs();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "faqs", id));
    fetchFaqs();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edit FAQs</h2>

      {/* Add FAQ */}
      <div className="space-y-3 border p-4 rounded bg-gray-50">
        <h3 className="font-semibold">Add New FAQ</h3>
        <input
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          className="w-full border p-3"
          placeholder="Question"
        />
        <textarea
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          className="w-full border p-3"
          placeholder="Answer"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add FAQ
        </button>
      </div>

      {/* Existing FAQs */}
      {faqs.map((faq) => (
        <FaqItem
          key={faq.id}
          faq={faq}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const FaqItem = ({ faq, onUpdate, onDelete }: any) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  return (
    <div className="border p-4 space-y-3 bg-white rounded">
      <label className="text-sm font-semibold">Question</label>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border p-2"
      />

      <label className="text-sm font-semibold">Answer</label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border p-2"
      />

      <div className="flex gap-4">
        <button
          onClick={() => onUpdate(faq.id, question, answer)}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Save
        </button>

        <button
          onClick={() => onDelete(faq.id)}
          className="text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditFaqs;
