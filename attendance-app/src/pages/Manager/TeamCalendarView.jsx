import { useState, useEffect } from "react";
import API from "../../api/axios";

const colors = {
  present: "#4CAF50",
  absent: "#F44336",
  late: "#FF9800",
  "half-day": "#FFCC00",
};

const TeamCalendarView = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [selectedEmployee, setSelectedEmployee] = useState("all");

  const [popupData, setPopupData] = useState([]);
  const [popupDate, setPopupDate] = useState("");

  useEffect(() => {
    loadEmployees();
    loadAttendance();
  }, [selectedMonth, selectedEmployee]);

  const loadEmployees = async () => {
    try {
      const res = await API.get("/attendance/all-users");
      setEmployees(res.data);
    } catch (err) {
      console.log("Error loading employees", err);
    }
  };

  const loadAttendance = async () => {
    try {
      const res = await API.get("/attendance/all", {
        params: {
          month: selectedMonth,
          employeeId: selectedEmployee,
        },
      });
      setAttendance(res.data);
    } catch (err) {
      console.log("Error loading attendance", err);
    }
  };

  const daysInMonth = new Date(
    selectedMonth.split("-")[0],
    selectedMonth.split("-")[1],
    0
  ).getDate();

  const openPopup = (date) => {
    const list = attendance.filter((rec) => rec.date === date);
    setPopupDate(date);
    setPopupData(list);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Team Attendance Calendar</h1>

      {/* Filters */}
      <div style={styles.filters}>
        <div>
          <label>Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Employees</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.employeeId})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Month</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={styles.select}
          />
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={styles.calendar}>
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const date = `${selectedMonth}-${day.toString().padStart(2, "0")}`;

          const records = attendance.filter((rec) => rec.date === date);
          const color =
            records.length === 0
              ? "#ddd"
              : colors[records[0]?.status] || "#ccc";

          return (
            <div
              key={date}
              style={{ ...styles.dayBox, background: color }}
              onClick={() => openPopup(date)}
            >
              <span style={styles.dayNumber}>{day}</span>
              {records.length > 0 && (
                <span style={styles.countBadge}>{records.length}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Popup Details */}
      {popupData.length > 0 && (
        <div style={styles.popup}>
          <h3>Attendance on {popupDate}</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
              </tr>
            </thead>
            <tbody>
              {popupData.map((r) => (
                <tr key={r._id}>
                  <td>{r.user?.name}</td>
                  <td>{r.status}</td>
                  <td>{r.checkInTime || "-"}</td>
                  <td>{r.checkOutTime || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button style={styles.closeBtn} onClick={() => setPopupData([])}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamCalendarView;

/* -----------------
      STYLES
------------------- */
const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  filters: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
  },
  select: {
    padding: "8px",
    width: "180px",
    borderRadius: "6px",
  },
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "10px",
  },
  dayBox: {
    height: "90px",
    borderRadius: "10px",
    padding: "8px",
    cursor: "pointer",
    position: "relative",
    textAlign: "left",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  dayNumber: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  countBadge: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    background: "#00000055",
    padding: "3px 6px",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#fff",
  },
  popup: {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "450px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  },
  closeBtn: {
    marginTop: "15px",
    padding: "8px 12px",
    background: "#F44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
