# Etappe 3: Geschützter Zugang und Einladungen

Stand: 16. Juli 2026

## Umgesetzt

- geschützter Plattform-Login über den Hosting-Anbieter
- serverseitige Sitzungserkennung ohne selbst gebaute Passwortspeicherung
- einmalige Ersteinrichtung des Hauptadministrators über einen E-Mail-Hash
- Firmenzugriffe für Personal Paramedic, BWW, Euroblood und Ruben Wippermann
- Rollenprüfung für Inhaber, Administratoren, Büro, Disposition, Dozenten, Kunden und Teilnehmende
- zeitlich begrenzte Einmal-Einladungen mit ausschließlich gehashten Tokens
- separate Zugangs-, Einladungs- und interne Verwaltungsansichten
- serverseitige Prüfung, dass Einladungen und Firmenzugriffe nicht firmenübergreifend verwendet werden
- Vorbereitung für ein geführtes Onboarding

## Sicherheitsentscheidung

Passwörter, sichere Sitzungen und Mehrfaktor-Anmeldung werden nicht selbst nachgebaut, sondern von der Hosting-Plattform bereitgestellt. SMS ist später nur als zusätzlicher Wiederherstellungsweg vorgesehen. Dadurch vermeiden wir eine schwächere Eigenlösung für besonders schützenswerte Unternehmens- und Gesundheitsdaten.

## Noch vor dem Einsatz mit echten Daten

1. Produktionsdatenbank anlegen und Migrationen ausführen.
2. Hauptadministrator kontrolliert freischalten.
3. Firmenisolation mit absichtlich falschen Zugriffen testen.
4. Einladungsmails und geführte Erstanmeldung ergänzen.
5. Datenschutz-, Lösch- und Wiederherstellungstest dokumentieren.
