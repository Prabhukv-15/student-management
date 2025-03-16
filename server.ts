import express from "express"; 
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db"; 
import studentRoutes from "./routes/studentRoutes";
import authRoutes from "./routes/authRoutes";
import attendanceRoutes from"./routes/attendanceRoutes";
import detlsRoutes from"./routes/detlsRoutes";
// Load environment variables once
dotenv.config(); 
// Connect to MongoDB
connectDB();

const app = express(); 

// Middleware setup
app.use(express.json()); 
 // Allow all origins (for development)
 
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
}));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api",detlsRoutes);
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server running on port ${port}`));
console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Work do itz.....")