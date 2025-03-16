 document.addEventListener("DOMContentLoaded",async()=>{
    await fetchAttendance(); // Call function on page load
    async function fetchDetail() {
        const token=localStorage.getItem("token");
        if(!token)
            console.log("invalid");
        try{
            const response= await fetch("http://localhost:5000/api/detail",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                
                }
            });
            if (!response.ok)  throw new Error(errorData.message || "Failed to load detail.");
            const Detail=await response.json();
            console.log(Detail);
            if(!Array.isArray(Detail)) throw new Error("Invalid data format")
            renderTableBody(Detail);
        }catch (error) {
                console.error("Error fetching students:", error);
                alert("Failed to load students.");
        }
    }
fetchDetail()
 }) 
// DashBoard page in table
async function addDetail() {
    const token = localStorage.getItem("token");
    if(!token)  console.log("invalid")
    const detail={
        name:document.getElementById("Name").value,
        register_no:document.getElementById("Reg").value,
        email:document.getElementById("regEmail").value,
        phone_no:document.getElementById("phoneNo").value,
        department:document.getElementById("department").value,
    };
    console.log("response",detail);
    try {
        const response = await fetch("http://localhost:5000/api/detail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(detail)
        });
        const addBody = await response.json();
            document.getElementById("Name").value = "";
            document.getElementById("Reg").value = "";
            document.getElementById("regEmail").value = "";
            document.getElementById("phoneNo").value = "";
            document.getElementById("department").value = "";
           fetchDetail();
    } catch (error) {
        console.error("Error adding student:", error);
        alert("Server error. Please try again later.");
    }
    document.getElementById("myModal").style.display = "none";   //modal.style.display = "none";

}
function renderTableBody(Detail) {
    const tbody = document.getElementById("addBody");
    tbody.innerHTML = "";
    
    Detail.forEach((detail) => {
    let row = document.createElement("tr");
         row.innerHTML = `
            <td>${detail.name}</td>
            <td>${detail.register_no}</td>
            <td>${detail.email}</td>
            <td>${detail.phone_no}</td>
            <td>${detail.department}</td>
            `;
        tbody.appendChild(row);
        });
    }
    
//     details.forEach((detail) => {
//         let row = document.createElement("tr");
//         row.innerHTML = `
//     <td>${detail.name}</td>
//     <td>${detail.register_no}</td>
//     <td>${detail.email}</td>
//     <td>${detail.phone_no}</td>
//     <td>${detail. department}</td>`
//     tbody.appendChild(row);
// })}
var model=document.getElementById("myModal");
var backBtn=document.getElementById("close-btn");
var addBtn =document.getElementById("add-btn")
console.log(addBtn);
var span=document.getElementById("close");

addBtn.onclick=()=> model.style.display="block";
backBtn.onclick=() => model.style.display="none";

// Fetch and display attendance

async function fetchAttendance() {
    const token = localStorage.getItem("token");
    if (!token)  console.log("invalid");
   
    try {
        const response = await fetch("http://localhost:5000/api/attendance", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });
        const attendanceRecord = await response.json();
            console.log(attendanceRecord);
        if(!response.ok) console.log("not work to loaded");
        console.log("fetch data arrived ");
        if (!Array.isArray(attendanceRecord)) throw new Error("Invalid response data.");
        
        renderAttendanceTable(attendanceRecord);
    } catch (error){
        console.log(error);
    }

async function renderAttendanceTable(attendanceRecord) {
    const attendanceTable= document.getElementById("attendanceTable");
    attendanceTable.innerHTML="";// Clear previous data
    
    attendanceRecord.forEach((student)=>{
        let rows= document.createElement("tr")
           rows.innerHTML=`
            <td>${student.name}</td>
            <td>${student.register_no}</td>
            <td>${student.email}</td>
            <td>${student.phone_no}</td>
            <td>${student.department}</td>
            <td><input type="radio" value="present" onchange="presentAttendance()">present</input>
            <td> <input type="radio"  value="absent" onchange="absentAttendance()">Absent</input>
            `;
            attendanceTable.appendChild(rows);
        });
    }}
function presentAttendance(){
    let valueOfAttendance=Boolean.present||true;
    document.getElementById("presentCount").value=`${valueOfAttendance}`;
    
}function absentAttendance(){
    let valueOfAttendance=Boolean.absent||false;
    document.getElementById("presentCount").value=`${valueOfAttendance}`;
}
function editAttendance(){
    try{
    const  response = await("http://localhost:5000/api/attendance",{
        method:"PUT",
        headers:{
            "Authorization":"application/json"},
     } );
    const student= response.json(attendanceValue);
    if(!response.ok)
        throw new error("response not ok");
    }catch(error){
        console.log(error);
    }
}
function updateAttendance() {
    let presentCount = document.querySelectorAll('input[value="present"]:checked').length;
    let absentCount = document.querySelectorAll('input[value="absent"]:checked').length;
    document.getElementById("presentCount").innerText = `Total Present: ${presentCount}`;
    document.getElementById("absentCount").innerText = `Total Absent: ${absentCount}`;
    presentAttendance();
    absentAttendance();
    editAttendance();


}
