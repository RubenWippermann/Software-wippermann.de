# Etappe 2: Produktions- und Sicherheitsbasis

Stand: 16. Juli 2026

## Jetzt vorbereitet

- D1-Datenbankbindung `DB` und private R2-Dokumentablage `FILES`
- strikt firmengebundenes Datenmodell für vier rechtlich getrennte Organisationen
- serverseitige Rollen- und Rechtevorlage für Büro, Buchhaltung, Planung, Dozenten, Kunden, Krankenhäuser und Fahrer
- gemeinsame Dozentenprofile mit getrennten Vertragsbeziehungen zu Personal Paramedic und BWW
- Audit- und Dokumentmetadaten inklusive Prüfsumme und Version
- keine echten Personen- oder Kundendaten in Seeds, Demo oder Repository

## Sicherheitsregeln

1. Jede fachliche Abfrage benötigt eine aktive Mitgliedschaft in genau der angefragten Firma.
2. Auch der Inhaber erhält keinen stillen firmenübergreifenden Datenzugriff; der Firmenkontext wird ausdrücklich gewählt und geprüft.
3. Dokumente werden privat gespeichert. Öffentliche URLs werden nicht dauerhaft erzeugt.
4. Änderungen an geschäftlichen Datensätzen müssen zusätzlich als Audit-Ereignis protokolliert werden.
5. Passwörter, API-Schlüssel und SMS-Zugangsdaten gehören ausschließlich in geschützte Umgebungsvariablen.

## Noch nicht produktiv aktiv

- echter Login, Einladungsmails und Sitzungsverwaltung
- Passkey/TOTP als primäre MFA sowie SMS als Zusatz- oder Wiederherstellungsweg
- provisionierte Produktionsdatenbank und Dokumentablage
- Negativtests für firmenfremde Zugriffe
- Backup-, Lösch- und Wiederherstellungsabläufe
- Import echter Personal-, Kunden- und Kursdaten

Solange diese Punkte offen sind, bleibt die öffentliche Seite eine Demo mit fiktiven Daten. Echte Daten werden erst nach bestandenem Sicherheits- und Zugriffstest importiert.

## Nächste Etappe

1. Identitätsanbieter auswählen und Produktionszugänge einrichten.
2. Login, Einladung, MFA und Abmeldung serverseitig anbinden.
3. D1 und R2 provisionieren, Migration ausführen und Rollen testen.
4. Pilotnutzer Ruben Wippermann anlegen und Zugriff je Firma einzeln abnehmen.
5. Erst danach bereinigten Datenimport starten.
