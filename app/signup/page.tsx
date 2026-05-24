"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Signup attempt:", {
      fullName,
      email,
      password,
    });
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Join Us</h2>

        <Image src="/favicon.png" alt="App Logo" width={60}height={60} className="auth-logo"/>

        <p>Create your account to continue:</p>

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            className="auth-input"
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="auth-link" href="/">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}