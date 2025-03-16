import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    reg: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tamil: { type: Number, required: true },
    english: { type: Number, required: true },
    maths: { type: Number, required: true },
    science: { type: Number, required: true },
    social: { type: Number, required: true },
    total: { type: Number },
    grade: { type: String, required: true },
    password: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
studentSchema.pre("save",function(next){ 
    this.total= this.tamil+  this.english,this.maths+this.science+this.social;
// Auto-calculate total marks before saving
    next();
});
const Student = mongoose.model("Student", studentSchema);
export default Student;
