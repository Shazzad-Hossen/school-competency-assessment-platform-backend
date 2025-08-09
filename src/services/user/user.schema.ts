import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "supervisor" | "admin";
  verified: boolean,
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum:['user', 'supervisor', 'admin']},
    verified: { type: Boolean, default: false},
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  delete obj.updatedAt;
  return obj;
};

export default model<IUser>("User", userSchema);
