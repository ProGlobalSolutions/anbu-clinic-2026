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

        <p><strong>Chief Complaint:</strong> {patient.chiefComplaint}</p>
        <p><strong>Past History:</strong> {patient.pastHistory}</p>
        <p><strong>Medication History:</strong> {patient.medicationHistory}</p>

        <hr className="my-3"/>

        <p><strong>Bowel:</strong> {patient.bowel}</p>
        <p><strong>Urine:</strong> {patient.urine}</p>
        <p><strong>Sleep:</strong> {patient.sleep}</p>
        <p><strong>Appetite:</strong> {patient.appetite}</p>
        <p><strong>Stress:</strong> {patient.stress}</p>

        <p><strong>Heat:</strong> {patient.heat}</p>
        <p><strong>Itching:</strong> {patient.itching}</p>
        <p><strong>Flakes:</strong> {patient.flakes}</p>
        <p><strong>Bleeding:</strong> {patient.bleeding}</p>
        <p><strong>Cracks:</strong> {patient.cracks}</p>
        <p><strong>Pus Collection:</strong> {patient.pusCollection}</p>

        <hr className="my-3"/>

        <p><strong>Alcohol:</strong> {patient.alcohol}</p>
        <p><strong>Smoking:</strong> {patient.smoking}</p>
        <p><strong>Marital Status:</strong> {patient.maritalStatus}</p>

        <hr className="my-3"/>

        <p><strong>1st Month Plan:</strong> {patient.firstMonth}</p>
        <p><strong>2nd Month Plan:</strong> {patient.secondMonth}</p>
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