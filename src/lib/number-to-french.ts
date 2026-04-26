const WORDS: Record<number, string> = {
  0: "Zéro",
  1: "Un",
  2: "Deux",
  3: "Trois",
  4: "Quatre",
  5: "Cinq",
  6: "Six",
  7: "Sept",
  8: "Huit",
  9: "Neuf",
  10: "Dix",
  11: "Onze",
  12: "Douze",
  13: "Treize",
  14: "Quatorze",
  15: "Quinze",
  16: "Seize",
  17: "Dix-sept",
  18: "Dix-huit",
  19: "Dix-neuf",
  20: "Vingt",
};

export function numberToFrench(n: number): string {
  return WORDS[n] ?? String(n);
}
