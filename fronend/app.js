document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded",function(){
    const token= localStorage.getItem("token");
if(!token){
    if(confirm("Unauthorized Visit Redirect Register?login Page.....")){
    window.location.href="index.html";
    return;
    }
}});
document.addEventListener("DOMContentLoaded", () => {
    fetchStudents();
});
// document.addEventListener("DOMContentLoaded", () => {
//     fetchAttendance();
// });
async function fetchStudents() {
    const token = localStorage.getItem("token");
    if (!token)  console.log("invalid");
    try {
        const response = await fetch("http://localhost:5000/api/students", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok ) {
            if(response.status===403){
                window.location.href="index.html";
            }
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to load students.");}
        //sttus return a number consider 
        
        const students = await response.json();
        renderTable(students);
        if (!Array.isArray(students)) throw new Error("Invalid data format received.");
    } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to load students.");
    }
}
// Get the modal
var modal = document.getElementById("myModal");// Get the buvar tton that opens the modal
var btn = document.getElementById("addStudents");// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

btn.onclick =() =>modal.style.display = "block";// When the user clicks the button, open the modal 
span.onclick =() => modal.style.display = "none";// When the user clicks on <span> (x), close the modal

// When the user clicks anywhere outside of the modal, close it
window.onclick =(event)=>{ if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Add Student
async function addStudent() {
    const token = localStorage.getItem("token");
    if (!token) console.log("invalid");

    const student = {
        reg: parseInt(document.getElementById("Reg").value),
        name: document.getElementById("Name").value,
        tamil: parseInt(document.getElementById("Tamil").value),
        english: parseInt(document.getElementById("English").value),
        maths: parseInt(document.getElementById("Maths").value),
        science: parseInt(document.getElementById("Science").value),
        social: parseInt(document.getElementById("Social").value),
        total:parseInt(document.getElementById("Total").value),
        grade: document.getElementById("Grade").value
    };
    

    try {
        const response = await fetch("http://localhost:5000/api/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(student)
        });

        const tbody = await response.json();
            document.getElementById("Reg").value = "";
            document.getElementById("Name").value = "";//reset code to emp()
            document.getElementById("Tamil").value = "";
            document.getElementById("English").value = "";
            document.getElementById("Maths").value = "";
            document.getElementById("Science").value = "";
            document.getElementById("Social").value = "";
            document.getElementById("Total").value="";
            document.getElementById("Grade").value = "";
            fetchStudents();  
    } catch (error) {
        console.error("Error adding student:", error);
        alert("Server error. Please try again later.");
    }
    modal.style.display = "none";
}

// Render Students Table
function renderTable(students) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';//clear previewous data on table

    students.forEach(student => {
        const row = document.createElement('tr');
        let gradeText = student.total < 35 ? "Fail" : student.grade;
        let gradeColor = student.total < 35 ? "red" : "green"; // Set red for fail condition
        // set status in fail condition for red
        const editButtonA= document.createElement("button");
        editButtonA.innerText="Edit";
        editButtonA.onclick=function(){
            editStudents(student);
        }
        row.innerHTML = `
            <td>${student.reg}</td>
            <td>${student.name}</td>
            <td>${student.tamil}</td>
            <td>${student.english}</td>
            <td>${student.maths}</td>
            <td>${student.science}</td>
            <td>${student.social}</td>
            <td>${student.total}</td>

           <td style="color: ${gradeColor}; font-weight: bold;">${gradeText}</td>
           
            <button onclick="deleteStudent('${student._id}')">Delete</button>
           
        `;
            // Create for Edit button and append
            const actionCell = document.createElement("td");
            actionCell.appendChild(editButtonA);
            row.appendChild(actionCell);
        //row.appendChild(editButtonA);
        tbody.appendChild(row);
    });
}
// cls
//  page edit btn instead of table
let editCloseBtn= document.getElementById("editClose");
editCloseBtn.onclick=()=> editModal.style.display="none";

let editModal =document.getElementById("editModal")
function editStudents(student) {
    editStudentId=student._id;
    editModal.style.display="block";//get pre value of reg,name
    document.getElementById("editReg").value =student.reg;
    document.getElementById("editName").value = student.name;
    document.getElementById("editTamil").value ;
    document.getElementById("editEnglish").value;
    document.getElementById("editMaths").value;
    document.getElementById("editScience").value;
    document.getElementById("editSocial").value;
    document.getElementById("editTotal").value;
    document.getElementById("editGrade").value;
}
// Delete Student
async function deleteStudent(studentId) {
    const token = localStorage.getItem("token");
    if (!token) console.log("invalid");

    try {
        const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
            alert("Student deleted successfully");
            fetchStudents();
        } else {
            alert("Failed to delete student");
        }
    } catch (error) { alert("Server error. Please try again later.");}  
}
let editStudentId;
async function editStudent() {
    const token = localStorage.getItem("token");
    if (!token)  console.log("invalid");
    
    try {
        let editSt  = {
            reg: document.getElementById("editReg").value.trim(),
            name: document.getElementById("editName").value.trim(),
            tamil: document.getElementById("editTamil").value.trim(),
            english: document.getElementById("editEnglish").value.trim(),
            maths: document.getElementById("editMaths").value.trim(),
            science: document.getElementById("editScience").value.trim(),
            social: document.getElementById("editSocial").value.trim(),
            total:document.getElementById("editTotal").value.trim(),
            grade: document.getElementById("editGrade").value.trim()
        };
        if(!editSt.reg || !editSt.name||!editSt.tamil||!editSt.english||!editSt.maths||!editSt.science||!editSt.social||!editSt.total||!editSt.grade){
            alert("All field are require")
            return
        }else console.log("Form Data:", editSt);

        const response = await fetch(`http://localhost:5000/api/students/${editStudentId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editSt) //
        });
        if (response.ok) {
            editModal.style.display="none";
            fetchStudents(); // Refresh the student list
        } else {
            const errorData = await response.json();
            alert(`Failed to update: ${errorData.message || "Unknown error"}`);
        }

    } catch (error) {
        alert("Server error. Please try again later.");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    studentStatistics();
});
let totalStudentsCount='';
async function studentStatistics() {
    const token = localStorage.getItem("token");
    if (!token) console.log("invalid");
    try{
        const response = await fetch("http://localhost:5000/api/students", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            const errorData=await response.json();
            if (!totalStudentsCount || !averageMarks || !highestScore || !lowestScore) 
                throw new Error(errorData.message ||"Failed to fetch students.");   
        }
        const students = await response.json();
        // Check if elements exist before setting innerHTML
        let totalStudentsCount = document.getElementById("totalStudentsCount");
        const averageMarks = document.getElementById("averageMarks");
        const highestScore = document.getElementById("highestScore");
        const lowestScore = document.getElementById("lowestScore"); 
        // Update student statistics
        totalStudentsCount.innerHTML = students.length;

        let totalMarks = 0, highest = 0, lowest = Infinity;

        students.forEach(student => {
            if (student.total !== undefined) {
                totalMarks += student.total;
                highest = Math.max(highest, student.total);
                lowest = Math.min(lowest, student.total);
            }
        });
        averageMarks.innerHTML = students.length > 0 ? (totalMarks / students.length).toFixed(2) : "N/A";
        highestScore.innerHTML = highest || "N/A";
        lowestScore.innerHTML = lowest !== Infinity ? lowest : "N/A";
    } catch (error) {
        console.error("Error fetching student data:", error);
    }
}

