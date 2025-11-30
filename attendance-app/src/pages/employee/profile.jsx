import { useSelector } from "react-redux";
import { useState } from "react";
import API from "../../api/axios";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
  });

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const res = await API.put("/auth/update-profile", form);
      setMessage("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Profile</h1>

      <div style={styles.card}>
        <div style={styles.row}>
          <label>Employee ID</label>
          <p>{user?.employeeId}</p>
        </div>

        <div style={styles.row}>
          <label>Role</label>
          <p>{user?.role}</p>
        </div>

        {/* Editable Fields */}
        <div style={styles.row}>
          <label>Name</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <p>{user?.name}</p>
          )}
        </div>

        <div style={styles.row}>
          <label>Email</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <p>{user?.email}</p>
          )}
        </div>

        <div style={styles.row}>
          <label>Department</label>
          {editing ? (
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <p>{user?.department}</p>
          )}
        </div>

        {/* Buttons */}
        <div style={styles.buttonBox}>
          {!editing ? (
            <button style={styles.editBtn} onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <>
              <button style={styles.saveBtn} onClick={updateProfile}>
                Save
              </button>
              <button style={styles.cancelBtn} onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          )}
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Profile;

/* -----------------
     STYLES
------------------ */
const styles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  row: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonBox: {
    marginTop: "20px",
  },
  editBtn: {
    padding: "10px 15px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelBtn: {
    padding: "10px 15px",
    background: "#F44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    color: "green",
  },
};
