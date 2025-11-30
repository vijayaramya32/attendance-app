import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myHistory } from "../../features/attendanceSlice";

const statusColors = {
  present: "#4CAF50",
  absent: "#F44336",
  late: "#FF9800",
  "half-day": "#FFCC00",
};

const MyHistory = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.attendance);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // yyyy-mm
  );

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(myHistory());
  }, [dispatch]);

  const filteredHistory = history.filter((item) =>
    item.date.startsWith(selectedMonth)
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Attendance History</h2>

      {/* Month Filter */}
      <div style={styles.filterBox}>
        <label>Select Month: </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.monthInput}
        />
      </div>

      {/* Calendar-like Grid */}
      <div style={styles.grid}>
        {filteredHistory.length === 0 ? (
          <p>No attendance available for this month.</p>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item._id}
              style={{
                ...styles.dayBox,
                backgroundColor: statusColors[item.status],
              }}
              onClick={() => setSelectedItem(item)}
            >
              <p style={styles.dateText}>
                {new Date(item.date).getDate()}
              </p>
              <p style={styles.statusText}>
                {item.status.toUpperCase()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Popup / Details Box */}
      {selectedItem && (
        <div style={styles.popup}>
          <h3>Attendance Details</h3>
          <p><strong>Date:</strong> {selectedItem.date}</p>
          <p><strong>Status:</strong> {selectedItem.status}</p>
          <p><strong>Check In:</strong> {selectedItem.checkInTime || "Not Recorded"}</p>
          <p><strong>Check Out:</strong> {selectedItem.checkOutTime || "Not Recorded"}</p>
          <p><strong>Total Hours:</strong> {selectedItem.totalHours || "0"}</p>

          <button style={styles.closeBtn} onClick={() => setSelectedItem(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MyHistory;

/* -----------------
     STYLES
------------------ */
const styles = {
  container: {
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  filterBox: {
    marginBottom: "20px",
  },
  monthInput: {
    padding: "5px 10px",
    marginLeft: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "10px",
  },
  dayBox: {
    padding: "15px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  dateText: {
    fontSize: "20px",
    marginBottom: "5px",
  },
  statusText: {
    fontSize: "12px",
  },
  popup: {
    position: "fixed",
    top: "25%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    width: "300px",
    zIndex: 1000,
  },
  closeBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};
