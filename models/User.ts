import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,},
  password: { type: String, required: true, select: false },
  phone_no: { type: String, required: true },
  department: { type: String, required: true },
  register_no: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", UserSchema);
export default User;
