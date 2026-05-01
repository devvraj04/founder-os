"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { SiGmail, SiSlack, SiHubspot, SiNotion, SiZapier, SiCalendly } from "react-icons/si";
import styles from "./page.module.css";

const BUCKETS = [
  { id: "email", label: "📧 Email Triage", desc: "Low-priority emails, newsletter queries, vendor follow-ups", color: "#FFFF00" },
  { id: "calendar", label: "📅 Calendar Management", desc: "Meeting rescheduling, conflict resolution, RSVPs", color: "#fff" },
  { id: "crm", label: "📊 CRM Updates", desc: "Pipeline stage changes, lead scoring, contact updates", color: "#FFFF00" },
  { id: "slack", label: "💬 Slack Routing", desc: "Internal message routing, channel management, @mentions", color: "#fff" },
  { id: "billing", label: "💳 Billing & Invoices", desc: "Routine invoice approvals under $500, subscription renewals", color: "#FFFF00" },
  { id: "support", label: "🎧 Support Tickets", desc: "Tier-1 support categorization and routing to team", color: "#fff" },
];

const MEMBERS = [
  { id: "sales", role: "Head of Sales", name: "Priya Mehta", email: "priya@yourco.com", avatar: "PM" },
  { id: "dev", role: "Lead Developer", name: "Alex Kowalski", email: "alex@yourco.com", avatar: "AK" },
  { id: "ops", role: "Operations Manager", name: "Jordan Lee", email: "jordan@yourco.com", avatar: "JL" },
  { id: "marketing", role: "Head of Marketing", name: "Simone Duval", email: "simone@yourco.com", avatar: "SD" },
  { id: "cos", role: "Chief of Staff", name: "Rahul Sinha", email: "rahul@yourco.com", avatar: "RS" },
];

const INTEGRATIONS = [
  { name: "Gmail", status: "CONNECTED", icon: <SiGmail color="#EA4335" /> },
  { name: "Slack", status: "CONNECTED", icon: <SiSlack color="#4A154B" /> },
  { name: "HubSpot CRM", status: "CONNECTED", icon: <SiHubspot color="#FF7A59" /> },
  { name: "Notion", status: "CONNECTED", icon: <SiNotion color="#000000" /> },
  { name: "Zapier", status: "ACTIVE", icon: <SiZapier color="#FF4A00" /> },
  { name: "Calendly", status: "CONNECTED", icon: <SiCalendly color="#006BFF" /> },
];

export default function DelegationPage() {
  const [mappings, setMappings] = useState<Record<string, string>>({
    email: "cos",
    calendar: "cos",
    crm: "sales",
    slack: "ops",
  });
  const [saved, setSaved] = useState(false);

  const handleMap = (bucketId: string, memberId: string) => {
    setMappings((prev) => ({ ...prev, [bucketId]: memberId }));
    setSaved(false);
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div className={styles.page}>
      <NavBar />
      <header className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>
            <Link href="/cognitive-shield">← Cognitive Shield</Link> / Delegation Engine
          </div>
          <h1 className={styles.title}>DELEGATION ENGINE</h1>
          <p className={styles.subtitle}>Map AI decision buckets to your team members — set it once, let it run.</p>
        </div>
        <button
          className={`brut-btn ${saved ? "" : "accent"} ${styles.saveBtn}`}
          onClick={handleSave}
        >
          {saved ? "✓ ROUTING RULES SAVED" : "SAVE ROUTING RULES"}
        </button>
      </header>

      <div className={styles.grid}>
        {/* LEFT — INTEGRATIONS */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>CONNECTED INTEGRATIONS</div>
          <div className={styles.integrations}>
            {INTEGRATIONS.map((int) => (
              <div key={int.name} className={styles.integrationRow}>
                <div className={styles.integrationIcon}>{int.icon}</div>
                <div className={styles.integrationInfo}>
                  <div className={styles.integrationName}>{int.name}</div>
                  <div className={styles.integrationStatus}>● {int.status}</div>
                </div>
                <button className="brut-btn sm">Configure</button>
              </div>
            ))}
            <button className="brut-btn accent" style={{ width: "100%", marginTop: 8 }}>
              + Add Integration
            </button>
          </div>
        </div>

        {/* CENTER — MAPPING BOARD */}
        <div className={styles.mappingPanel}>
          <div className={styles.panelHeader}>AI DECISION BUCKET → TEAM MEMBER MAPPING</div>
          <div className={styles.mappingNote}>
            Select a team member for each AI decision bucket. The routing engine will automatically forward tasks when the AI categorizes them.
          </div>
          <div className={styles.mappings}>
            {BUCKETS.map((bucket) => (
              <div key={bucket.id} className={styles.mappingRow} style={{ background: bucket.color }}>
                <div className={styles.bucketInfo}>
                  <div className={styles.bucketLabel}>{bucket.label}</div>
                  <div className={styles.bucketDesc}>{bucket.desc}</div>
                </div>
                <div className={styles.mappingArrow}>→</div>
                <div className={styles.memberSelect}>
                  <select
                    className={styles.select}
                    value={mappings[bucket.id] || ""}
                    onChange={(e) => handleMap(bucket.id, e.target.value)}
                  >
                    <option value="">-- Assign Member --</option>
                    {MEMBERS.map((m) => (
                      <option key={m.id} value={m.id}>{m.role} ({m.name})</option>
                    ))}
                  </select>
                  {mappings[bucket.id] && (
                    <div className={styles.assignedBadge}>
                      ✓ {MEMBERS.find(m => m.id === mappings[bucket.id])?.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — TEAM DIRECTORY */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>TEAM DIRECTORY</div>
          <div className={styles.members}>
            {MEMBERS.map((m) => (
              <div key={m.id} className={styles.memberCard}>
                <div className={styles.memberAvatar}>{m.avatar}</div>
                <div className={styles.memberInfo}>
                  <div className={styles.memberName}>{m.name}</div>
                  <div className={styles.memberRole}>{m.role}</div>
                  <div className={styles.memberEmail}>{m.email}</div>
                </div>
                <div className={styles.memberLoad}>
                  {Object.values(mappings).filter(v => v === m.id).length} buckets
                </div>
              </div>
            ))}
            <button className="brut-btn" style={{ width: "100%", marginTop: 8 }}>
              + Add Team Member
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomStat}>
          <span className={styles.bottomNum}>{Object.keys(mappings).length}</span>
          <span className={styles.bottomLabel}>Buckets Mapped</span>
        </div>
        <div className={styles.bottomStat}>
          <span className={styles.bottomNum}>{new Set(Object.values(mappings)).size}</span>
          <span className={styles.bottomLabel}>Team Members Active</span>
        </div>
        <div className={styles.bottomStat}>
          <span className={styles.bottomNum}>{INTEGRATIONS.length}</span>
          <span className={styles.bottomLabel}>Integrations Live</span>
        </div>
        <div className={styles.bottomNote}>
          Zero Trust Architecture Active — All routing encrypted via OAuth 3.0
        </div>
      </div>
    </div>
  );
}
