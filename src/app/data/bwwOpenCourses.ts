export type PlatformCourse = {
  id: string;
  firma: string;
  nummer: string;
  format: string;
  typ: string;
  kunde: string;
  datum: string;
  zeit: string;
  ende?: string;
  ort: string;
  status: string;
  preis?: number;
  tag?: string;
};

type CourseRow = [datum: string, zeit: string, ende: string, format: string, preis?: number, tag?: string];

const rows: CourseRow[] = [
  ["2026-08-01", "09:00", "16:30", "Lehrkräfte-Fortbildung", undefined, "Multiplikatorenstelle"],
  ["2026-08-02", "09:00", "16:30", "Lehrkräfte-Fortbildung", undefined, "Multiplikatorenstelle"],
  ["2026-08-08", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-08-11", "09:00", "16:30", "Erste Hilfe in Bildungs- und Betreuungseinrichtungen", 59, "9 UE · Betreuungseinrichtungen"],
  ["2026-08-12", "09:00", "16:30", "Brandschutzhelfer", 89, "Theorie & Praxis"],
  ["2026-08-15", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-08-16", "10:00", "14:00", "Notfalltraining", 69, "4 UE · Praxistraining"],
  ["2026-08-18", "18:00", "21:00", "Baby- und Kinder-Erste-Hilfe", 49, "Für Eltern & Betreuungspersonen"],
  ["2026-08-23", "10:00", "17:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-08-25", "09:00", "16:30", "Erste-Hilfe-Fortbildung", 59, "9 UE · Betriebliche Ersthelfende"],
  ["2026-08-29", "09:00", "16:30", "Erste Hilfe in Bildungs- und Betreuungseinrichtungen", 59, "9 UE · Betreuungseinrichtungen"],
  ["2026-09-05", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-09-08", "09:00", "13:00", "Notfalltraining", 69, "4 UE · Praxistraining"],
  ["2026-09-09", "18:00", "21:00", "Baby- und Kinder-Erste-Hilfe", 49, "Für Eltern & Betreuungspersonen"],
  ["2026-09-12", "09:00", "16:30", "Brandschutzhelfer", 89, "Theorie & Praxis"],
  ["2026-09-15", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-09-16", "09:00", "16:30", "Lehrkräfte-Ausbildung Medizin · Teil 1", undefined, "Multiplikatorenstelle"],
  ["2026-09-17", "09:00", "16:30", "Lehrkräfte-Ausbildung Medizin · Teil 1", undefined, "Multiplikatorenstelle"],
  ["2026-09-18", "09:00", "16:30", "Lehrkräfte-Ausbildung Medizin · Teil 1", undefined, "Multiplikatorenstelle"],
  ["2026-09-23", "09:00", "16:30", "Lehrkräfte-Ausbildung Medizin · Teil 2", undefined, "Multiplikatorenstelle"],
  ["2026-09-24", "09:00", "16:30", "Lehrkräfte-Ausbildung Medizin · Teil 2", undefined, "Multiplikatorenstelle"],
  ["2026-09-25", "09:00", "16:30", "Lehrkräfte-Ausbildung Medizin · Teil 2", undefined, "Multiplikatorenstelle"],
  ["2026-09-29", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-09-30", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 1", undefined, "Multiplikatorenstelle"],
  ["2026-10-01", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 1", undefined, "Multiplikatorenstelle"],
  ["2026-10-02", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 1", undefined, "Multiplikatorenstelle"],
  ["2026-10-04", "10:00", "17:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-10-06", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-10-06", "18:00", "21:00", "Baby- und Kinder-Erste-Hilfe", 49, "Für Eltern & Betreuungspersonen"],
  ["2026-10-07", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-10-08", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-10-09", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-10-12", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-10-13", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 1", undefined, "Berufliche Qualifikation"],
  ["2026-10-14", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 2", undefined, "Berufliche Qualifikation"],
  ["2026-10-15", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 3", undefined, "Berufliche Qualifikation"],
  ["2026-10-16", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 4", undefined, "Berufliche Qualifikation"],
  ["2026-10-18", "10:00", "17:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-10-19", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 5", undefined, "Berufliche Qualifikation"],
  ["2026-10-20", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 6", undefined, "Berufliche Qualifikation"],
  ["2026-10-21", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 7", undefined, "Berufliche Qualifikation"],
  ["2026-10-22", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Tag 8", undefined, "Berufliche Qualifikation"],
  ["2026-10-23", "09:00", "16:30", "Betriebssanitäter-Grundausbildung · Prüfung", undefined, "Prüfung"],
  ["2026-10-24", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-10-25", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 1", undefined, "Multiplikatorenstelle"],
  ["2026-10-26", "09:00", "16:30", "Betriebssanitäter-Aufbaulehrgang · Tag 1", undefined, "Berufliche Qualifikation"],
  ["2026-10-27", "09:00", "16:30", "Betriebssanitäter-Aufbaulehrgang · Tag 2", undefined, "Berufliche Qualifikation"],
  ["2026-10-27", "18:00", "21:00", "Baby- und Kinder-Erste-Hilfe", 49, "Für Eltern & Betreuungspersonen"],
  ["2026-10-28", "09:00", "16:30", "Betriebssanitäter-Aufbaulehrgang · Tag 3", undefined, "Berufliche Qualifikation"],
  ["2026-10-29", "09:00", "16:30", "Betriebssanitäter-Aufbaulehrgang · Tag 4", undefined, "Berufliche Qualifikation"],
  ["2026-10-30", "09:00", "16:30", "Betriebssanitäter-Aufbaulehrgang · Prüfung", undefined, "Prüfung"],
  ["2026-11-07", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 1", undefined, "Multiplikatorenstelle"],
  ["2026-11-08", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 1", undefined, "Multiplikatorenstelle"],
  ["2026-11-10", "18:00", "21:00", "Baby- und Kinder-Erste-Hilfe", 49, "Für Eltern & Betreuungspersonen"],
  ["2026-11-11", "09:00", "16:30", "Brandschutzhelfer", 89, "Theorie & Praxis"],
  ["2026-11-12", "09:00", "16:30", "Erste Hilfe in Bildungs- und Betreuungseinrichtungen", 59, "9 UE · Betreuungseinrichtungen"],
  ["2026-11-14", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-11-17", "09:00", "16:30", "Erste-Hilfe-Fortbildung", 59, "9 UE · Betriebliche Ersthelfende"],
  ["2026-11-19", "09:00", "13:00", "Notfalltraining", 69, "4 UE · Praxistraining"],
  ["2026-11-21", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-11-22", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-11-28", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-11-29", "09:00", "16:30", "Lehrkräfte-Ausbildung · Themenbereich 2", undefined, "Multiplikatorenstelle"],
  ["2026-12-05", "09:00", "16:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-12-06", "10:00", "17:30", "Erste-Hilfe-Fortbildung", 59, "9 UE · Betriebliche Ersthelfende"],
  ["2026-12-08", "09:00", "16:30", "Erste Hilfe in Bildungs- und Betreuungseinrichtungen", 59, "9 UE · Betreuungseinrichtungen"],
  ["2026-12-09", "18:00", "21:00", "Baby- und Kinder-Erste-Hilfe", 49, "Für Eltern & Betreuungspersonen"],
  ["2026-12-10", "09:00", "16:30", "Brandschutzhelfer", 89, "Theorie & Praxis"],
  ["2026-12-13", "10:00", "17:30", "Erste-Hilfe-Ausbildung", 59, "9 UE · Führerschein & Betrieb"],
  ["2026-12-19", "09:00", "16:30", "Erste Hilfe in Bildungs- und Betreuungseinrichtungen", 59, "9 UE · Betreuungseinrichtungen"],
  ["2026-12-20", "10:00", "14:00", "Notfalltraining", 69, "4 UE · Praxistraining"],
];

export const BWW_OPEN_COURSES: PlatformCourse[] = rows.map((row, index) => ({
  id: `bww-2026-${String(index + 1).padStart(3, "0")}`,
  firma: "BWW",
  nummer: `B-2026-${String(index + 1).padStart(4, "0")}`,
  format: row[3],
  typ: "Offener Kurs",
  kunde: "Offene Kurswelt",
  datum: row[0],
  zeit: row[1],
  ende: row[2],
  ort: "BWW · Worbiser Straße 2, 37115 Duderstadt",
  status: "Veröffentlicht",
  preis: row[4],
  tag: row[5],
}));
