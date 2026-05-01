"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function MatchingRulesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || "Burnout Peak";
  
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Simulate finding a match after 4 seconds
    const matchTimer = setTimeout(() => {
      router.push(`/founder-walk/active-walk?topic=${encodeURIComponent(topic)}`);
    }, 4000);

    const dotTimer = setInterval(() => {
      setDots(d => d.length >= 3 ? "" : d + ".");
    }, 500);

    return () => {
      clearTimeout(matchTimer);
      clearInterval(dotTimer);
    };
  }, [router, topic]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <div className={styles.loadingSection}>
          <div className={styles.pulseContainer}>
            <div className={styles.pulseCircle}></div>
          </div>
          <h2 className={styles.loadingText}>CONNECTING{dots}</h2>
          <p className={styles.loadingSub}>Finding a peer for: <strong>{topic}</strong></p>
        </div>

        <div className={styles.rulesSection}>
          <div className={styles.rulesHeader}>RULES OF ENGAGEMENT</div>
          <div className={styles.ruleCard}>
            <div className={styles.ruleNum}>1</div>
            <div className={styles.ruleText}>AUDIO ONLY. NO VIDEO.</div>
          </div>
          <div className={styles.ruleCard}>
            <div className={styles.ruleNum}>2</div>
            <div className={styles.ruleText}>NO PITCHING YOUR COMPANY.</div>
          </div>
          <div className={styles.ruleCard}>
            <div className={styles.ruleNum}>3</div>
            <div className={styles.ruleText}>15 MINUTES. STRICTLY.</div>
          </div>
        </div>

      </div>
    </div>
  );
}
