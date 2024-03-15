import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updateddAt: Date;
  // Virtual Attiributes
  age: number;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter your Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter your Email"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add photo"],
    },
    role: {
      type: String,
      required: [true, "Please enter role"],
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter your Gender "],
    },
    dob: {
      type: Date,

      required: [true, "Please enter your Date of birth "],
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function (this: { dob: Date }) {
  const today = new Date();
  const dob = this.dob; // --this means the current user
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model<IUser>("User", schema);
