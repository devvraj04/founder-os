"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";

const STRESSORS = [
  "Cashflow Anxiety",
  "Series A Rejection",
  "Key Employee Resignation",
  "Co-founder Conflict",
  "Impostor Syndrome",
  "Failed Product Launch",
  "Team Morale Crisis",
  "Investor Ghosting",
  "Market Pivot Paralysis",
  "Burnout Peak",
  "Legal Dispute",
  "Personal Life Collapse",
];

export default function FounderWalkPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>FOUNDERWALK</h1>
          <p className={styles.subtitle}>You are not alone. Select your current, overwhelming stressor.</p>
        </div>

        <div className={styles.grid}>
          {STRESSORS.map(stressor => (
            <button
              key={stressor}
              className={`${styles.tag} ${selected === stressor ? styles.selected : ""}`}
              onClick={() => setSelected(stressor)}
            >
              {stressor}
            </button>
          ))}
        </div>

        <div className={styles.footer}>
          {selected ? (
            <Link href={`/founder-walk/matching?topic=${encodeURIComponent(selected)}`} className={`${styles.ctaBtn} brut-btn accent lg`}>
              FIND A 15-MIN PEER WALK NOW
            </Link>
          ) : (
            <button className={`${styles.ctaBtn} brut-btn lg`} disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
              SELECT A STRESSOR TO BEGIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
