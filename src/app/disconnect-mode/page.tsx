"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";

export default function DisconnectModePage() {
  const [engaged, setEngaged] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate a breach event after 5 seconds of being engaged for demo purposes
  const [breach, setBreach] = useState<{name: string, reason: string} | null>(null);
  
  useEffect(() => {
    if (engaged) {
      const timer = setTimeout(() => {
        setBreach({
          name: "Alex Kowalski (Lead Developer)",
          reason: "AWS production server is down. We are losing $500/minute."
        });
      }, 8000); // Trigger a breach after 8 seconds of engagement
      return () => clearTimeout(timer);
    } else {
      setBreach(null);
    }
  }, [engaged]);

  return (
    <div className={`${styles.page} ${engaged ? styles.pageEngaged : ""} ${breach ? styles.pageBreach : ""}`}>
      {/* Hide navbar when engaged to simulate lock screen */}
      <div className={engaged ? styles.hidden : ""}>
        <NavBar />
      </div>

      {!engaged && (
        <div className={styles.adminNav}>
          <Link href="/disconnect-mode/proxy-config" className="brut-btn sm">Proxy Configuration</Link>
          <Link href="/disconnect-mode/friction" className="brut-btn sm">View Friction Form</Link>
          <Link href="/disconnect-mode/breach-log" className="brut-btn sm">Breach Analytics</Link>
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.timeDisplay}>
          <div className={styles.time}>{time || "12:00 PM"}</div>
          <div className={styles.date}>{date || "Monday, May 1"}</div>
        </div>

        {breach ? (
          <div className={styles.breachAlert}>
            <div className={styles.breachHeader}>CRITICAL OVERRIDE TRIGGERED</div>
            <div className={styles.breachBody}>
              <div className={styles.breachLabel}>INTERRUPTING PARTY:</div>
              <div className={styles.breachName}>{breach.name}</div>
              <div className={styles.breachLabel}>JUSTIFICATION:</div>
              <div className={`mono ${styles.breachReason}`}>{breach.reason}</div>
            </div>
            <div className={styles.breachActions}>
              <button className="brut-btn lg" onClick={() => setBreach(null)}>Dismiss & Re-Engage</button>
              <button className="brut-btn danger lg" onClick={() => {setBreach(null); setEngaged(false);}}>Unlock Device</button>
            </div>
          </div>
        ) : (
          <div className={styles.toggleContainer}>
            <div className={styles.toggleLabel}>
              DISCONNECT MODE: {engaged ? "ENGAGED" : "OFF"}
            </div>
            <button 
              className={`${styles.massiveToggle} ${engaged ? styles.toggleOn : ""}`}
              onClick={() => setEngaged(!engaged)}
            >
              <div className={styles.toggleSwitch}></div>
            </button>
            <p className={styles.toggleDesc}>
              {engaged 
                ? "All notifications blocked. External calls routed to Proxy. Only Critical Alerts can break through." 
                : "Engage to activate OS-level hooks and the Friction Form barrier."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
