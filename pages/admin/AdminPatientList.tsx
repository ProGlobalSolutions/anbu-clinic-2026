import { useEffect, useState } from "react"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"
import { useNavigate } from "react-router-dom"

export default function AdminPatientList(){

const [patients,setPatients] = useState<any[]>([])
const navigate = useNavigate()

useEffect(()=>{

const fetchPatients = async()=>{

try{
const querySnapshot = await getDocs(collection(db,"patients"))

const data:any[] = []

querySnapshot.forEach((docItem)=>{
data.push({
id: docItem.id,
...docItem.data()
})
})

setPatients(data)

}catch(err){
console.log(err)
}

}

fetchPatients()

},[])


// 🔥 DELETE FUNCTION
const handleDelete = async (id:string) => {

const confirmDelete = window.confirm("Are you sure you want to delete this patient?")

if(!confirmDelete) return

try{

await deleteDoc(doc(db,"patients",id))

// 🔥 REMOVE FROM UI (no reload)
setPatients(prev => prev.filter(p => p.id !== id))

alert("Patient deleted successfully")

}catch(err){
console.log(err)
alert("Error deleting patient")
}

}


return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Patients List
</h1>

<div className="space-y-4">

{patients.map((patient)=>(
<div
key={patient.id}
className="bg-white p-5 rounded-lg shadow flex justify-between items-center"
>

{/* LEFT - INFO */}
<div>
<h2 className="text-lg font-semibold">{patient.name}</h2>
<p className="text-sm text-gray-500">Age: {patient.age}</p>
<p className="text-sm text-gray-500">Phone: {patient.phone}</p>
</div>


{/* RIGHT - ACTIONS */}
<div className="flex gap-3">

{/* VIEW */}
<button
onClick={()=>navigate(`/admin-patient/${patient.id}`)}
className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
View
</button>

{/* 🔴 DELETE */}
<button
onClick={()=>handleDelete(patient.id)}
className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
>
Delete
</button>

</div>

</div>
))}

</div>

</div>

)

}