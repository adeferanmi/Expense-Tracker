"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login attempt:", { email, password });
  };

  return (
    <main className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Welcome Back 👋</h2>

        <Image src="/favicon.png" alt="App Logo" width={60}height={60} className="auth-logo"/>
        
        <p className="auth-subtitle">Please log in to continue:</p>

        <form className="auth-form" onSubmit={handleLogin}>
          
          <input
            className="auth-input"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account? <Link className="auth-link" href="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
}