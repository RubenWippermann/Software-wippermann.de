"use client";

import { useEffect, useState } from "react";
import styles from "../access.module.css";

type Session = { authenticated: boolean; email?: string };

export default function EinladungPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") ?? "");
    fetch("/api/session", { cache: "no-store" }).then((r) => r.json()).then(setSession).catch(() => setSession({ authenticated: false }));
  }, []);

  async function accept() {
    const response = await fetch("/api/invitations/accept", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      setAccepted(true);
      setMessage("Dein Firmenzugang wurde erfolgreich aktiviert.");
    } else {
      setMessage(body.error === "email_mismatch" ? "Bitte mit der E-Mail-Adresse anmelden, an die die Einladung gesendet wurde." : "Die Einladung ist ungültig oder bereits abgelaufen.");
    }
  }

  const returnTo = `/einladung?token=${encodeURIComponent(token)}`;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Wippermann Software · Einladung</p>
        <h1 className={styles.title}>Zugang aktivieren.</h1>
        <p className={styles.intro}>Die Einladung ist persönlich und kann nur mit der vorgesehenen E-Mail-Adresse angenommen werden.</p>
        {!token && <div className={styles.error}>Der Einladungslink ist unvollständig.</div>}
        {message && <div className={accepted ? styles.success : styles.error}>{message}</div>}
        {session?.authenticated === false && token && <div className={styles.actions}><a className={styles.primary} href={`/signin-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`}>Anmelden und fortfahren</a></div>}
        {session?.authenticated && token && !accepted && <><div className={styles.notice}>Angemeldet als <strong>{session.email}</strong></div><button className={styles.primary} onClick={accept}>Einladung annehmen</button></>}
        {accepted && <div className={styles.actions}><a className={styles.primary} href="/intern">Arbeitsbereich öffnen</a></div>}
      </section>
    </main>
  );
}
