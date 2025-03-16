import mongoose from "mongoose";
const detailSchema= new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    register_no: { type: String, required: true, unique: true },
    phone_no: { type: String, required: true },
    department: { type: String, required: true },

})
const details= mongoose.model("details",detailSchema);
export default details;