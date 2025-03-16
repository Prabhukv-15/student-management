import mongoose from "mongoose";

const resultSchema=new mongoose.Schema({
    regno: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    tamil: { type: Number, required: true },
    english: { type: Number, required: true },
    maths: { type: Number, required: true },
    science: { type: Number, required: true },
    social: { type: Number, required: true },
    result: { type: String,require:true },
});

const Result=mongoose.model('Result',resultSchema);
export default Result;