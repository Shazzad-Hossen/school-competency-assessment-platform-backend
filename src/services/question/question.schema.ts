import { model, Schema, Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface IOption {
  text: string;
}

export interface IQuestion extends Document {
  competency: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  questionText: string;
  options: IOption[];
  correctOptionIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

// Option schema
const optionSchema = new Schema<IOption>(
  {
    text: { type: String, required: true },
  },
  { _id: false }
);

// Question schema
const questionSchema = new Schema<IQuestion>(
  {
    competency: { type: String, required: true },
    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      required: true,
    },
    questionText: { type: String, required: true },
    options: {
      type: [optionSchema],
      required: true,
      validate: [(val: IOption[]) => val.length >= 2, "At least 2 options required"],
    },
    correctOptionIndex: {
      type: Number,
      required: true,
      validate: {
        validator: function (this: IQuestion, v: number) {
          return v >= 0 && v < this.options.length;
        },
        message: "Correct option index must be within options range",
      },
    },
  },
  { timestamps: true }
);

questionSchema.plugin(paginate);

questionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

// Create a type for your Model with paginate method
interface QuestionModel<T extends Document> extends Model<T> {
  paginate: (query?: any, options?: any) => Promise<any>;
}

const Question = model<IQuestion, QuestionModel<IQuestion>>("Question", questionSchema);

export default Question;
