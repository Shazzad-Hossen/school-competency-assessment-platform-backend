import { model, Schema, Document, Types } from "mongoose";

interface IUserAssessment extends Document {
  started: boolean;
  currentStep: "1" | "2" | "3";
  step1Mark: number;
  step2Mark: number;
  step3Mark: number;
  nextStep: boolean;
}

const userAssessmentSchema = new Schema<IUserAssessment>(
  {
    
    started: { type: Boolean, default: false },
    currentStep: { type: String, enum: ['1', '2', '3'], default: '1' },
    step1Mark: { type: Number, default: 0 },
    step2Mark: { type: Number, default: 0 },
    step3Mark: { type: Number, default: 0 },
    nextStep: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Optional: Customize toJSON to hide some fields if needed
userAssessmentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  // No password here, but if any sensitive info, remove it here
  delete obj.updatedAt;
  return obj;
};

export default model<IUserAssessment>("Assesment", userAssessmentSchema);
