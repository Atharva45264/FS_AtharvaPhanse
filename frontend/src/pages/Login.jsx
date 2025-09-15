import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/dashboard");
    } catch (err) {
      alert("Register failed");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const username = prompt("Enter your anonymous username (e.g. anon_xxx):");
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <main className="page-center">
      <div className="auth-card">
        <h1 className="brand">Student Commute Optimizer</h1>
        <p className="muted">Anonymous carpool & route matching for students</p>

        <form onSubmit={handleRegister}>
          <input type="password" placeholder="Set password (for this anon account)" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn primary" type="submit">Register (create anon)</button>
        </form>

        <hr />

        <form onSubmit={handleLogin}>
          <input type="password" placeholder="Password (existing account)" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
