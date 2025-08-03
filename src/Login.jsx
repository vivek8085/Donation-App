import React, { useState } from "react";
import Signup from "./Signup";


export default function Login({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  if (showSignup) {
    return <Signup onBack={() => setShowSignup(false)} onSignup={onSignup} />;
  }

  return (
    <div className="login-container animated-fade-in">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="note">
          Don't have an account?{' '}
          <button
            type="button"
            className="animated-btn"
            style={{ background: 'none', color: '#007bff', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setShowSignup(true)}
          >
            Sign up
          </button>
        </p>
        <button className="animated-btn" type="submit">Continue</button>
      </form>
    </div>
  );
}
