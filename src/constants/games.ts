import type { CategoryData, GameCardData } from '@/components/ui';

/**
 * Données de démonstration des quêtes et des quiz.
 * Les états (fait, raté, verrouillé) viendront de Supabase (table des tentatives du jour).
 * Points maximum : PRD V2, section 6.3 (total 300 points par jour).
 */
export const DAILY_GAMES: GameCardData[] = [
  { id: 'mystery-char', title: 'Perso mystère', description: 'Devine le personnage. Un indice de plus à chaque erreur.', icon: 'person', gradient: 'flame', maxPoints: 60, state: 'done', score: 50, meta: 'Trouvé au 2e indice' },
  { id: 'mystery-tech', title: 'Technique mystère', description: 'Retrouve la technique à partir de 5 indices.', icon: 'autoAwesome', gradient: 'voltDeep', maxPoints: 50, state: 'todo' },
  { id: 'quote', title: 'Citation', description: 'Une réplique se révèle en 4 étapes. Qui parle ?', icon: 'quote', gradient: 'jade', maxPoints: 40, state: 'todo' },
  { id: 'emoji', title: 'Emoji', description: "Jusqu'à 5 emojis pour deviner un personnage ou une œuvre.", icon: 'emoji', gradient: 'lagoon', maxPoints: 50, state: 'todo' },
  { id: 'price-game', title: 'Juste prix', description: '20 pièces à répartir entre 5 personnages selon leur puissance.', icon: 'balance', gradient: 'treasure', maxPoints: 100, state: 'todo' },
];

export const QUIZ_CATEGORIES: CategoryData[] = [
  { id: 'culture-g', title: 'Culture G', icon: 'psychology', gradient: 'voltDeep', media: 'Texte', gain: 10 },
  { id: 'japon', title: 'Culture du Japon', icon: 'temple', gradient: 'ember', media: 'Texte', gain: 10 },
  { id: 'drapeaux', title: 'Drapeaux', icon: 'flag', gradient: 'jade', media: 'Image', gain: 10 },
  { id: 'capitales', title: 'Capitales', icon: 'public', gradient: 'lagoon', media: 'Texte', gain: 10 },
  { id: 'voix', title: 'Voix de persos', icon: 'mic', gradient: 'volt', media: 'Audio', gain: 10 },
  { id: 'anime', title: 'Reconnaître un anime', icon: 'movie', gradient: 'flame', media: 'Image', gain: 10 },
  { id: 'tactiques', title: 'Tactiques', icon: 'tactics', gradient: 'treasure', media: 'Texte', gain: 10 },
];

export const DAILY_POINT_CAP = 300;
/** Points gagnés aujourd'hui en quiz libres (démo, à remplacer par Supabase). */
export const DEMO_QUIZ_POINTS_TODAY = 180;

/** Temps restant avant minuit, heure du Maroc (Africa/Casablanca). */
export function timeUntilMoroccoMidnight(now = new Date()): string {
  let h = 0;
  let m = 0;
  let s = 0;
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Casablanca',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(now);
    h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
    m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
    s = Number(parts.find((p) => p.type === 'second')?.value ?? 0);
  } catch {
    h = now.getHours();
    m = now.getMinutes();
    s = now.getSeconds();
  }
  const left = 24 * 3600 - (h * 3600 + m * 60 + s);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(Math.floor(left / 3600))}:${pad(Math.floor((left % 3600) / 60))}:${pad(left % 60)}`;
}
