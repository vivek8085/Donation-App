import React from "react";

const rankIcons = [
  <span key="gold" role="img" aria-label="gold" style={{fontSize:'1.3em', color:'#FFD700'}}>🥇</span>,
  <span key="silver" role="img" aria-label="silver" style={{fontSize:'1.3em', color:'#C0C0C0'}}>🥈</span>,
  <span key="bronze" role="img" aria-label="bronze" style={{fontSize:'1.3em', color:'#cd7f32'}}>🥉</span>
];

export default function Leaderboard({ leaderboard = [] }) {
  return (
    <div className="leaderboard-container" style={{background:'#fff', borderRadius:'18px', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.12)', padding:'2rem 1.5rem', maxWidth:'600px', margin:'2.5rem auto'}}>
      <h2 style={{marginBottom:'1.5rem', color:'#fda085', letterSpacing:'1px'}}>Leaderboard</h2>
      <table style={{width:'100%', borderCollapse:'separate', borderSpacing:'0 0.7rem'}}>
        <thead>
          <tr style={{background:'linear-gradient(90deg, #f6d365 0%, #fda085 100%)'}}>
            <th style={{borderRadius:'10px 0 0 0', padding:'0.8rem', color:'#111'}}>Rank</th>
            <th style={{padding:'0.8rem', color:'#111'}}>Name</th>
            <th style={{padding:'0.8rem', color:'#111'}}>Referral Code</th>
            <th style={{borderRadius:'0 10px 0 0', padding:'0.8rem', color:'#111'}}>Total Donations</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={entry.referralCode}
              style={{
                background: idx % 2 === 0 ? 'rgba(246,211,101,0.08)' : 'rgba(253,160,133,0.08)',
                boxShadow: '0 2px 8px 0 #fda08522',
                borderRadius: '10px',
                transition: 'box-shadow 0.25s, border 0.25s',
                border: idx < 3 ? `2.5px solid ${['#FFD700','#C0C0C0','#cd7f32'][idx]}` : '2px solid #eee',
                fontWeight: idx < 3 ? 700 : 500
              }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 16px 2px #00e6ff, 0 0 24px 4px #0077ff'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 8px 0 #fda08522'}
            >
              <td style={{textAlign:'center'}}>{idx < 3 ? rankIcons[idx] : idx + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.referralCode}</td>
              <td style={{color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#cd7f32' : '#333', fontWeight:700}}>₹{entry.donations !== undefined ? entry.donations : (entry.totalDonations || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
