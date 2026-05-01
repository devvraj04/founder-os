"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";

const DELEGATE_CARDS = [
  { id: 1, title: "Approve DocuSign for SaaS subscription renewal", from: "accounts@vendor.io", time: "9:12 AM", priority: "LOW" },
  { id: 2, title: "Reply to vendor invoice query — Q2 shortfall", from: "billing@supplier.co", time: "9:45 AM", priority: "MED" },
  { id: 3, title: "Schedule follow-up call with enterprise lead (MegaCorp)", from: "john@megacorp.com", time: "10:02 AM", priority: "LOW" },
  { id: 4, title: "Confirm catering order for team offsite", from: "ops@cateringco.com", time: "10:18 AM", priority: "LOW" },
  { id: 5, title: "Respond to intern onboarding logistics email", from: "hr@agency.com", time: "10:55 AM", priority: "LOW" },
];

const AI_CARDS = [
  { id: 6, title: "Newsletter unsubscribe request auto-processed", resolved: "AI drafted polite unsubscribe confirmation", time: "8:30 AM", undo: true },
  { id: 7, title: "Routine SLA status update sent to client #204", resolved: "AI compiled uptime metrics and dispatched report", time: "8:44 AM", undo: true },
  { id: 8, title: "Meeting rescheduled for conflicting calendar slot", resolved: "AI found next available slot and confirmed with all parties", time: "9:01 AM", undo: true },
  { id: 9, title: "Low-priority support ticket categorized & routed", resolved: "AI tagged 'Tier-1' and assigned to support rep", time: "9:30 AM", undo: true },
];

const FOUNDER_CARDS = [
  { id: 10, title: "Finalize Series A Term Sheet phrasing — legal review needed", from: "legal@vc-partners.com", time: "8:00 AM", priority: "CRITICAL" },
  { id: 11, title: "Approve co-founder equity amendment — 409A implications", from: "cfo@yourco.com", time: "8:22 AM", priority: "CRITICAL" },
];

const TEAM_ROLES = ["Head of Sales", "Lead Developer", "Operations Manager", "Head of Marketing", "Chief of Staff"];

export default function CognitiveShieldPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [delegated, setDelegated] = useState<Record<number, string>>({});
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [quarantineOpen, setQuarantineOpen] = useState(false);
  const [approvedCards, setApprovedCards] = useState<number[]>([]);
  const [founderAction, setFounderAction] = useState<Record<number, 'handled' | 'scheduled'>>({});

  const handleDelegate = (cardId: number, role: string) => {
    setDelegated((prev) => ({ ...prev, [cardId]: role }));
    setShowDropdown(null);
  };

  return (
    <div className={styles.page}>
      <NavBar />

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>COGNITIVE SHIELD</h1>
          <p className={styles.subtitle}>AI Triage Protocol — Decision Fatigue Eliminator</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statPill}>
            <span className={styles.statN}>847</span>
            <span className={styles.statL}>Decisions triaged today</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statN} style={{ background: "#FFFF00" }}>94%</span>
            <span className={styles.statL}>Auto-resolved by AI</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statN} style={{ background: "#FF2D2D", color: "#fff" }}>2</span>
            <span className={styles.statL}>Require your attention</span>
          </div>
        </div>
        <div className={styles.headerNav}>
          <Link href="/cognitive-shield/delegation" className="brut-btn sm">Delegation Engine</Link>
          <Link href="/cognitive-shield/quarantine" className="brut-btn sm">Quarantine Queue</Link>
          <Link href="/cognitive-shield/security" className="brut-btn sm">Security & Logic</Link>
        </div>
      </header>

      {/* KANBAN BOARD */}
      <div className={styles.kanban}>
        {/* COL 1 — DELEGATE TO TEAM */}
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>DELEGATE TO TEAM</div>
            <span className="brut-badge">{DELEGATE_CARDS.filter(c => !delegated[c.id]).length}</span>
          </div>
          <div className={styles.cards}>
            {DELEGATE_CARDS.map((card) => (
              <div
                key={card.id}
                className={`${styles.card} ${delegated[card.id] ? styles.cardDone : ""} ${hoveredCard === card.id ? styles.cardHovered : ""}`}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => { setHoveredCard(null); setShowDropdown(null); }}
              >
                <div className={styles.cardMeta}>
                  <span className={`brut-badge ${card.priority === "MED" ? "yellow" : ""}`}>{card.priority}</span>
                  <span className={styles.cardTime}>{card.time}</span>
                </div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardFrom}>From: {card.from}</div>
                {delegated[card.id] ? (
                  <div className={styles.delegatedBadge}>✓ Delegated to {delegated[card.id]}</div>
                ) : (
                  <div className={styles.cardActions}>
                    <button
                      className={`brut-btn accent ${styles.delegateBtn}`}
                      onClick={() => setShowDropdown(showDropdown === card.id ? null : card.id)}
                    >
                      [ ONE-CLICK DELEGATE ]
                    </button>
                    {showDropdown === card.id && (
                      <div className={styles.dropdown}>
                        {TEAM_ROLES.map((role) => (
                          <button
                            key={role}
                            className={styles.dropdownItem}
                            onClick={() => handleDelegate(card.id, role)}
                          >
                            → {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COL 2 — AI AUTO-RESOLVED */}
        <div className={`${styles.column} ${styles.colGrid}`}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>AI AUTO-RESOLVED</div>
            <span className="brut-badge yellow">12-HR QUARANTINE</span>
          </div>
          <div className={styles.cards}>
            {AI_CARDS.filter((c) => !approvedCards.includes(c.id)).map((card) => (
              <div key={card.id} className={`${styles.card} ${styles.aiCard}`}>
                <div className={styles.cardMeta}>
                  <span className="brut-badge green">AI HANDLED</span>
                  <span className={styles.cardTime}>{card.time}</span>
                </div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.aiResolved}>{card.resolved}</div>
                <button
                  className={`brut-btn sm ${styles.reviewBtn}`}
                  onClick={() => setQuarantineOpen(true)}
                >
                  Review in Queue →
                </button>
              </div>
            ))}
            <div className={styles.quarantineNote}>
              All AI actions are held for 12 hours before execution. Review, modify, or reverse in the Quarantine Queue.
            </div>
          </div>
        </div>

        {/* COL 3 — FOUNDER ACTION REQUIRED */}
        <div className={`${styles.column} ${styles.colYellow}`}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>FOUNDER ACTION REQUIRED</div>
            <span className="brut-badge red">{FOUNDER_CARDS.filter(c => !founderAction[c.id]).length}</span>
          </div>
          <div className={styles.cards}>
            {FOUNDER_CARDS.map((card) => (
              <div key={card.id} className={`${styles.card} ${styles.founderCard} ${founderAction[card.id] ? styles.cardDone : ""}`}>
                <div className={styles.cardMeta}>
                  <span className="brut-badge red">{card.priority}</span>
                  <span className={styles.cardTime}>{card.time}</span>
                </div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardFrom}>From: {card.from}</div>
                <div className={styles.founderActions}>
                  {founderAction[card.id] === 'handled' ? (
                    <div className={styles.delegatedBadge} style={{ background: "#FF2D2D", color: "#fff" }}>✓ RESOLVED</div>
                  ) : founderAction[card.id] === 'scheduled' ? (
                    <div className={styles.delegatedBadge}>📅 SCHEDULED FOR LATER</div>
                  ) : (
                    <>
                      <button className="brut-btn danger sm" onClick={() => setFounderAction(p => ({ ...p, [card.id]: 'handled' }))}>Handle Now</button>
                      <button className="brut-btn sm" onClick={() => setFounderAction(p => ({ ...p, [card.id]: 'scheduled' }))}>Schedule Later</button>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div className={styles.founderNote}>
              The Cognitive Shield has protected you from 845 decisions today. These 2 require your unique executive judgment.
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BANNER */}
      <div className={styles.bottomBanner}>
        ⚡ YOU SAVED 6.2 HOURS TODAY. YOUR TEAM HANDLED EVERYTHING ELSE. THE COGNITIVE SHIELD IS WORKING.
      </div>

      {/* QUARANTINE MODAL */}
      {quarantineOpen && (
        <div className={styles.modalOverlay} onClick={() => setQuarantineOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              12-HOUR QUARANTINE QUEUE
              <button className={styles.modalClose} onClick={() => setQuarantineOpen(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {AI_CARDS.map((card) => (
                <div key={card.id} className={styles.quarantineItem}>
                  <div className={styles.quarantineTime}>{card.time} — PENDING EXECUTION</div>
                  <div className={styles.quarantineTitle}>{card.title}</div>
                  <div className={`mono ${styles.quarantineDraft}`}>{card.resolved}</div>
                  <div className={styles.quarantineBtns}>
                    <button
                      className="brut-btn danger"
                      onClick={() => { setApprovedCards(p => [...p, card.id]); }}
                    >
                      [ REVERSE ACTION ]
                    </button>
                    <button
                      className="brut-btn accent"
                      onClick={() => { setApprovedCards(p => [...p, card.id]); }}
                    >
                      [ APPROVE & SEND NOW ]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
