export function tagesgruss(stunde = new Date().getHours()) {
  if (stunde < 5) return "Gute Nacht";
  if (stunde < 11) return "Guten Morgen";
  if (stunde < 14) return "Guten Mittag";
  if (stunde < 18) return "Guten Tag";
  return "Guten Abend";
}
