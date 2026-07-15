# Wippermann Software

Mandantenfähige Unternehmensplattform für Personal Paramedic, BWW, Euroblood und Ruben Wippermann.

## Aktueller Stand

Der aktuelle Build ist eine **geschützte Funktionsdemo**. Navigation, Firmenansichten, Kalender, Kurse, CRM, Personal, Dokumente, Aufgaben, Smart-Modus und Assistentinnen sind als interaktiver Prototyp vorhanden. Demodaten werden ausschließlich lokal im Browser verarbeitet.

Die Anwendung ist noch **kein Produktivsystem für personenbezogene oder betriebsinterne Echtdaten**. Vor dem Echtbetrieb fehlen insbesondere eine serverseitige Datenbank, echte Anmeldung, Rollen- und Mandantentrennung auf dem Server, MFA/SMS, verschlüsselte Dateispeicherung, revisionssichere Protokollierung und die produktiven Schnittstellen.

Details: [Anforderungsstatus](./docs/ANFORDERUNGSSTATUS.md) und [Sicherheitskonzept](./SECURITY.md).

## Lokale Entwicklung

```bash
pnpm install
pnpm dev
```

## Prüfung

```bash
pnpm lint
pnpm build
```

## Veröffentlichung

Der Build ist für OpenAI Sites vorbereitet. Bis die produktive Anmeldung und MFA umgesetzt sind, darf nur eine private bzw. zugriffsgeschützte Vorschau veröffentlicht werden. Die Domain `software-wippermann.de` wird erst danach auf den Produktivstand geschaltet.
