"use client";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";

const LOGS = [
  { id: 1, date: "May 1, 2026", time: "14:22:05", name: "Alex Kowalski", role: "Internal (Lead Dev)", status: "BREACHED", justification: "AWS production server is down. We are losing $500/minute." },
  { id: 2, date: "May 1, 2026", time: "11:05:12", name: "Jordan Lee", role: "Internal (Ops)", status: "DETERRED", justification: "(Abandoned at Friction Form)" },
  { id: 3, date: "Apr 28, 2026", time: "09:14:33", name: "Enterprise Corp", role: "External VIP", status: "REROUTED", justification: "Auto-forwarded to Priya M." },
  { id: 4, date: "Apr 28, 2026", time: "08:45:00", name: "Unknown Caller", role: "External", status: "BLOCKED", justification: "Silently rejected." },
];

export default function BreachLogPage() {
  return (
    <div className={styles.page}>
      <NavBar />
      <header className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>
            <Link href="/disconnect-mode">← Disconnect Mode</Link> / Breach Analytics
          </div>
          <h1 className={styles.title}>BREACH LOG & ANALYTICS</h1>
          <p className={styles.subtitle}>Timestamped record of all attempts to bypass Disconnect Mode.</p>
        </div>
      </header>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statNum}>4</div>
          <div className={styles.statLabel}>Total Interruption Attempts</div>
        </div>
        <div className={styles.statCard} style={{background: '#FFFF00'}}>
          <div className={styles.statNum}>1</div>
          <div className={styles.statLabel}>Successful Breaches</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum}>2</div>
          <div className={styles.statLabel}>Deterred / Blocked</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum}>1</div>
          <div className={styles.statLabel}>Auto-Rerouted to Proxy</div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>INCIDENT LOG (LAST 7 DAYS)</h2>
          <button className="brut-btn sm">Export CSV</button>
        </div>
        <table className="brut-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Attempted By</th>
              <th>Role / Type</th>
              <th>Status</th>
              <th>Justification / Action Taken</th>
            </tr>
          </thead>
          <tbody>
            {LOGS.map(log => (
              <tr key={log.id}>
                <td>
                  <div className={styles.logDate}>{log.date}</div>
                  <div className={styles.logTime}>{log.time}</div>
                </td>
                <td><strong>{log.name}</strong></td>
                <td>{log.role}</td>
                <td>
                  <span className={`brut-badge ${log.status === 'BREACHED' ? 'red' : log.status === 'DETERRED' || log.status === 'BLOCKED' ? 'green' : 'yellow'}`}>
                    {log.status}
                  </span>
                </td>
                <td><code className={styles.justificationText}>{log.justification}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
