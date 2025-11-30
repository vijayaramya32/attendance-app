import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(form));

    if (result.payload?.user?.role === "employee") {
      navigate("/employee/dashboard");
    } else if (result.payload?.user?.role === "manager") {
      navigate("/manager/dashboard");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.btn}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p onClick={() => navigate("/register")} style={styles.link}>
        Don’t have an account? Register
      </p>
    </div>
  );
};

export default Login;

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
    background: "#1976d2",
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
