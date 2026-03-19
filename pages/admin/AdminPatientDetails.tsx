import { useEffect, useState } from "react"
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useParams, useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import logo from "../../assets/logobgremoved.webp"

export default function AdminPatientDetails(){

const { id } = useParams()
const navigate = useNavigate()

const [patient,setPatient]=useState(null)

useEffect(()=>{

const fetchPatient = async()=>{

try{
const docRef = doc(db,"patients",id)
const docSnap = await getDoc(docRef)

if(docSnap.exists()){
setPatient(docSnap.data())
}

}catch(err){
console.log(err)
}

}

fetchPatient()

},[id])


// 🔥 DELETE FUNCTION
const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this patient?")

  if (!confirmDelete) return

  try {
    await deleteDoc(doc(db, "patients", id))
    alert("Patient deleted successfully")

    // 🔁 Redirect back
    navigate("/admin-patients")

  } catch (err) {
    console.log(err)
    alert("Error deleting patient")
  }
}


// 🔥 PDF FUNCTION (unchanged)
const downloadPDF = async () => {
  const input = document.getElementById("pdf-report")
  if (!input) return

  const canvas = await html2canvas(input, { scale: 2, useCORS: true })

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data

  let lastNonWhiteRow = 0
  for (let y = canvas.height - 1; y >= 0; y--) {
    let rowHasContent = false
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4
      const r = pixels[idx]
      const g = pixels[idx + 1]
      const b = pixels[idx + 2]

      if (r < 250 || g < 250 || b < 250) {
        rowHasContent = true
        break
      }
    }
    if (rowHasContent) {
      lastNonWhiteRow = y
      break
    }
  }

  const croppedCanvas = document.createElement("canvas")
  croppedCanvas.width = canvas.width
  croppedCanvas.height = lastNonWhiteRow + 10
  const croppedCtx = croppedCanvas.getContext("2d")
  croppedCtx?.drawImage(canvas, 0, 0)

  const imgData = croppedCanvas.toDataURL("image/png")
  const imgWidth = 210
  const imgHeight = (croppedCanvas.height * imgWidth) / croppedCanvas.width

  const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight])
  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
  pdf.save("patient-report.pdf")
}

if(!patient) return <p>Loading...</p>

return(

<div className="p-10">

{/* HEADER */}
<div className="flex justify-between items-center mb-6">

<h1 className="text-3xl font-bold">
Patient Examination Report
</h1>

{/* 🔥 DELETE BUTTON */}
<button
onClick={handleDelete}
className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
>
Delete
</button>

</div>

<div className="bg-white p-6 shadow rounded-lg">

<h2 className="text-xl font-semibold mb-4">
Personal Details
</h2>

<p><b>Name:</b> {patient.name}</p>
<p><b>Age:</b> {patient.age}</p>
<p><b>Phone:</b> {patient.phone}</p>
<p><b>Location:</b> {patient.location}</p>

<hr className="my-4"/>

<h2 className="text-xl font-semibold mb-4">
Medical Details
</h2>

<p><b>Chief Complaint:</b> {patient.chiefComplaint ? "Yes":"No"}</p>
<p><b>Past History:</b> {patient.pastHistory ? "Yes":"No"}</p>
<p><b>Medication History:</b> {patient.medicationHistory ? "Yes":"No"}</p>

<p><b>Itching:</b> {patient.itching ? "Yes":"No"}</p>
<p><b>Flaky Appearance:</b> {patient.flaky ? "Yes":"No"}</p>

<hr className="my-4"/>

<h2 className="text-xl font-semibold mb-4">
Medication Plan
</h2>

<p><b>1st Month:</b> {patient.firstMonth}</p>
<p><b>2nd Month:</b> {patient.secondMonth}</p>

</div>

<button
onClick={downloadPDF}
className="mt-6 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
>
Download PDF
</button>


{/* ===== HIDDEN PDF TEMPLATE (unchanged) ===== */}

<div className="absolute left-0 top-0 opacity-0 pointer-events-none">

<div id="pdf-report" className="w-[800px] bg-white border">

<div className="bg-green-100 px-8 py-6 flex items-center">
<img src={logo} className="h-16"/>
</div>

<div className="px-10 py-8 space-y-8 text-sm">

<div>
<h2 className="text-lg font-semibold mb-4 border-b pb-2">
Personal Details
</h2>

<div className="grid grid-cols-2 gap-y-3">
<p><b>Name:</b> {patient.name}</p>
<p><b>Age:</b> {patient.age}</p>
<p><b>Phone:</b> {patient.phone}</p>
<p><b>Location:</b> {patient.location}</p>
</div>
</div>

<div>
<h2 className="text-lg font-semibold mb-4 border-b pb-2">
Medical Details
</h2>

<div className="grid grid-cols-2 gap-y-3">
<p><b>Chief Complaint:</b> {patient.chiefComplaint ? "Yes":"No"}</p>
<p><b>Past History:</b> {patient.pastHistory ? "Yes":"No"}</p>
<p><b>Medication History:</b> {patient.medicationHistory ? "Yes":"No"}</p>
<p><b>Itching:</b> {patient.itching ? "Yes":"No"}</p>
<p><b>Flaky Appearance:</b> {patient.flaky ? "Yes":"No"}</p>
</div>
</div>

<div>
<h2 className="text-lg font-semibold mb-4 border-b pb-2">
Medication Plan
</h2>

<p><b>1st Month:</b> {patient.firstMonth}</p>
<p><b>2nd Month:</b> {patient.secondMonth}</p>
</div>

</div>

<div className="bg-green-100 py-3 text-sm text-center">
Anbu Naturo Hospital
</div>

</div>
</div>

</div>

)

}