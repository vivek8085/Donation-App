import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);


useEffect(() => {
  fetch("http://localhost:5000/api/leaderboard")
    .then((res) => res.json())
    .then((data) => setLeaderboard(data));
}, []);


const handleLogin = async (loginData) => {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });
    const data = await res.json();
    if (res.ok) {
      // Always get the latest user from backend (with donations field)
      setUser(data.user);
      setPage("dashboard");
      // Refresh leaderboard
      fetch("http://localhost:5000/api/leaderboard")
        .then((res) => res.json())
        .then((data) => setLeaderboard(data));
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    alert("Login failed");
  }
};


const handleSignup = async (signupData) => {
  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData)
    });
    const data = await res.json();
    if (res.ok) {
      // Always get the latest user from backend (with donations field)
      setUser(data.user);
      setPage("dashboard");
      // Refresh leaderboard
      fetch("http://localhost:5000/api/leaderboard")
        .then((res) => res.json())
        .then((data) => setLeaderboard(data));
    } else {
      alert(data.error || "Signup failed");
    }
  } catch (err) {
    alert("Signup failed");
  }
};

  // Only allow dashboard/leaderboard if logged in
  const isLoggedIn = !!user;
  useEffect(() => {
    if (!isLoggedIn && page !== "login") {
      setPage("login");
    }
  }, [isLoggedIn, page]);

  return (
    <div className="app-container">
      <nav>
        {!isLoggedIn && <button onClick={() => setPage("login")}>Login</button>}
        {isLoggedIn && <>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("leaderboard")}>Leaderboard</button>
        </>}
      </nav>
      <main>
        {page === "login" && <Login onLogin={handleLogin} onSignup={handleSignup} />}
        {page === "dashboard" && isLoggedIn && <Dashboard user={user} onLogout={() => { setUser(null); setPage("login"); }} />}
        {page === "leaderboard" && isLoggedIn && <Leaderboard leaderboard={leaderboard} />}
      </main>
    </div>
  );
}

export default App;
