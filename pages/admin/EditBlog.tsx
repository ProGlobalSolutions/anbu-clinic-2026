import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

interface Blog {
  id: string;
  title: string;
  description: string;
  bigpara: string;
  category: string;
  imageurl: string;
  date: string;
}

const EditBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    bigpara: "",
    category: "",
    imageurl: "",
    date: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "blog"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Blog, "id">),
        }));
        setBlogs(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editingId) {
      await updateDoc(doc(db, "blog", editingId), form);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "blog"), form);
    }

    setForm({
      title: "",
      description: "",
      bigpara: "",
      category: "",
      imageurl: "",
      date: "",
    });
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteDoc(doc(db, "blog", deleteId));
    setDeleteId(null);
  };

  const handleEdit = (blog: Blog) => {
    setForm({
      title: blog.title,
      description: blog.description,
      bigpara: blog.bigpara || "",
      category: blog.category,
      imageurl: blog.imageurl,
      date: blog.date,
    });
    setEditingId(blog.id);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>

      {/* FORM */}
      <div className="space-y-4 border p-6 rounded-lg mb-10">

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-3 rounded" />

        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-3 rounded" />

        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" className="w-full border p-3 rounded" />

        <input name="imageurl" value={form.imageurl} onChange={handleChange} placeholder="Image URL" className="w-full border p-3 rounded" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description" rows={3} className="w-full border p-3 rounded" />

        <textarea name="bigpara" value={form.bigpara} onChange={handleChange} placeholder="Full Article Content" rows={6} className="w-full border p-3 rounded" />

        <button onClick={handleSave} className="bg-herbal-green text-white px-6 py-2 rounded">
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </div>

      {/* BLOG LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded-lg shadow">
            <img src={blog.imageurl} alt={blog.title} className="h-40 w-full object-cover rounded mb-3" />
            <h2 className="font-bold">{blog.title}</h2>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(blog)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteId(blog.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this blog?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditBlog;