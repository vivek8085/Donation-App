import React, { useState } from 'react';

function Signup({ onBack, onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [totalDonations, setTotalDonations] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const payload = { name, email, password, donations: totalDonations === "" ? 0 : Number(totalDonations) };
    console.log('Signup payload:', payload);
    onSignup(payload);
    if (onBack) onBack();
  };

  return (
    <div className="login-container animated-fade-in">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Donations (e.g. 5000)"
          value={totalDonations}
          onChange={e => setTotalDonations(e.target.value.replace(/^0+(?!$)/, ""))}
          min="0"
          required
        /> 
        {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}
        <p className="note">
            <input type="checkbox" required />By continuing, you agree to our{' '}
          <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>.
        </p>
        <button className="animated-btn" type="submit">Continue</button>
        {onBack && (
          <button
            type="button"
            className="animated-btn"
            style={{ background: '#eee', color: '#333' }}
            onClick={onBack}
          >
            Back to Login
          </button>
        )}
      </form>
    </div>
  );
}

export default Signup