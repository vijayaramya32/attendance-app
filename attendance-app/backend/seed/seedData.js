import mongoose from "mongoose";
import User from "../models/user.js";
import Attendance from "../models/attendance.js";
import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";

await connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await Attendance.deleteMany();

    const password = await bcrypt.hash("123456", 10);

    // Manager
    const manager = await User.create({
      name: "Manager One",
      email: "manager@example.com",
      password,
      role: "manager",
      employeeId: "M0001",
      department: "Admin",
    });

    // Employees
    const emp1 = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password,
      role: "employee",
      employeeId: "EMP001",
      department: "IT",
    });

    const emp2 = await User.create({
      name: "Priya Sharma",
      email: "priya@example.com",
      password,
      role: "employee",
      employeeId: "EMP002",
      department: "HR",
    });

    const emp3 = await User.create({
      name: "Ravi Kumar",
      email: "ravi@example.com",
      password,
      role: "employee",
      employeeId: "EMP003",
      department: "Finance",
    });

    // Attendance Samples
    await Attendance.insertMany([
      {
        userId: emp1._id,
        date: "2025-01-16",
        checkInTime: "09:10",
        checkOutTime: "17:00",
        status: "late",
        totalHours: 7.5,
      },
      {
        userId: emp2._id,
        date: "2025-01-16",
        checkInTime: "09:00",
        checkOutTime: "17:00",
        status: "present",
        totalHours: 8,
      },
      {
        userId: emp3._id,
        date: "2025-01-16",
        status: "absent",
      },
    ]);

    console.log("✔ Seed Data Inserted Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
