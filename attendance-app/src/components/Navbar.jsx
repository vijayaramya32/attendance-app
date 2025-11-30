import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2>Attendance System</h2>

      <div style={styles.links}>
        {user?.role === "employee" && (
          <>
            <Link style={styles.link} to="/employee/dashboard">Dashboard</Link>
            <Link style={styles.link} to="/employee/history">My History</Link>
            <Link style={styles.link} to="/employee/mark">Mark Attendance</Link>
            <Link style={styles.link} to="/employee/profile">Profile</Link>
          </>
        )}

        {user?.role === "manager" && (
          <>
            <Link style={styles.link} to="/manager/dashboard">Dashboard</Link>
            <Link style={styles.link} to="/manager/all">All Employees</Link>
            <Link style={styles.link} to="/manager/calendar">Team Calendar</Link>
            <Link style={styles.link} to="/manager/reports">Reports</Link>
          </>
        )}

        {user && (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  nav: {
    background: "#1976d2",
    padding: "12px 20px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutBtn: {
    background: "#F44336",
    color: "#fff",
    padding: "8px 12px",
    border: "0",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
