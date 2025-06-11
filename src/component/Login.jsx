import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dummyUser = {
      email: "admin@example.com",
      password: "123456",
    };

    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      setError("Email atau Password salah.");
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
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="login-button">Masuk</button>
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
