import { Request,Response } from "express";
import Student from "../models/student";
import details from "../models/details";//muyhukumar logics
import { AuthRequest } from "../middlewares/authMiddleware";
export const existingData =async (req:AuthRequest,res:Response)=>{
        console.log(req.query); 
        const {register_no,name}=req.query;
        if(!register_no|| !name ){
            res.status(400).json({ message: "Register number and name are required!" });
        }
        try{
            const existingStudent =await details.findOne({register_no,name});
            if(!existingStudent){
                res.status(404).json({message: "Student not found!" });
                return;
            }
            res.status(200).json({ message: "Student exists" });
    }catch(err){
        res.status(500).json({ message: "Database error" });
    }
}
export const addResult =async(req:AuthRequest,res:Response)=>{
    try{
        const studentResult=new Student(req.body);
        await studentResult.save();
        res.json(studentResult);
    }catch(err){
        res.status(500).json({ message: "Error saving result" });
    }
}

export const getResult =async(req:AuthRequest,res:Response)=>{
    try{
        const results =await Student.find();
        res.json(results);
    }catch{
        res.status(500).json({ message: "Error fetching results" });
    }
}

export const getResultById =async(req:Request,res:Response)=>{
    try{
        const result =await Student.findById(req.params.id);
        if(!result){
            res.status(400).json({ message: "Student not found" });
            return;
        }
        res.json(result);
    }catch(err){
        res.status(500).json({ message: "Error fetching student", err });  
    }
}
export const updateResult =async (req:Request,res:Response)=>{
    try{
        const updatedResult = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedResult);
    }catch(err){
        res.status(500).json({ message: "Error updating result" });
    }
}

export const deleteResult =async (req:Request,res:Response)=>{
    try{
        const deleteById =await Student.findByIdAndDelete(req.params.id)
        res.json({ message: "Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting result" });
    }
}