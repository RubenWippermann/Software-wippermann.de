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

- Aktivierung der neuen Zugangsseiten in der produktiven Hosting-Umgebung
- automatischer Versand der Einladungsmails
- SMS als zusätzlicher Wiederherstellungsweg; MFA selbst wird durch die Hosting-Plattform abgesichert
- provisionierte Produktionsdatenbank und Dokumentablage
- Negativtests für firmenfremde Zugriffe
- Backup-, Lösch- und Wiederherstellungsabläufe
- Import echter Personal-, Kunden- und Kursdaten

Solange diese Punkte offen sind, bleibt die öffentliche Seite eine Demo mit fiktiven Daten. Echte Daten werden erst nach bestandenem Sicherheits- und Zugriffstest importiert.

## Nächste Etappe

1. Produktionsspeicher provisionieren und beide Migrationen ausführen.
2. Pilotnutzer Ruben Wippermann über die einmalige Admin-Ersteinrichtung anlegen.
3. Firmenzugriffe und Einladungen mit Positiv- und Negativtests abnehmen.
4. Einladungsmail und geführte Erstanmeldung ergänzen.
5. Erst danach bereinigten Datenimport starten.
