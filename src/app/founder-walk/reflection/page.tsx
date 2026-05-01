"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function ReflectionPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || "Burnout Peak";
  const [feedback, setFeedback] = useState<string | null>(null);

  if (feedback) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.successState}>
            <div className={styles.icon}>✓</div>
            <h1 className={styles.title}>SESSION RECORDED</h1>
            <p className={styles.desc}>Your feedback improves the matching algorithm for future walks.</p>
            <Link href="/" className="brut-btn" style={{marginTop: 32}}>Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>WALK COMPLETE</h1>
          <p className={styles.subtitle}>Take a deep breath. You handled that well.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.topicBox}>
            <div className={styles.topicLabel}>Session matched on:</div>
            <div className={styles.topicName}>{topic}</div>
          </div>

          <div className={styles.feedbackSection}>
            <div className={styles.feedbackPrompt}>Was this peer connection helpful?</div>
            <div className={styles.feedbackBtns}>
              <button 
                className={`brut-btn lg ${styles.helpfulBtn}`}
                onClick={() => setFeedback("helpful")}
              >
                👍 HELPFUL
              </button>
              <button 
                className={`brut-btn ${styles.notHelpfulBtn}`}
                onClick={() => setFeedback("not-helpful")}
              >
                👎 NOT HELPFUL
              </button>
            </div>
          </div>

          <div className={styles.noteSection}>
            <div className={styles.noteLabel}>Private Note (Optional):</div>
            <textarea 
              className={styles.noteInput}
              placeholder="What was the key takeaway from this conversation?"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
