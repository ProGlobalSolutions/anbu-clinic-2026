import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function PatientForm() {

  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validateForm = () => {
    const requiredFields = ["name", "age", "location", "phone"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("Name, Age, Location and Phone are required");
        return false;
      }
    }

    const radioFields = [
      "bodyHeat",
      "sleepDisturbance",
      "digestionProblem",
      "bowelUrine",
      "alcohol",
      "smoking",
      "maritalStatus"
    ];

    for (const field of radioFields) {
      if (!formData[field]) {
        alert("Please select all health and personal history fields");
        return false;
      }
    }

    return true;
  };
const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const docRef = await addDoc(collection(db, "patients"), {
      ...formData,
      createdAt: new Date()
    });

    console.log("Saved ID:", docRef.id);

    // ✅ SHOW MESSAGE (your requirement)
    alert("✅ Patient details saved successfully. Check in Patient List.");

    // ✅ CLEAR FORM FOR NEXT PATIENT
    setFormData({});

  } catch (err) {
    console.error("Firebase Error:", err);
    alert("❌ Error saving data");
  }
};
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center p-6">

      <div className="w-full max-w-5xl bg-gray-100 p-6 rounded-xl">

        <h1 className="text-3xl font-semibold text-center mb-1">
          Patient Examination Form
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Please fill in the patient details and examination information
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* SECTION 1 */}
          <div className="bg-white p-5 rounded-lg shadow">

            <h3 className="font-semibold mb-4">
              Section 1 – Patient Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="name"
                value={formData.name || ""}
                placeholder="Name"
                onChange={handleChange}
                className="w-full p-2 rounded-full border border-green-400 bg-green-50"
              />

              <input
                name="age"
                value={formData.age || ""}
                placeholder="Age"
                onChange={handleChange}
                className="w-full p-2 rounded-full border border-green-400 bg-green-50"
              />

              <input
                name="location"
                value={formData.location || ""}
                placeholder="Location"
                onChange={handleChange}
                className="w-full p-2 rounded-full border border-green-400 bg-green-50"
              />

              <input
                name="phone"
                value={formData.phone || ""}
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full p-2 rounded-full border border-green-400 bg-green-50"
              />

            </div>
          </div>

          {/* SECTION 2 */}
          <div className="bg-white p-5 rounded-lg shadow flex flex-col gap-2">

            <h3 className="font-semibold mb-2">
              Section 2 – General Examination
            </h3>

            <label><input type="checkbox" name="chiefComplaint" onChange={handleChange}/> Chief Complaint</label>
            <label><input type="checkbox" name="pastHistory" onChange={handleChange}/> Past History</label>
            <label><input type="checkbox" name="medicationHistory" onChange={handleChange}/> Medication History</label>

            <label><input type="checkbox" name="itching" onChange={handleChange}/> Itching</label>
            <label><input type="checkbox" name="flaky" onChange={handleChange}/> Flaky Appearance</label>

          </div>

          {/* SECTION 3 */}
          <div className="bg-white p-5 rounded-lg shadow">

            <h3 className="font-semibold mb-3">Personal History</h3>

            <div className="flex justify-between mb-2">
              <span>Alcohol</span>
              <div className="space-x-3">
                <label><input type="radio" name="alcohol" value="yes" onChange={handleChange}/> Yes</label>
                <label><input type="radio" name="alcohol" value="no" onChange={handleChange}/> No</label>
              </div>
            </div>

            <div className="flex justify-between">
              <span>Smoking</span>
              <div className="space-x-3">
                <label><input type="radio" name="smoking" value="yes" onChange={handleChange}/> Yes</label>
                <label><input type="radio" name="smoking" value="no" onChange={handleChange}/> No</label>
              </div>
            </div>

          </div>

          {/* SECTION 4 */}
          <div className="bg-white p-5 rounded-lg shadow">

            <h3 className="font-semibold mb-3">Marital Status</h3>

            <label className="mr-4">
              <input type="radio" name="maritalStatus" value="married" onChange={handleChange}/> Married
            </label>

            <label>
              <input type="radio" name="maritalStatus" value="unmarried" onChange={handleChange}/> Unmarried
            </label>

          </div>

          {/* SECTION 5 */}
          <div className="bg-white p-5 rounded-lg shadow">

            <h3 className="font-semibold mb-2">Health Conditions</h3>

            {["bodyHeat","sleepDisturbance","digestionProblem","bowelUrine"].map((field)=>(
              <div key={field} className="flex justify-between mb-2">
                <span>{field}</span>

                <div className="space-x-3">
                  <label><input type="radio" name={field} value="yes" onChange={handleChange}/> Yes</label>
                  <label><input type="radio" name={field} value="no" onChange={handleChange}/> No</label>
                </div>
              </div>
            ))}

          </div>

          {/* SECTION 6 */}
          <div className="bg-white p-5 rounded-lg shadow">

            <h3 className="font-semibold mb-3">Medication Plan</h3>

            <textarea
              name="firstMonth"
              value={formData.firstMonth || ""}
              placeholder="1st Month Treatment"
              onChange={handleChange}
              className="w-full p-2 border border-green-400 bg-green-50 rounded-lg h-20"
            />

            <textarea
              name="secondMonth"
              value={formData.secondMonth || ""}
              placeholder="2nd Month Treatment"
              onChange={handleChange}
              className="w-full p-2 border border-green-400 bg-green-50 rounded-lg h-20 mt-3"
            />

          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-3 pt-4">

            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
            >
              Submit Form
            </button>

            <button
              type="reset"
              onClick={() => setFormData({})}
              className="bg-gray-300 px-6 py-2 rounded-md"
            >
              Reset
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}