"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

const TICKER_ITEMS = [
  "72% OF FOUNDERS REPORT BURNOUT",
  "11,000+ STARTUPS SHUT DOWN IN 2025",
  "VC FUNDING DROPPED 17% YOY",
  "SEED FUNDING CONTRACTED BY 30%",
  "ONLY 7% OF STARTUPS HAVE MENTAL HEALTH POLICIES",
  "56% OF FOUNDERS RECEIVE ZERO INVESTOR SUPPORT",
  "ENTREPRENEURS ARE 30% MORE LIKELY TO EXPERIENCE DEPRESSION",
  "FOUNDERS AVERAGE FEWER THAN 4 DAYS OFF IN 14 MONTHS",
];

const PHASES = ["EMPATHIZE", "DEFINE", "IDEATE", "PROTOTYPE", "TEST"];

const EMPATHY_MAP = [
  {
    quad: "SEE",
    color: "#fff",
    items: [
      "Diminishing runway charts & constrained cash flow",
      "Competitors announcing sudden pivots or shutdowns",
      "Continuous notifications across Slack, Email, CRM",
      "High CAC dashboards & lengthening B2B sales cycles",
    ],
  },
  {
    quad: "HEAR",
    color: "#FFFF00",
    items: [
      "VCs demanding accelerated path to profitability",
      "Team expressing anxiety over job security",
      "Social media glorifying 'hustle culture'",
      "'Just work harder — you can rest when stable'",
    ],
  },
  {
    quad: "DO",
    color: "#fff",
    items: [
      "Work continuously without temporal boundaries",
      "Skip exercise & family to handle 'emergencies'",
      "Micromanage every client & vendor relationship",
      "Fail to take vacations — <4 days off in 14 months",
    ],
  },
  {
    quad: "THINK & FEEL",
    color: "#000",
    textColor: "#fff",
    items: [
      "Profound isolation & crushing sole responsibility",
      "Pervasive impostor syndrome & economic fear",
      "Belief that delegation = compromised quality",
      "Decision fatigue → mental paralysis on critical choices",
    ],
  },
];

const HMW = [
  {
    num: "HMW 01",
    q: "How might we help founders enforce genuine, uninterrupted periods of operational disconnection without inducing secondary anxiety?",
    tool: "Disconnect Mode",
    href: "/disconnect-mode",
  },
  {
    num: "HMW 02",
    q: "How might we lower the perceived operational risk of delegation so founders feel comfortable transferring control?",
    tool: "Cognitive Shield",
    href: "/cognitive-shield",
  },
  {
    num: "HMW 03",
    q: "How might we intercept, filter, and autonomously triage incoming micro-decisions to protect the founder's psychological capital?",
    tool: "Cognitive Shield",
    href: "/cognitive-shield",
  },
  {
    num: "HMW 04",
    q: "How might we foster asynchronous, high-trust peer support networks that normalize vulnerability?",
    tool: "FounderWalk",
    href: "/founder-walk",
  },
  {
    num: "HMW 05",
    q: "How might we redesign the daily flow of information so a founder only encounters data requiring human-level judgment?",
    tool: "Cognitive Shield",
    href: "/cognitive-shield",
  },
];

const SOLUTIONS = [
  {
    id: "01",
    name: "THE COGNITIVE SHIELD",
    sub: "AI Triage Protocol",
    desc: "An intelligent, API-driven routing system that intercepts all inbound communications and pending decisions, categorizes them by existential risk level, and autonomously delegates or defers — keeping only 2 items in the Founder's queue.",
    hmw: "HMW 03 — Intercept & triage micro-decisions",
    href: "/cognitive-shield",
    pages: ["Kanban Dashboard", "Delegation Engine", "Quarantine Queue", "Security Layer"],
    accent: "#FFFF00",
  },
  {
    id: "02",
    name: "FOUNDER DISCONNECT MODE",
    sub: "The Proxy Wall",
    desc: "A systemic interface overlay that temporarily overrides standard smartphone functions, blocking all business data except those using a high-friction emergency bypass protocol — protecting the founder's recovery time with unyielding software.",
    hmw: "HMW 01 — Enforce genuine disconnection",
    href: "/disconnect-mode",
    pages: ["Lock Screen", "Friction Form", "Proxy Config", "Breach Log"],
    accent: "#fff",
  },
  {
    id: "03",
    name: "FOUNDERWALK",
    sub: "Micro-Resilience Network",
    desc: "An asynchronous matching algorithm connecting founders on specific real-time stress profiles for strictly time-boxed, 15-minute anonymous audio walks — removing scheduling friction and eliminating the illusion of isolated suffering.",
    hmw: "HMW 04 — Normalize vulnerability without time burden",
    href: "/founder-walk",
    pages: ["Stressor Grid", "Matching Rules", "Active Walk", "Post-Call Reflection"],
    accent: "#FFFF00",
  },
];

const STATS = [
  { n: "72%", label: "Founders report significant burnout" },
  { n: "11K+", label: "Startups shut down in 2025" },
  { n: "30%", label: "Increase in startup closures YoY" },
  { n: "−17%", label: "Total VC investment YoY" },
  { n: "7%", label: "Startups with mental health policies" },
  { n: "49%", label: "Founders with persistent mental conditions" },
];

export default function HomePage() {
  const [tickerOffset, setTickerOffset] = useState(0);

  return (
    <main className={styles.main}>
      {/* ─── NAV ─── */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          FOUNDER<span className={styles.navAccent}>OS</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/cognitive-shield" className={styles.navLink}>Cognitive Shield</Link>
          <Link href="/disconnect-mode" className={styles.navLink}>Disconnect Mode</Link>
          <Link href="/founder-walk" className={styles.navLink}>FounderWalk</Link>
        </div>
        <Link href="/cognitive-shield" className={`${styles.navCta} brut-btn accent`}>
          Launch App →
        </Link>
      </nav>

      {/* ─── TICKER ─── */}
      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item} <span className={styles.tickerSep}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>
            <span className="brut-badge yellow">Design Thinking Research — 2025/2026</span>
          </div>
          <h1 className={styles.heroTitle}>
            YOUR<br />
            <span className={styles.heroTitleAccent}>COGNITIVE</span><br />
            OPERATING<br />
            SYSTEM
          </h1>
          <p className={styles.heroSub}>
            The entrepreneurial landscape of 2025 has been defined by one hidden crisis: the rapid, unmitigated depletion of the founder's psychological capital. FounderOS is the human-centered operating layer your mind has been missing.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/cognitive-shield" className="brut-btn accent lg">
              Cognitive Shield →
            </Link>
            <Link href="/disconnect-mode" className="brut-btn lg">
              Disconnect Mode →
            </Link>
            <Link href="/founder-walk" className="brut-btn lg">
              FounderWalk →
            </Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroStats}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.heroStatCard}>
                <div className={styles.heroStatNum}>{s.n}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DESIGN THINKING PHASE BAR ─── */}
      <div className={styles.phaseBar}>
        {PHASES.map((p, i) => (
          <div key={p} className={styles.phaseItem}>
            <div className={styles.phaseNum}>0{i + 1}</div>
            <div className={styles.phaseName}>{p}</div>
          </div>
        ))}
      </div>

      {/* ─── POV SECTION ─── */}
      <section className={styles.povSection}>
        <div className={styles.povLabel}>STRONG POINT OF VIEW STATEMENT</div>
        <blockquote className={styles.povQuote}>
          "An early-stage startup founder needs a reliable, fail-safe mechanism to establish non-negotiable temporal boundaries and safely delegate daily micro-operations — because their compulsion for constant connectivity and profound fear of losing control lead to severe decision fatigue, which ultimately jeopardizes both their psychological well-being and the company's long-term survival."
        </blockquote>
      </section>

      {/* ─── EMPATHY MAP ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Phase 01 — Empathize</span>
          <h2 className={styles.sectionTitle}>THE FOUNDER EMPATHY MAP</h2>
        </div>
        <div className={styles.empathyGrid}>
          {EMPATHY_MAP.map((quad) => (
            <div
              key={quad.quad}
              className={styles.empathyCard}
              style={{
                background: quad.color,
                color: quad.textColor ?? "#000",
              }}
            >
              <div className={styles.empathyQuad}>{quad.quad}</div>
              <ul className={styles.empathyList}>
                {quad.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PAINS & GAINS ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Phase 01 — Empathize</span>
          <h2 className={styles.sectionTitle}>STRUCTURAL PAINS & TARGETED GAINS</h2>
        </div>
        <div className={styles.painsGainsGrid}>
          <div className={styles.painsCard}>
            <div className={styles.painsTitle}>⚡ STRUCTURAL PAINS</div>
            {[
              { title: "Cognitive & Strategic Overload", desc: "The sheer volume of daily micro-decisions severely depletes psychological capital required for deep strategic thinking." },
              { title: "Systemic Erosion of Trust", desc: "Paralyzing fear of delegating critical tasks — often stemming from previous traumatic business experiences." },
              { title: "Chronic Unmanaged Burnout", desc: "Compounding exhaustion from inability to disconnect from digital business infrastructure." },
              { title: "The Vulnerability Stigma", desc: "Hesitancy to seek mental health support due to fear that vulnerability will alienate investors and demoralize team." },
            ].map((p, i) => (
              <div key={i} className={styles.painItem}>
                <div className={styles.painItemTitle}>{p.title}</div>
                <div className={styles.painItemDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.gainsCard}>
            <div className={styles.gainsTitle}>✦ TARGETED GAINS</div>
            {[
              { title: "Sustainable Cognitive Performance", desc: "Maintain high-level cognitive function without sacrificing personal health or interpersonal relationships." },
              { title: "Scalable Trust-Based Operations", desc: "Robust delegation frameworks allowing the founder to step away without the business grinding to a halt." },
              { title: "Validated Peer Integration", desc: "Connecting seamlessly with founders at similar scale to normalize struggles and share coping mechanisms." },
              { title: "Clarity of Strategic Focus", desc: "Reclaiming mental capacity to focus on core Jobs-To-Be-Done — shifting from execution to market positioning." },
            ].map((g, i) => (
              <div key={i} className={styles.gainItem}>
                <div className={styles.gainItemTitle}>{g.title}</div>
                <div className={styles.gainItemDesc}>{g.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HMW QUESTIONS ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Phase 02 — Define</span>
          <h2 className={styles.sectionTitle}>HOW MIGHT WE QUESTIONS</h2>
        </div>
        <div className={styles.hmwList}>
          {HMW.map((h) => (
            <Link key={h.num} href={h.href} className={styles.hmwCard}>
              <div className={styles.hmwNum}>{h.num}</div>
              <div className={styles.hmwQ}>{h.q}</div>
              <div className={styles.hmwTool}>→ Answered by: {h.tool}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── THREE SOLUTIONS ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Phase 03–04 — Ideate & Prototype</span>
          <h2 className={styles.sectionTitle}>THREE ARCHITECTURAL SOLUTIONS</h2>
          <p className={styles.sectionDesc}>
            From 40+ divergent concepts across multiple brainstorming sprints, filtered through Desirability, Feasibility, Viability, and Alignment criteria.
          </p>
        </div>
        <div className={styles.solutionsGrid}>
          {SOLUTIONS.map((s) => (
            <Link key={s.id} href={s.href} className={styles.solutionCard}>
              <div className={styles.solutionId}>{s.id}</div>
              <div className={styles.solutionName} style={{ background: s.accent }}>{s.name}</div>
              <div className={styles.solutionSub}>{s.sub}</div>
              <p className={styles.solutionDesc}>{s.desc}</p>
              <div className={styles.solutionHmw}>↳ {s.hmw}</div>
              <div className={styles.solutionPages}>
                {s.pages.map((pg) => (
                  <span key={pg} className="brut-badge">{pg}</span>
                ))}
              </div>
              <div className={styles.solutionCta}>OPEN PROTOTYPE →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── TEST FINDINGS ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Phase 05 — Test</span>
          <h2 className={styles.sectionTitle}>PEER TESTING FINDINGS & ITERATIONS</h2>
        </div>
        <div className={styles.testGrid}>
          {[
            {
              sol: "Cognitive Shield",
              finding: "Founders exhibited visible anxiety about AI errors in client communication — the 'AI Auto-Resolved' column induced monitoring anxiety rather than relief.",
              iteration: "Introduced a 12-Hour Quarantine Queue (Undo Window). AI actions are held for review before execution — shifting emotional response from anxiety to sustainable relief.",
            },
            {
              sol: "Disconnect Mode",
              finding: "The friction form only blocked internal team interruptions. High-value clients bypass internal routing entirely via direct contact.",
              iteration: "Added sophisticated auto-responder integration for external clients. System intercepts messages, establishes unavailability, and reroutes with full context to a designated proxy executive.",
            },
            {
              sol: "FounderWalk",
              finding: "The 15-minute countdown timer induced rushed anxiety. Watching seconds tick down defeated the restorative purpose — making it feel like another corporate meeting.",
              iteration: "Numerical countdown removed entirely. Replaced with a slow-filling abstract progress circle + organic chime at 14 minutes for a graceful, natural wrap-up.",
            },
          ].map((t, i) => (
            <div key={i} className={styles.testCard}>
              <div className={styles.testSol}>{t.sol}</div>
              <div className={styles.testLabel}>🔍 Observational Finding</div>
              <p className={styles.testText}>{t.finding}</p>
              <div className={styles.testLabel} style={{ color: "#006600" }}>✓ Iterative Refinement</div>
              <p className={styles.testText}>{t.iteration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className={styles.ctaBand}>
        <div className={styles.ctaBandInner}>
          <h2 className={styles.ctaBandTitle}>STOP TREATING OVERWORK AS DEDICATION.</h2>
          <p className={styles.ctaBandSub}>Your cognitive bandwidth is your company's most critical — and most fragile — resource.</p>
          <div className={styles.ctaBandBtns}>
            <Link href="/cognitive-shield" className="brut-btn accent lg">Cognitive Shield</Link>
            <Link href="/disconnect-mode" className="brut-btn lg">Disconnect Mode</Link>
            <Link href="/founder-walk" className="brut-btn lg">FounderWalk</Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerPhases}>
          {PHASES.map((p, i) => (
            <span key={p}>
              {p}{i < PHASES.length - 1 && <span className={styles.footerArrow}> → </span>}
            </span>
          ))}
        </div>
        <div className={styles.footerText}>
          FounderOS — Built on Design Thinking Research. Addressing Entrepreneurial Burnout & Decision Fatigue Through Human-Centered Design.
        </div>
        <div className={styles.footerCopy}>© 2026 FounderOS. All rights reserved.</div>
      </footer>
    </main>
  );
}
