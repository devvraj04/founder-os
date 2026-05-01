"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function FrictionFormPage() {
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const targetString = "Yes, this is an existential crisis to the company";

  const handleInterrupt = (e: React.FormEvent) => {
    e.preventDefault();
    if (justification === targetString) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successBox}>
          <div className={styles.icon}>⚠️</div>
          <h1 className={styles.title}>CRITICAL ALERT SENT</h1>
          <p className={styles.desc}>The founder's device has been forcefully unlocked and the alert has been sounded.</p>
          <Link href="/disconnect-mode" className="brut-btn" style={{ marginTop: 24 }}>Return to App</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.frictionContainer}>
        <div className={styles.warningHeader}>
          ⛔ THE FOUNDER IS CURRENTLY UNAVAILABLE
        </div>
        <div className={styles.formBody}>
          <p className={styles.context}>
            The Founder is in <span style={{ fontWeight: 800 }}>DISCONNECT MODE</span> to recover psychological capital. 
            All notifications are blocked. If you proceed, you will trigger an OS-level Critical Alert that bypasses all silent modes.
          </p>
          
          <div className={styles.frictionTest}>
            <div className={styles.label}>To proceed, you must type the following phrase exactly:</div>
            <div className={styles.targetPhrase}>"{targetString}"</div>
            <input 
              type="text" 
              className={styles.frictionInput}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Type phrase here..."
              autoComplete="off"
            />
          </div>

          <div className={styles.actions}>
            {/* The primary, massive button encourages the user to NOT interrupt */}
            <Link href="/cognitive-shield/delegation" className={styles.nevermindBtn}>
              <span className={styles.neverTitle}>NEVERMIND, I WILL SOLVE THIS MYSELF</span>
              <span className={styles.neverSub}>Route to a proxy team member instead</span>
            </Link>

            {/* The secondary, smaller button is the actual interrupt */}
            <button 
              className={styles.interruptBtn}
              onClick={handleInterrupt}
              disabled={justification !== targetString}
            >
              Yes, Interrupt the Founder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
