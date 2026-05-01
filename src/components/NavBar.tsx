"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

const tools = [
  { label: "Cognitive Shield", href: "/cognitive-shield" },
  { label: "Disconnect Mode", href: "/disconnect-mode" },
  { label: "FounderWalk", href: "/founder-walk" },
];

export default function NavBar() {
  const path = usePathname();
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        FOUNDER<span className={styles.logoAccent}>OS</span>
      </Link>
      <div className={styles.links}>
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`${styles.link} ${path.startsWith(t.href) ? styles.active : ""}`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <Link href="/cognitive-shield" className={`brut-btn accent ${styles.ctaBtn}`}>
        Launch App →
      </Link>
    </nav>
  );
}
