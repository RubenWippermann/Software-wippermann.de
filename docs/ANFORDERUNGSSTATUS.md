# Anforderungsstatus

Stand: 13. Juli 2026

Legende: **Demo** = sichtbar/interaktiv mit fiktiven Daten; **Teilweise** = Konzept oder Oberfläche vorhanden, aber ohne produktive Serverlogik; **Offen** = für den Echtbetrieb noch umzusetzen; **Extern** = Zugang/Vertrag/Freigabe eines Anbieters erforderlich.

## Plattform und Sicherheit

| Bereich | Status | Bewertung |
|---|---|---|
| Moderne deutsche Oberfläche, responsive für Mac/iPhone/Windows | Demo | Kernansichten sind vorhanden; vollständige Geräte- und Barrierefreiheitstests stehen aus. |
| Vier Firmenansichten mit eigenem Branding | Demo | Personal Paramedic, BWW, Euroblood und Ruben Wippermann sind sichtbar. |
| Strikte Mandantentrennung | Teilweise | Serverseitiges Mandanten-Datenmodell und zentrale Autorisierungsprüfung vorbereitet; produktive Auth-Anbindung und Sicherheitstests fehlen. |
| PP/BWW teilen Dozenten, sonst getrennt | Teilweise | Gemeinsames Dozentenprofil mit getrennten Firmenzuordnungen modelliert; produktive Workflows und Tests fehlen. |
| Rollen und Freigaben | Teilweise | Serverseitige Rollen- und Rechtematrix sowie Autorisierungshelfer vorbereitet; Sitzungs- und Laufzeitanbindung fehlt. |
| Login, Einladungen, Erstanmeldung, Onboarding | Offen | Benötigt Auth-Backend, sichere Sitzungen und Einladungsablauf. |
| 2FA/MFA inklusive SMS | Offen/Extern | Benötigt Auth- und SMS-Anbieter; SMS nicht als alleiniger Faktor. |
| Audit, ISO-9001-Nachvollziehbarkeit, Versionen | Teilweise | Audit-Datenmodell vorbereitet; technische Unveränderbarkeit, Aufbewahrung und produktive Protokollierung fehlen. |
| Eigene Cloud/Dokumentenablage | Teilweise | R2-Anbindung und Dokument-Metadaten vorbereitet; Bereitstellung, Verschlüsselung und Zugriffstests fehlen. |
| Datenschutz, Löschung, Backup, Notfallkonzept | Offen | Vor Echtdaten Pflicht. |

## Personal Paramedic und BWW – Bildung

| Bereich | Status | Bewertung |
|---|---|---|
| Kursstamm, offene Kurse, Inhouse-Kurse, individuelle Kursnummern | Demo | Interaktive Kursakten und Statusfarben vorhanden; Datenbank fehlt. |
| Kundendigitalstrecke Anfrage → Angebot → bestätigter Vertrag | Teilweise | Oberfläche/Workflow vorhanden; qualifizierte Signatur- und Beweisführung offen. |
| QSEH-Meldung und Registriernummer | Teilweise/Extern | Workflow sichtbar; API-Zugang, Testumgebung und produktive Implementierung fehlen. |
| DGUV 304-001/002/003 Regeln | Teilweise | Anforderungen erfasst; verbindliche Regelengine und Rechtsprüfung offen. |
| Dozentenstamm, Lehrberechtigungen, Zertifikate, Fristen | Demo | Oberfläche und Erinnerungen vorhanden; sichere Ablage/Validierung fehlt. |
| Kursausschreibung, Hotpreis, Gebote, manuelle Auswahl | Demo | Fachablauf dargestellt; Benachrichtigungen und Backend fehlen. |
| Qualifikations-, Preis- und Feedbackranking | Demo | Beispielbewertung vorhanden; echte Datenbasis/Algorithmus offen. |
| QR-Anmeldung, Anwesenheit Start/Ende, Unterschrift | Teilweise | Kursakte zeigt Ablauf; sichere Identität, Signatur und Offline-Fähigkeit fehlen. |
| Kursdokumentation, Hygiene, Materialstichproben, Fotos | Teilweise | PDF-Mustersatz und Oberfläche vorhanden; produktiver Formular-Editor fehlt. |
| Zertifikate, Prüfcode, Verifikationsseite, E-Mailversand | Teilweise | Muster vorhanden; Signierung, unveränderlicher Nachweis und öffentlicher Prüfdienst fehlen. |
| BG/UK-Abrechnung, UVT, 46,31 €, Formulare | Teilweise | Fachlogik erfasst; aktuelle Kostensätze müssen konfigurierbar sein, Lexware-Prozess offen. |
| Offene Kurse mit Stripe, Inhouse auf Rechnung | Offen/Extern | Stripe-Konto, Webhooks, Rückerstattungen, Steuer-/Buchungslogik fehlen. |
| Fahrschülermodus und Fahrschulbenachrichtigung | Teilweise | Anforderung erfasst; Einwilligung, Mailablauf und Partnerprogramm offen. |
| Kundenportal für Ersthelfer, Zertifikate, Fortbildungsfristen | Demo | Oberfläche konzipiert; echter Zugang und Datenschutz fehlen. |
| Schulsanitätsdienst | Demo/Teilweise | Bereich vorgesehen; vollständige Fachprozesse und Daten fehlen. |
| Sondervereinbarungen/Lizenzkurse externer Dozenten | Teilweise | Preise und Modell erfasst; Vertrags- und Abrechnungsworkflow offen. |

## Euroblood

| Bereich | Status | Bewertung |
|---|---|---|
| Leitstelle ohne Bildungsbereich | Demo | Eigene EB-Ansicht vorhanden; muss konsequent separat bleiben. |
| Wiederkehrende und akute Touren, Blaulicht/ohne Blaulicht | Demo | Beispiele vorhanden; Dispositionsbackend fehlt. |
| Fahrzeuge, BOS-Status, Live-Standort, Navigation | Teilweise/Extern | UI vorhanden; Telematik, Kartenanbieter und rechtliche Prüfung fehlen. |
| Übergabe mit Uhrzeit, Kilometer, Unterschrift, automatische Bestätigung | Teilweise | Fachablauf erfasst; mobile Offline-Erfassung und Signatur fehlen. |
| Krankenhausportal mit Live-ETA und Historie | Demo | Oberfläche vorgesehen; Zugang, Datenschutz und Echtzeitdaten fehlen. |
| Transportscheine und Abrechnungsbündel | Teilweise | Dokumentprozess konzipiert; produktive Buchhaltungsschnittstelle fehlt. |
| Sanitätsdienste, Brandwachen, Rettungsdienstschichten | Demo/Teilweise | In Einsatzmodulen vorgesehen; Dienst-/Protokolllogik zu vervollständigen. |

## Arbeit, CRM und Verwaltung

| Bereich | Status | Bewertung |
|---|---|---|
| Arbeitszeit, Pause, manuelle Korrekturmarkierung, Monatsabschluss | Demo | Oberfläche vorhanden; rechtssichere Serverzeiterfassung und Lohnexport fehlen. |
| Abwesenheiten, private Sperrzeiten, Kapazitätswarnungen | Demo | Workflow sichtbar; Kalender-/Planungsengine fehlt. |
| Spesen, Arbeitsschutz, Arbeitsunfälle, Fortbildungen | Demo/Teilweise | Bereiche vorhanden; vollständige Formulare, Regeln und Freigaben offen. |
| CRM, Kundenakte, Kommunikationschronik, Zeitstempel | Demo | Oberfläche vorhanden; E-Mail-Synchronisierung und manipulationssicheres Audit fehlen. |
| E-Mail-Postfächer, Briefe im Corporate Design | Offen/Extern | IMAP/OAuth bzw. Mailprovider, Vorlagenservice und Freigaben fehlen. |
| Fonio-Telefon-KI | Offen/Extern | Je Firma eigene Zugangsdaten/Webhooks erforderlich. |
| Interner Chat, Gruppen, Rundnachrichten, Dozentenchat | Demo | WhatsApp-ähnliche UI vorhanden; Echtzeitbackend, Push und Aufbewahrung fehlen. |
| WhatsApp-Assistentinnen | Offen/Extern | Meta Business/WhatsApp-API, Vorlagenfreigaben und AVV erforderlich. |
| Aufgaben, Freigaben, Smart-Modus | Demo | Interaktiv mit Demodaten; Regelwerk, Priorisierung und Eskalationen müssen serverseitig werden. |
| Kalender, Apple/Google/Outlook, Reisezeit, Verkehr, NINA | Teilweise/Extern | Kalenderansicht vorhanden; Sync-, Routing-, Wetter- und Warn-APIs fehlen. |
| Mental-Health-Impulse, Geburtstage, Jubiläen, Auszeichnungen | Demo/Teilweise | Ideen sichtbar; Einwilligung und konfigurierbare Automationen fehlen. |
| Fuhrpark, Lager, Kostenanalyse, Newsletter | Demo/Teilweise | Bereiche vorhanden; echte Bestände, Buchungen, Einwilligungen und Exporte fehlen. |
| Lexware XL | Offen/Extern | Zugang, dokumentierte Import-/API-Möglichkeiten und Testmandant erforderlich. |

## Marketing, Recruiting und Zusatzfunktionen

| Bereich | Status | Bewertung |
|---|---|---|
| Affiliate 5 % / 5 %, nur Neukunden, KYC, Vertrag, Auszahlung | Demo/Teilweise | Landingpage/Idee vorhanden; Rechts-, Steuer-, KYC- und Zahlungsprozess offen. |
| Google/Trustpilot/Social-Feedbackstrecke | Teilweise/Extern | Links/Workflow konzipiert; Einwilligungen und Plattformregeln zu prüfen. |
| Baumspende 2,50 €, je Kurs/Teilnehmer | Teilweise/Extern | Auswahl konzipiert; Partner, Zahlungs- und Wirkungsnachweis fehlen. |
| Bewerberportal für Dozenten/Fahrer | Teilweise | Oberfläche/Anforderung vorhanden; sichere Uploads, Einwilligung und Löschfristen fehlen. |
| Ausschreibungsmonitoring per KI | Teilweise/Extern | Fachkonzept vorhanden; zulässige Quellen/APIs und menschliche Freigabe nötig. |
| Newsletter, Wiederholungs-/Fortbildungsmarketing | Teilweise | Prozesse erfasst; Consent-Management und Versanddienst fehlen. |

## Assistentinnen

Stella (Personal Paramedic), Bella (BWW), Ella (Euroblood) und Mila (Ruben Wippermann) sind visuell integriert. Antworten und Aktionen sind derzeit simuliert. Für den Echtbetrieb braucht es ein abgesichertes KI-Gateway, Berechtigungsprüfung vor jedem Datenzugriff, Protokollierung, Datenminimierung, Freigaben für risikoreiche Aktionen und klare menschliche Entscheidungsverantwortung.

## Datenübernahme

Die bereitgestellten Excel-, SQL-, Vertrags-, Kurs- und Dokumentdateien werden **nicht** in die öffentliche Demo importiert. Vor Import sind nötig: produktive Datenbank, getestete Mandantenzuordnung, Dublettenregeln, Rechtsgrundlage, Importprotokoll, Stichprobenabnahme und Rückfallplan. Die vorhandenen Dateien dienen bis dahin ausschließlich der Struktur- und Migrationsplanung.

## Freigabekriterien für Echtdaten

1. Anmeldung, MFA und Wiederherstellung getestet.
2. Mandanten- und Rollenprüfungen durch automatisierte Sicherheitstests belegt.
3. Datenschutzdokumentation und Auftragsverarbeitung abgeschlossen.
4. Verschlüsselung, Backups und Wiederherstellung getestet.
5. Audit, Löschkonzept und Notfallprozess abgenommen.
6. Pilotkurs vollständig in einer nichtöffentlichen Testumgebung durchgeführt.
7. Erst danach Domainumschaltung und Echtdatenimport.
