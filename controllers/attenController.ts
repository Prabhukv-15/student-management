import { Response } from "express";
import Attendance from "../models/attendance";
import details from "../models/details";
import { AuthRequest } from "../middlewares/authMiddleware";
// POST - Record Attendance
export const attendance = async (req: AuthRequest, res: Response) => {
    try {
        const { name, register_no,email,  phone_no,department } = req.query;
       console.log(req.query);
        const student = await details.find({});
        if (student) {
            console.log(student); // res.status(200).json({ message: "Success to loaded....",student });  frontend expects only an array but is getting an object.
           res.status(200).json(student); // Instead of wrapping inside an object
             
        }
    } catch (error:any) {
        console.error("Error:", error); // Handle Mongoose Validation Errors
        if (error.name === "ValidationError") {
             res.status(400).json({ message: "Invalid data format", error: error.message });
             
        }
        res.status(500).json({ message: "Server error" }); // Handle Other Server Errors
        
    }
};
const updateByAttendance=async(req:AuthRequest,res:Request)=>{
    try{
       
        const StudentId=req.body;
        const updatedStudent= await Attendance.findByIdAndUpdate(StudentId,{type:true})
        res.json(updatedStudent);

    }catch(error)
    {
        res.status(500).send({message:"fetching student data not founded",error});  
    }
}



