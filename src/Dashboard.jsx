import React, { useEffect, useState } from "react";

export default function Dashboard({ user, onLogout }) {
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    if (!user) {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => setLocalUser(data.user));
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        {onLogout && (
          <button className="animated-btn logout-btn" style={{ width: 'auto', padding: '0.4rem 1.2rem', fontWeight: 500 }} onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
      {localUser ? (
        <>
          <p><strong>Intern Name:</strong> {localUser.name}</p>
          <p><strong>Referral Code:</strong> <span style={{ background: '#fffbe7', color: '#bfa100', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>{localUser.referralCode}</span></p>
          <p><strong>Total Donations Raised:</strong> ₹{localUser.donations !== undefined ? localUser.donations : (localUser.totalDonations || 0)}</p>
          <div className="rewards-section">
            <h3 style={{marginBottom: '1.2rem'}}>Rewards / Unlockables</h3>
            <ul>
              {/* <li><span role="img" aria-label="silver">�</span>Silver Badge<br/><small>₹5,000+</small></li> */}
              <li>
                <span aria-label="silver-medal" style={{display:'block', marginBottom:'0.5rem'}}>
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19" cy="19" r="12" fill="#C0C0C0" stroke="#bdbdbd" strokeWidth="3"/>
                    <circle cx="19" cy="19" r="8" fill="#e0e0e0"/>
                    <rect x="15" y="4" width="8" height="10" rx="3" fill="#bdbdbd"/>
                    <rect x="17" y="2" width="4" height="6" rx="2" fill="#C0C0C0"/>
                  </svg>
                </span>
                Silver Badge<br/><small>₹5,000+</small>
              </li>
              <li><span role="img" aria-label="gold">🥇</span>Gold Badge<br/><small>₹10,000+</small></li>
              <li><span role="img" aria-label="bronze">🎉</span>Bronze Badge<br/><small>₹1,000+</small></li>
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
