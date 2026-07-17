"use client";

import { useEffect, useState } from "react";
import styles from "../access.module.css";

type Session = {
  authenticated: boolean;
  provisioned?: boolean;
  email?: string;
  name?: string;
};

export default function ZugangPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadSession() {
    const response = await fetch("/api/session", { cache: "no-store" });
    setSession(await response.json());
  }

  useEffect(() => {
    loadSession().catch(() => setSession({ authenticated: false }));
  }, []);

  async function activateAdmin() {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/bootstrap", { method: "POST" });
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      await loadSession();
      setMessage("Der Hauptzugang wurde sicher aktiviert.");
    } else {
      setMessage(body.error === "not_authorized" ? "Diese Adresse ist nicht für die Ersteinrichtung freigegeben." : "Die Aktivierung konnte noch nicht abgeschlossen werden.");
    }
    setBusy(false);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Wippermann Software · Geschützter Zugang</p>
        <h1 className={styles.title}>Sicher anmelden.</h1>
        <p className={styles.intro}>
          Der Zugang ist personenbezogen. Firmen, Funktionen und Daten werden erst nach einer Freigabe sichtbar.
        </p>

        {!session && <div className={styles.notice}>Zugang wird geprüft …</div>}

        {session?.authenticated === false && (
          <>
            <div className={styles.notice}>Noch nicht angemeldet.</div>
            <div className={styles.actions}>
              <a className={styles.primary} href="/signin-with-chatgpt?return_to=/zugang">Sicher anmelden</a>
              <a className={styles.secondary} href="/">Zur öffentlichen Startseite</a>
            </div>
          </>
        )}

        {session?.authenticated && session.provisioned && (
          <>
            <div className={styles.success}>Willkommen{session.name ? `, ${session.name}` : ""}. Dein Zugang ist freigeschaltet.</div>
            <div className={styles.actions}>
              <a className={styles.primary} href="/intern">Arbeitsbereich öffnen</a>
              <a className={styles.secondary} href="/signout-with-chatgpt">Abmelden</a>
            </div>
          </>
        )}

        {session?.authenticated && !session.provisioned && (
          <>
            <div className={styles.notice}>
              Angemeldet als <strong>{session.email}</strong>. Es liegt noch keine Firmenfreigabe vor.
            </div>
            {message && <div className={message.includes("aktiviert") ? styles.success : styles.error}>{message}</div>}
            <div className={styles.actions}>
              <button className={styles.primary} disabled={busy} onClick={activateAdmin}>
                {busy ? "Wird geprüft …" : "Hauptzugang aktivieren"}
              </button>
              <a className={styles.secondary} href="/signout-with-chatgpt">Andere Adresse verwenden</a>
            </div>
          </>
        )}

        <p className={styles.meta}>
          Die Anmeldung und Mehrfaktor-Absicherung werden von der Hosting-Plattform geschützt. Berechtigungen werden zusätzlich serverseitig je Firma geprüft.
        </p>
      </section>
    </main>
  );
}
