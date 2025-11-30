import { useEffect, useState } from "react";
import API from "../../api/axios";

const Reports = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);

  const [filters, setFilters] = useState({
    employeeId: "all",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await API.get("/attendance/all-users"); 
      setEmployees(res.data);
    } catch (err) {
      console.log("Error loading employee list", err);
    }
  };

  const loadReport = async () => {
    try {
      const res = await API.get("/attendance/all", {
        params: {
          employeeId: filters.employeeId,
          from: filters.fromDate,
          to: filters.toDate,
        },
      });

      setRecords(res.data);
    } catch (err) {
      console.log("Error loading report", err);
    }
  };

  // CSV Export
  const exportCSV = async () => {
    try {
      const res = await API.get("/attendance/export", {
        responseType: "blob",
        params: {
          employeeId: filters.employeeId,
          from: filters.fromDate,
          to: filters.toDate,
        },
      });

      // Create downloadable CSV file
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "attendance_report.csv";
      a.click();
    } catch (err) {
      console.log("Error exporting CSV", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Attendance Reports</h1>

      {/* Filters */}
      <div style={styles.filterBox}>
        {/* Employee Dropdown */}
        <div>
          <label>Employee</label>
          <select
            name="employeeId"
            value={filters.employeeId}
            onChange={(e) =>
              setFilters({ ...filters, employeeId: e.target.value })
            }
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

        {/* Date From */}
        <div>
          <label>From</label>
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
            style={styles.input}
          />
        </div>

        {/* Date To */}
        <div>
          <label>To</label>
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({ ...filters, toDate: e.target.value })
            }
            style={styles.input}
          />
        </div>

        {/* Load Button */}
        <button style={styles.loadBtn} onClick={loadReport}>
          Load Report
        </button>

        {/* Export CSV */}
        <button style={styles.exportBtn} onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      {/* Report Table */}
      <div style={styles.tableContainer}>
        {records.length === 0 ? (
          <p>No data available. Apply filters to load report.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Total Hours</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td>{r.user?.name}</td>
                  <td>{r.date}</td>
                  <td>{r.status}</td>
                  <td>{r.checkInTime || "-"}</td>
                  <td>{r.checkOutTime || "-"}</td>
                  <td>{r.totalHours || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;

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
  filterBox: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
    width: "200px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    width: "160px",
  },
  loadBtn: {
    padding: "10px 15px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  exportBtn: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    background: "#f2f2f2",
  },
};
