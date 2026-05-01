"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";

const THRESHOLDS = [
  { id: "financial", label: "Financial Threshold", desc: "Auto-approve invoices below this amount", unit: "$", value: 500, max: 5000 },
  { id: "risk", label: "Risk Score Cutoff", desc: "AI handles decisions below this risk score", unit: "/100", value: 30, max: 100 },
  { id: "quarantine", label: "Quarantine Window", desc: "Hours before AI actions are executed", unit: "hrs", value: 12, max: 48 },
];

const API_LOGS = [
  { time: "12:34:01", method: "POST", endpoint: "/api/triage/email", status: 200, latency: "84ms" },
  { time: "12:33:58", method: "GET", endpoint: "/api/queue/status", status: 200, latency: "21ms" },
  { time: "12:33:44", method: "POST", endpoint: "/api/delegate/route", status: 200, latency: "112ms" },
  { time: "12:33:30", method: "POST", endpoint: "/api/triage/slack", status: 200, latency: "67ms" },
  { time: "12:33:12", method: "GET", endpoint: "/api/auth/verify", status: 200, latency: "18ms" },
  { time: "12:32:58", method: "POST", endpoint: "/api/triage/calendar", status: 200, latency: "93ms" },
  { time: "12:32:41", method: "POST", endpoint: "/api/ai/classify", status: 200, latency: "341ms" },
  { time: "12:31:05", method: "POST", endpoint: "/api/triage/email", status: 429, latency: "—" },
];

export default function SecurityPage() {
  const [thresholds, setThresholds] = useState<Record<string, number>>(
    Object.fromEntries(THRESHOLDS.map(t => [t.id, t.value]))
  );
  const [prompt, setPrompt] = useState(
    `You are the Cognitive Shield AI triage engine.\n\nYour role is to classify inbound founder communications into:\n1. DELEGATE — Low stakes, can be handled by team\n2. AUTOMATE — Routine, algorithmic response sufficient\n3. FOUNDER_REQUIRED — High impact, requires executive judgment\n\nClassify as FOUNDER_REQUIRED if:\n- Financial commitment > \\$\{{financial_threshold}}\n- Risk score > {{risk_threshold}}/100\n- Legal implications present\n- Co-founder or equity matters\n- Series-level fundraising communication\n\nNever hallucinate. When uncertain, escalate to FOUNDER_REQUIRED.`
  );
  const [saved, setSaved] = useState(false);

  return (
    <div className={styles.page}>
      <NavBar />
      <header className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>
            <Link href="/cognitive-shield">← Cognitive Shield</Link> / Security & Logic
          </div>
          <h1 className={styles.title}>SYSTEM LOGIC & SECURITY</h1>
          <p className={styles.subtitle}>Configure AI decision parameters, refine LLM prompts, and monitor API security logs.</p>
        </div>
        <div className={styles.securityBadge}>
          <span className={styles.secBadgeIcon}>🔒</span>
          <div>
            <div className={styles.secBadgeTitle}>ZERO TRUST ACTIVE</div>
            <div className={styles.secBadgeSub}>OAuth 3.0 · AES-256 · Tokenized</div>
          </div>
        </div>
      </header>

      <div className={styles.grid}>
        {/* LLM PROMPT EDITOR */}
        <div className={styles.promptPanel}>
          <div className={styles.panelHeader}>LLM SYSTEM PROMPT EDITOR
            <span className={styles.panelBadge}>GPT-4o + XGBoost Hybrid</span>
          </div>
          <div className={styles.promptNote}>
            This prompt governs how the AI classifies every inbound decision. Modify with extreme caution — changes take effect on next cycle.
          </div>
          <textarea
            className={styles.promptEditor}
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); setSaved(false); }}
            spellCheck={false}
          />
          <div className={styles.promptActions}>
            <button className="brut-btn accent" onClick={() => setSaved(true)}>
              {saved ? "✓ PROMPT SAVED" : "DEPLOY PROMPT"}
            </button>
            <button className="brut-btn sm">Reset to Default</button>
            <button className="brut-btn sm">Test Prompt</button>
          </div>
        </div>

        {/* RIGHT PANELS */}
        <div className={styles.rightPanels}>
          {/* THRESHOLDS */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>CLASSIFICATION THRESHOLDS</div>
            <div className={styles.thresholdList}>
              {THRESHOLDS.map((t) => (
                <div key={t.id} className={styles.thresholdItem}>
                  <div className={styles.thresholdLabel}>{t.label}</div>
                  <div className={styles.thresholdDesc}>{t.desc}</div>
                  <div className={styles.thresholdControl}>
                    <input
                      type="range"
                      min={0} max={t.max}
                      value={thresholds[t.id]}
                      onChange={(e) => setThresholds(p => ({ ...p, [t.id]: Number(e.target.value) }))}
                      className={styles.slider}
                    />
                    <div className={styles.thresholdValue}>
                      {t.id === "financial" ? "$" : ""}{thresholds[t.id]}{t.id !== "financial" ? t.unit : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AUTH STATUS */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>OAUTH & SECURITY STATUS</div>
            <div className={styles.authList}>
              {[
                { name: "Gmail OAuth 3.0", status: "VALID", exp: "Expires: May 30, 2026" },
                { name: "Slack Bot Token", status: "VALID", exp: "Non-expiring" },
                { name: "HubSpot API Key", status: "VALID", exp: "Expires: Jun 15, 2026" },
                { name: "Zapier Webhook", status: "ACTIVE", exp: "Live — 0ms latency" },
              ].map((auth) => (
                <div key={auth.name} className={styles.authRow}>
                  <div className={styles.authName}>{auth.name}</div>
                  <div className={styles.authExp}>{auth.exp}</div>
                  <span className="brut-badge green">{auth.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* API LOG TABLE */}
      <div className={styles.logSection}>
        <div className={styles.panelHeader}>LIVE API SECURITY LOG</div>
        <table className="brut-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Status</th>
              <th>Latency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {API_LOGS.map((log, i) => (
              <tr key={i}>
                <td><code>{log.time}</code></td>
                <td><span className={styles.method}>{log.method}</span></td>
                <td><code>{log.endpoint}</code></td>
                <td>
                  <span className={`brut-badge ${log.status === 200 ? "green" : "red"}`}>{log.status}</span>
                </td>
                <td>{log.latency}</td>
                <td><button className="brut-btn sm">Inspect</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
