# Sicherheitskonzept – aktueller Stand

## Schutzbedarf

Das geplante System verarbeitet besonders schützenswerte Unternehmens-, Beschäftigten-, Teilnehmer-, Vertrags-, Abrechnungs-, Standort- und teilweise Gesundheitsdaten. Deshalb gilt: keine Echtdaten in öffentlich erreichbaren Demos, Quellcode-Repositories oder unverschlüsselten Exporten.

## Bereits umgesetzt

- Suchmaschinen werden per `robots` und HTTP-Headern ausgeschlossen.
- Sicherheitsheader sind für den Web-Build gesetzt.
- Die Demo wird als Demo gekennzeichnet.
- Der veröffentlichte Stand soll zunächst privat beziehungsweise zugriffsgeschützt sein.
- Geheimnisse und lokale Umgebungsdateien sind von Git ausgeschlossen.

## Vor Echtdaten zwingend umzusetzen

1. Serverseitige Anmeldung mit E-Mail-Bestätigung, sicheren Sitzungen und Kontosperren.
2. MFA per Authenticator/Passkey; SMS nur als zusätzliche bzw. Wiederherstellungsoption.
3. Serverseitige Rollen- und Mandantenprüfung bei jedem Datenzugriff.
4. Strikte Datentrennung: Personal Paramedic, BWW, Euroblood und Ruben Wippermann; ausschließlich freigegebene Dozentenstammdaten dürfen PP/BWW gemeinsam nutzen.
5. Verschlüsselung bei Übertragung und Speicherung, verschlüsselte Backups und Wiederherstellungstests.
6. Revisionsfähiges Auditprotokoll mit Benutzer, Firma, Zeitstempel, Aktion und Änderungsgrund.
7. Sichere Dokumentenablage mit Virenprüfung, Dateitypprüfung, Ablaufregeln und Berechtigungen.
8. Auftragsverarbeitungsverträge, Löschkonzept, Datenschutz-Folgenabschätzung und Berechtigungskonzept.
9. Monitoring, Alarmierung, Rate-Limits, Schutz vor automatisierten Angriffen und dokumentierter Notfallplan.
10. Getrennte Test- und Produktivumgebung; anonymisierte Testdaten.

## MFA-Grundsatz

Für Administratoren und Büromitarbeiter wird Passkey oder Authenticator-App als Standard empfohlen. SMS kann für Ruben zusätzlich aktiviert werden, ist aber wegen SIM-Swapping nicht die alleinige Absicherung. Dozenten, Kunden und Krankenhäuser erhalten ebenfalls MFA entsprechend dem Schutzbedarf ihrer Daten.

## Veröffentlichung

Die Domain darf erst auf die Produktivumgebung zeigen, wenn Anmeldung, MFA, serverseitige Mandantentrennung, Backups und Auditprotokolle getestet und abgenommen sind. Bis dahin bleibt die Vorschau privat und enthält nur fiktive Daten.

## Meldung von Sicherheitsproblemen

Sicherheitsprobleme werden nicht öffentlich als GitHub-Issue veröffentlicht. Sie werden direkt an die verantwortliche Administration gemeldet und im internen Sicherheitsregister dokumentiert.
