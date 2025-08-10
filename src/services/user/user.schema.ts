import { model, Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  
  name: string;
  email: string;
  password: string;
  role: "user" | "supervisor" | "admin";
  verified: boolean,
  assesment: Types.ObjectId; 
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum:['user', 'supervisor', 'admin'], default:'user'},
    verified: { type: Boolean, default: false},
    assesment: { type: Schema.Types.ObjectId, required: true, ref: 'Assesment' },
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
