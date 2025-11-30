import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["employee", "manager"],
      default: "employee",
    },

    employeeId: {
      type: String,
      required: function () {
        return this.role === "employee";
      },
      unique: true,
    },

    department: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
