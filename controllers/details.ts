
import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import mongoose from "mongoose";
import details from "../models/details";
export const addDetails= async(req:AuthRequest, res:Response)=>
{
    try{
    const {name,email,register_no,phone_no,department}=req.body;
    const detail= await details.create({//its cll by a func
        name,
        register_no,
        email,
        phone_no,
        department,
        createdBy:req.userId,
    })
    res.status(201).send({message:"Details Were Add",detail});
}catch(error){
    res.status(500).send({message:"Error in Details",error});
    console.log(error)

}

}
export const getDetails=async(req:AuthRequest,res:Response)=>{
    const Detail= await details.find();
    if(!Detail){
        res.status(500).json({message:"the details not get"});
    }else{
        res.status(201).json(Detail);
    }
}