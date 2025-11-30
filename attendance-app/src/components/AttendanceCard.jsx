const statusColors = {
  present: "#4CAF50",
  absent: "#F44336",
  late: "#FF9800",
  "half-day": "#FFCC00",
};

const AttendanceCard = ({ date, status, checkIn, checkOut }) => {
  return (
    <div style={{ ...styles.card, background: statusColors[status] }}>
      <h3>{date}</h3>
      <p>Status: {status}</p>
      <p>Check In: {checkIn || "-"}</p>
      <p>Check Out: {checkOut || "-"}</p>
    </div>
  );
};

export default AttendanceCard;

const styles = {
  card: {
    padding: "15px",
    borderRadius: "10px",
    color: "#fff",
    width: "200px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
};
