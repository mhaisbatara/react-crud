import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Register() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    // ✅ TRIM BIAR GA CUMA SPASI
    const username = data.username.trim();
    const password = data.password.trim();

    // ✅ VALIDASI
    if (!username || !password) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        { username, password }
      );

      alert(res.data.message);

      // reset input
      setData({ username: "", password: "" });

      // redirect
      window.location = "/";
    } catch (err) {
      console.log("ERROR REGISTER:", err); // 🔥 debug
      alert(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>

        <div className="input-group">
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <button onClick={handleRegister}>Register</button>

        <p className="link">
          Sudah punya akun? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;