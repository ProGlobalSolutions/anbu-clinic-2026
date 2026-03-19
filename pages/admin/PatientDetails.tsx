import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      try {
        const ref = doc(db, "patients", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setPatient({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 space-y-6">

      <h1 className="text-3xl font-bold">Patient Details</h1>

      {/* PERSONAL */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="font-semibold mb-3">Personal Info</h2>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Location:</strong> {patient.location}</p>
      </div>

      {/* HEALTH */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="font-semibold mb-3">Health Info</h2>

        <p>Body Heat: {patient.bodyHeat}</p>
        <p>Sleep Disturbance: {patient.sleepDisturbance}</p>
        <p>Digestion Problem: {patient.digestionProblem}</p>
        <p>Bowel/Urine: {patient.bowelUrine}</p>

        <p>Alcohol: {patient.alcohol}</p>
        <p>Smoking: {patient.smoking}</p>
        <p>Marital Status: {patient.maritalStatus}</p>

        <p>1st Month Plan: {patient.firstMonth}</p>
        <p>2nd Month Plan: {patient.secondMonth}</p>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigate(`/admin/patient-medicine/${patient.id}`)}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Give Medicine
      </button>

    </div>
  );
}