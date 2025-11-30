import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String, // format YYYY-MM-DD
      required: true,
    },

    checkInTime: {
      type: String,
      default: "",
    },

    checkOutTime: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["present", "absent", "late", "half-day"],
      default: "present",
    },

    totalHours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", AttendanceSchema);
