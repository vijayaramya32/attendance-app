import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MarkAttendance from "./pages/employee/MarkAttendance";
import MyHistory from "./pages/employee/MyHistory";
import Profile from "./pages/employee/profile";

import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import AllEmployees from "./pages/Manager/AllEmployees";
import TeamCalendarView from "./pages/Manager/TeamCalendarView";
import Reports from "./pages/Manager/Reports";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/mark" element={<MarkAttendance />} />
        <Route path="/employee/history" element={<MyHistory />} />
        <Route path="/employee/profile" element={<Profile />} />

        {/* Manager */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/all" element={<AllEmployees />} />
        <Route path="/manager/calendar" element={<TeamCalendarView />} />
        <Route path="/manager/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
