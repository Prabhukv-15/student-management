import mongoose from "mongoose";
import { attendance } from "../controllers/attenController";
const attendanceSchema = new mongoose.Schema(
    {
        reg: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        department: { type: String, required: true },
        attendance:{type:Selection, required:true}
    
    }
    )

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
