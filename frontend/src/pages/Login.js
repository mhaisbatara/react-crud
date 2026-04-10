import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);

  const handleLogin = () => {
    // ✅ VALIDASI
    if (!data.username || !data.password) {
      alert("Username dan password wajib diisi!");
      return;
    }

    axios.post("http://localhost:3000/auth/login", data)
      .then((res) => {
        alert(res.data.message);
        window.location = "/dashboard";
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login gagal");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>
        <p>Login untuk melanjutkan</p>

        <div className="input-group">
          <input
            type="text"
            required
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input
            type={show ? "text" : "password"}
            required
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
          <label>Password</label>
          <span className="toggle" onClick={() => setShow(!show)}>
            {show ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleLogin}>Login</button>

        <p className="link">
          Belum punya akun? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;