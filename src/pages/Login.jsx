import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); // disesuaikan dengan backend
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://youtube-sentiment-backend-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token dan info user ke localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        navigate("/");
      } else {
        setError(data.message || "Login gagal. Cek kembali username dan password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="login">
      <div className="welcome-sentitube">
        <h1>Selamat Datang di Sentitube!</h1>
        <p>Platform Analisis Sentimen untuk konten yang lebih bermanfaat</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="masuk">
          <h2>Masuk</h2>
          <p>Masuk ke akun anda</p>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="login-button">
          Masuk
        </button>
        <p className="daftar">
          Belum punya akun?{" "}
          <a className="link-daftar" href="#">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}
