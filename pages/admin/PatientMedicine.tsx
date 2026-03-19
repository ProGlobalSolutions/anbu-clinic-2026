import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const medicines = [
  { name: "Paracetamol", type: "500mg", price: 5 },
  { name: "Amoxicillin", type: "250mg", price: 8 },
  { name: "Cetrizine", type: "10mg", price: 3 },
  { name: "Ibuprofen", type: "400mg", price: 6 },
  { name: "Vitamin C", type: "Tablet", price: 4 },
];

export default function PatientMedicine() {
  const { id } = useParams();

  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [dosage, setDosage] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // 🔥 fetch patient phone
  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      const ref = doc(db, "patients", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPhone(snap.data().phone);
      }
    };

    fetchPatient();
  }, [id]);

  // 🔍 search
  const handleSearch = (val: string) => {
    setSearch(val);

    const filtered = medicines.filter((m) =>
      m.name.toLowerCase().includes(val.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const total = selected ? selected.price * qty : 0;

  const send = () => {
    if (!selected) return alert("Select medicine first");
    if (!phone) return alert("Phone not found");

    const msg = `
Medicine: ${selected.name}
Quantity: ${qty}
Total: ₹${total}
Dosage: ${dosage.join(", ")}
Notes: ${notes || "None"}
`;

    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`
    );
  };

  return (
   <div className="p-4 md:p-10 bg-gray-100 min-h-screen flex flex-col md:flex-row gap-6 md:gap-10">

      {/* LEFT */}
      <div className="w-1/2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Create Prescription</h2>

        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search medicine..."
          className="w-full border rounded-lg px-4 py-2 mb-2"
        />

        {suggestions.map((m, i) => (
          <div
            key={i}
            onClick={() => {
              setSelected(m);
              setSearch(m.name);
              setSuggestions([]);
            }}
            className="p-3 border-b cursor-pointer hover:bg-gray-100"
          >
            {m.name} ({m.type})
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="w-1/2 bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          {selected ? selected.name : "Select Medicine"}
        </h2>

        {selected && (
          <>
            <div className="flex justify-between mb-4">
              <div>
                <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
                <span className="px-3">{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>

              <p className="text-xl font-bold">₹{total}</p>
            </div>

            <div className="flex gap-4 mb-4">
              {["Morning", "Afternoon", "Evening"].map((t) => (
                <label key={t} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setDosage((prev) =>
                        prev.includes(t)
                          ? prev.filter((d) => d !== t)
                          : [...prev, t]
                      )
                    }
                  />
                  {t}
                </label>
              ))}
            </div>

            <textarea
              placeholder="Notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={send}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Send to WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}