import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "employee",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(register(form));

    if (result.payload) navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
          style={styles.input}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={styles.input}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>

        <button type="submit" style={styles.btn}>
          Register
        </button>
      </form>

      <p onClick={() => navigate("/login")} style={styles.link}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Register;

const styles = {
  container: {
    width: "350px",
    margin: "80px auto",
    padding: "25px",
    background: "#fff",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  btn: {
    padding: "10px",
    background: "#28a745",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  link: {
    marginTop: "10px",
    cursor: "pointer",
    color: "#1976d2",
  },
};
