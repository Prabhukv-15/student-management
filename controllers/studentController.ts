import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import Student from "../models/student";
import mongoose from "mongoose";
export const addStudent = async (req: AuthRequest, res: Response) => {
    try {
        const { reg, name, tamil, english, maths, science, social,total, grade } = req.body;
        // Assuming userId is set from authMiddleware
        if(!reg|| !name|| !grade) throw new Error("some field were missing");  
        const student = await Student.create({
            reg,
            name,
            tamil,
            english,
            maths,
            science,
            social,
            total,
            grade,
            createdBy: req.userId ,
        });
        

        res.status(201).send({ message: "Student added successfully", student });
    } catch (error) {
        res.status(500).send({ message: "Error adding student", error });
        console.log(error)
    }
};
export const  getStudents=async (req:AuthRequest, res:Response)=>{
    try{
        const {register_no,name}=req.query
        const students =await Student.find();
        if(!students){
            res.json({message:"No Founded the Student"});    
        }else{
            res.status(200).send(students);
        }
    } 
catch(error){
    console.error("Error fetching students:",error);
    res.status(500).json({message:"Server error." ,error});
}

};
export const  deleteStudent= async(req:AuthRequest,res:Response)=>{
    try{
        const studentId= req.params.studentId;
        const isExists= await Student.exists({_id:studentId});
        if(isExists){
            await Student.deleteOne({_id: studentId});
            res.status(201).send({ message: "Student deleted successfully" });
        }else{
            throw new Error("mismatch id");
        }
        console.log(isExists);
    }catch(error){
        res.status(500).send({ message: "Error deleting  student", error });
        console.log(error);
    }
}
export const editStudent = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const studentId = req.params.studentId; // Get student ID from URL
        const updateData = req.body; // Get updated fields from request body

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
             res.status(400).json({ message: "Invalid Student ID" }); 
             return//Fix: Added return
        }

        // Find and update student
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });

        if (!updatedStudent) {
            res.status(404).json({ message: "Student not found" }); //Fix: Added return
        }

        res.status(200).json({ message: "Student updated successfully", student: updatedStudent }); //
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Internal server error" }); // Added return
    }
};


export const studentStatistics=async(req:AuthRequest,res:Response)=>{
    try{
        const students=await Student.find();
        if(!students.length){
            res.status(500).send({message:"Error students"});
        }else{
            let totalMark=0; let highestMark=0; let lowestMark=Infinity;
            students.forEach(student=>{
                const total=Number(student.total)||0;
                totalMark+=total;
                highestMark=Math.max(highestMark,total);
                lowestMark=Math.min(lowestMark,total);
            });
            const averageMark=students.length?(totalMark/students.length).toFixed(2):"N/A";
            res.status(200).json({
                totalStudents: students.length,
                averageMarks: averageMark,
                highestScore: highestMark|| "N/A",
                lowestScore: lowestMark !== Infinity ? lowestMark : "N/A"
        });}
    }catch(error)
    {
        res.status(500).send({message:"fetching student data not founded",error});  
    }
}
