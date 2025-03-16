document.getElementById("showRegister").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "block";
});
document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById("showLogin").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("registerContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    });
})
// Logout Functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    window.location.href = "index.html";
});  
// Register User
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const department = document.getElementById("Department").value;
    const register_no = document.getElementById("Register_no").value;
    const phone_no = document.getElementById("phoneno").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, department, register_no, phone_no })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            document.getElementById("registerForm").reset();
            document.getElementById("registerContainer").style.display = "none";
            document.getElementById("loginContainer").style.display = "block";
        } else {
            alert("Registration failed: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});
//they already used the login process 
if(window.location.pathname.includes("index.html")){
    document.addEventListener("DOMContentLoaded",function(){
        localStorage.removeItem("token");    
       });
    
}
// Login User 
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    //localStorage.removeItem("token");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful");
            document.getElementById("loginContainer").style.display = "none";
            window.location.href="./result.html";

            fetchStudents();
        } else {
            alert("Login failed: " + data.message);
        }
    } catch (error) {
        
        alert("Success");
    }
});

