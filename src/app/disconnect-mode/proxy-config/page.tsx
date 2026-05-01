"use client";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";

const VIP_CLIENTS = [
  { id: 1, name: "Enterprise Corp (Acct: EC-992)", phone: "+1 (555) 019-2834", proxy: "Head of Sales (Priya M.)", active: true },
  { id: 2, name: "Venture Partners (Lead Investor)", phone: "+1 (555) 012-9981", proxy: "Chief of Staff (Rahul S.)", active: true },
  { id: 3, name: "Cloud Hosting Support P1", phone: "+1 (800) 555-0001", proxy: "Lead Developer (Alex K.)", active: true },
  { id: 4, name: "Legal Counsel (Smith & Wesson)", phone: "+1 (555) 017-4422", proxy: "Operations (Jordan L.)", active: false },
];

export default function ProxyConfigPage() {
  const [vips, setVips] = useState(VIP_CLIENTS);
  
  const toggleVip = (id: number) => {
    setVips(vips.map(v => v.id === id ? { ...v, active: !v.active } : v));
  };

  return (
    <div className={styles.page}>
      <NavBar />
      <header className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>
            <Link href="/disconnect-mode">← Disconnect Mode</Link> / Proxy Configuration
          </div>
          <h1 className={styles.title}>PROXY ROUTING CONFIGURATION</h1>
          <p className={styles.subtitle}>Map external VIP contacts to internal team proxies. If they bypass the internal wall, the system handles them.</p>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.leftCol}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>VIP CLIENT DIRECTORY</div>
            <table className="brut-table">
              <thead>
                <tr>
                  <th>Client / Entity Name</th>
                  <th>Known Phone / Email</th>
                  <th>Internal Proxy Route</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vips.map(v => (
                  <tr key={v.id}>
                    <td><strong>{v.name}</strong></td>
                    <td><code style={{fontSize: 12}}>{v.phone}</code></td>
                    <td>{v.proxy}</td>
                    <td>
                      {v.active 
                        ? <span className="brut-badge green">ACTIVE</span>
                        : <span className="brut-badge">DISABLED</span>
                      }
                    </td>
                    <td>
                      <button 
                        className="brut-btn sm" 
                        onClick={() => toggleVip(v.id)}
                      >
                        {v.active ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.panelFooter}>
              <button className="brut-btn accent">+ Add New VIP Route</button>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>SYSTEM AUTO-RESPONDER</div>
            <div className={styles.responderBox}>
              <div className={styles.responderLabel}>When Disconnect Mode is ENGAGED, intercepted VIP messages receive this reply:</div>
              <textarea 
                className={styles.responderText} 
                defaultValue="Hello. The Founder is currently unavailable. This is an automated system response. Your issue has been logged and immediately forwarded to your designated account proxy, {{proxy_name}}, who will contact you shortly."
              />
              <button className="brut-btn sm" style={{width: '100%', marginTop: 16}}>Update Template</button>
            </div>
          </div>
          
          <div className={styles.noteBox}>
            <div className={styles.noteTitle}>HOW IT WORKS</div>
            <p>1. VIP calls/texts the Founder's direct number.</p>
            <p>2. OS-level hook intercepts the incoming connection.</p>
            <p>3. System silently rejects call and sends the Auto-Responder SMS.</p>
            <p>4. System forwards full context to the designated Internal Proxy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
