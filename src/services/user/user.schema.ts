import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
//   image?: string;
//   uid?: string;
//   nid?: string;
//   nidFront?: string;
//   nidBack?: string;
//   role: "user" | "admin";
//   verified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    // image: String,
    // uid: String,
    // nid: { type: String, unique: true, sparse: true },
    // nidFront: String,
    // nidBack: String,
    // role: { type: String, enum: ["user", "admin"], default: "user" },
    // verified: { type: Boolean, default: false },
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
