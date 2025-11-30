import { useEffect, useState } from "react";
import API from "../../api/axios";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ManagerDashboard = () => {
  const [stats, setStats] = useState({});
  const [todayStatus, setTodayStatus] = useState({});
  const [departmentData, setDepartmentData] = useState([]);
  const [weeklyTrend, setWeeklyTrend] = useState([]);

  useEffect(() => {
    fetchManagerStats();
  }, []);

  const fetchManagerStats = async () => {
    try {
      const res1 = await API.get("/dashboard/manager"); // total employees, weekly data
      const res2 = await API.get("/attendance/today-status"); // today's present/absent/late
      const res3 = await API.get("/attendance/summary"); // department-wise summary

      setStats(res1.data);
      setTodayStatus(res2.data);

      setWeeklyTrend(res1.data.weeklyTrend); // [{day: "Mon", present: 20}, ... ]

      setDepartmentData(
        res3.data.departmentSummary.map((d) => ({
          name: d.department,
          value: d.presentCount,
        }))
      );
    } catch (error) {
      console.log("Error loading manager dashboard", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manager Dashboard</h1>

      {/* Summary Cards */}
      <div style={styles.cardsRow}>
        <div style={styles.card}>
          <h3>Total Employees</h3>
          <p style={styles.number}>{stats.totalEmployees}</p>
        </div>

        <div style={styles.card}>
          <h3>Present Today</h3>
          <p style={styles.number}>{todayStatus.present}</p>
        </div>

        <div style={styles.card}>
          <h3>Absent Today</h3>
          <p style={styles.number}>{todayStatus.absent}</p>
        </div>

        <div style={styles.card}>
          <h3>Late Arrivals</h3>
          <p style={styles.number}>{todayStatus.late}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={styles.chartsRow}>

        {/* Weekly Attendance Trend */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartHeading}>Weekly Attendance Trend</h3>

          <LineChart width={500} height={300} data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="present" stroke="#0088FE" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Department-wise Attendance */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartHeading}>Department-wise Attendance</h3>

          <PieChart width={450} height={300}>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {departmentData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

/* -----------------
     STYLES
------------------ */
const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  cardsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  number: {
    fontSize: "30px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  chartsRow: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },
  chartBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  chartHeading: {
    marginBottom: "10px",
    textAlign: "center",
  },
};
