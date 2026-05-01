"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";

const QUEUE = [
  {
    id: 1, title: "Newsletter unsubscribe confirmation — TechLead Weekly",
    to: "subscriber@newsletter.com", type: "EMAIL",
    draft: `Subject: Unsubscribe Confirmed\n\nHi,\n\nYou have been successfully removed from our mailing list. No further emails will be sent.\n\nBest regards,\nCognitive Shield (on behalf of [Founder])`,
    timeLeft: "10h 22m", risk: "LOW",
  },
  {
    id: 2, title: "SLA uptime report dispatched to Enterprise Client #204",
    to: "ops@enterprise-client.com", type: "EMAIL",
    draft: `Subject: Monthly Uptime Report — April 2026\n\nDear Operations Team,\n\nPlease find your April 2026 uptime report:\n• System Uptime: 99.97%\n• Incidents: 0 P1, 1 P3 (resolved)\n• Next report: June 1, 2026\n\nBest,\nCognitive Shield (on behalf of [Founder])`,
    timeLeft: "09h 58m", risk: "LOW",
  },
  {
    id: 3, title: "Meeting rescheduled — Q2 Board Review",
    to: "board@yourco.com", type: "CALENDAR",
    draft: `Calendar Event: Q2 Board Review\nOriginal: May 5, 2026 @ 10:00 AM\nRescheduled: May 7, 2026 @ 2:00 PM\n\nConflict resolved automatically. All parties notified.`,
    timeLeft: "11h 05m", risk: "LOW",
  },
  {
    id: 4, title: "Tier-1 support ticket #4821 routed to Simone Duval",
    to: "simone@yourco.com", type: "SLACK",
    draft: `[Slack DM to @simone]\n\nHi Simone, a Tier-1 support ticket has been assigned to you:\n\nTicket #4821 — "Dashboard export not working"\nUser: customer@client.com\nPriority: Low\n\nPlease respond within 24 hours.`,
    timeLeft: "08h 44m", risk: "LOW",
  },
];

export default function QuarantinePage() {
  const [reversed, setReversed] = useState<number[]>([]);
  const [approved, setApproved] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const activeQueue = QUEUE.filter(q => !reversed.includes(q.id) && !approved.includes(q.id));

  return (
    <div className={styles.page}>
      <NavBar />
      <header className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>
            <Link href="/cognitive-shield">← Cognitive Shield</Link> / Quarantine Queue
          </div>
          <h1 className={styles.title}>12-HOUR QUARANTINE QUEUE</h1>
          <p className={styles.subtitle}>AI actions are held here before execution. Review, modify, or reverse — no action is irreversible.</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statBox}>
            <div className={styles.statN}>{activeQueue.length}</div>
            <div className={styles.statL}>Pending Review</div>
          </div>
          <div className={styles.statBox} style={{ background: "#ccffcc" }}>
            <div className={styles.statN}>{approved.length}</div>
            <div className={styles.statL}>Approved & Sent</div>
          </div>
          <div className={styles.statBox} style={{ background: "#ffcccc" }}>
            <div className={styles.statN}>{reversed.length}</div>
            <div className={styles.statL}>Reversed</div>
          </div>
        </div>
      </header>

      <div className={styles.quarantineNotice}>
        ⏱ ALL AI ACTIONS ARE QUARANTINED FOR 12 HOURS BEFORE EXECUTION. YOU HAVE FULL OVERRIDE AUTHORITY.
      </div>

      <div className={styles.queueList}>
        {activeQueue.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>✓</div>
            <div className={styles.emptyTitle}>Queue Cleared</div>
            <div className={styles.emptyDesc}>All pending AI actions have been reviewed. No items awaiting approval.</div>
          </div>
        )}
        {activeQueue.map((item) => (
          <div key={item.id} className={styles.queueItem}>
            <div className={styles.queueItemHeader} onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <div className={styles.queueMeta}>
                <span className={`brut-badge ${item.type === "EMAIL" ? "yellow" : ""}`}>{item.type}</span>
                <span className={`brut-badge ${item.risk === "LOW" ? "green" : "red"}`}>{item.risk} RISK</span>
                <span className={styles.queueTime}>⏱ {item.timeLeft} remaining</span>
              </div>
              <div className={styles.queueTitle}>{item.title}</div>
              <div className={styles.queueTo}>To: {item.to}</div>
              <button className={styles.expandBtn}>{expanded === item.id ? "▲ Collapse" : "▼ Review Draft"}</button>
            </div>

            {expanded === item.id && (
              <div className={styles.queueExpanded}>
                <div className={styles.draftLabel}>AI DRAFTED COMMUNICATION:</div>
                <pre className={`mono ${styles.draftText}`}>{item.draft}</pre>
                <div className={styles.queueActions}>
                  <button
                    className="brut-btn danger"
                    onClick={() => setReversed(p => [...p, item.id])}
                  >
                    [ REVERSE ACTION ]
                  </button>
                  <button
                    className="brut-btn accent"
                    onClick={() => setApproved(p => [...p, item.id])}
                  >
                    [ APPROVE & SEND NOW ]
                  </button>
                  <button className="brut-btn sm">Edit Draft</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {(reversed.length > 0 || approved.length > 0) && (
        <div className={styles.resolvedSection}>
          <div className={styles.resolvedTitle}>RESOLVED ITEMS</div>
          {QUEUE.filter(q => reversed.includes(q.id) || approved.includes(q.id)).map(q => (
            <div key={q.id} className={styles.resolvedItem}>
              <span className={reversed.includes(q.id) ? styles.resolvedReverse : styles.resolvedApprove}>
                {reversed.includes(q.id) ? "✕ REVERSED" : "✓ SENT"}
              </span>
              <span className={styles.resolvedName}>{q.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
