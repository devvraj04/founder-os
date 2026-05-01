"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function ActiveWalkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || "Burnout Peak";
  
  const [progress, setProgress] = useState(0); // 0 to 100
  const [chimePlayed, setChimePlayed] = useState(false);

  // 15 minutes = 900 seconds. We'll speed it up drastically for the demo.
  // Let's do 15 seconds total for demo purposes.
  const TOTAL_SECONDS = 15; 

  useEffect(() => {
    let secs = 0;
    const timer = setInterval(() => {
      secs++;
      const percent = (secs / TOTAL_SECONDS) * 100;
      setProgress(percent);

      // Play chime at 90% (simulating 14 minutes)
      if (percent >= 90 && !chimePlayed) {
        setChimePlayed(true);
        // Play an actual audio file if we had one.
      }

      if (secs >= TOTAL_SECONDS) {
        clearInterval(timer);
        router.push(`/founder-walk/reflection?topic=${encodeURIComponent(topic)}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [router, topic, chimePlayed]);

  return (
    <div className={styles.page}>
      <div className={styles.mobileContainer}>
        
        <div className={styles.header}>
          <div className={styles.liveBadge}>● LIVE</div>
          <div className={styles.peerTopic}>Peer Matched: {topic}</div>
        </div>

        <div className={styles.walkStage}>
          {/* Abstract Progress Circle (No numbers) */}
          <div 
            className={styles.progressCircle}
            style={{ 
              background: `conic-gradient(#FFFF00 ${progress}%, #333 ${progress}%)` 
            }}
          >
            <div className={styles.circleInner}>
              <div className={styles.audioWaveContainer}>
                <div className={`${styles.bar} ${styles.b1}`}></div>
                <div className={`${styles.bar} ${styles.b2}`}></div>
                <div className={`${styles.bar} ${styles.b3}`}></div>
                <div className={`${styles.bar} ${styles.b4}`}></div>
                <div className={`${styles.bar} ${styles.b5}`}></div>
              </div>
            </div>
          </div>
          
          {chimePlayed && (
            <div className={styles.chimeAlert}>
              One minute remaining. Wrap up gracefully.
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button 
            className={`brut-btn danger lg ${styles.endBtn}`}
            onClick={() => router.push(`/founder-walk/reflection?topic=${encodeURIComponent(topic)}`)}
          >
            END WALK EARLY
          </button>
        </div>

      </div>
    </div>
  );
}
