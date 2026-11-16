/**
 * Charte graphique Juda Arcade : manga éditorial sur relief arcade.
 * Toutes les valeurs viennent de la planche « 14 · Planche récapitulative et jetons ».
 * Les écrans doivent piocher ici (aucun hex en dur dans les écrans).
 */

import '@/global.css';

import { Platform } from 'react-native';

/* ------------------------------------------------------------------ */
/* Couleurs                                                            */
/* ------------------------------------------------------------------ */

export const color = {
  // Fonds
  bgBase: '#0D0A1E',
  bgTop: '#1A1240',
  bgRaised: '#140F2B',
  bgSunken: '#120D2A',
  edge: '#0A0718',
  // Surfaces (3 niveaux d'élévation)
  surface1: '#1C1638',
  surface2: '#262050',
  surface3: '#322A66',
  surface4: '#3D3480',
  overlay: 'rgba(8,6,26,0.72)',
  line: 'rgba(255,255,255,0.10)',
  lineStrong: '#4A4190',
  // Texte
  text1: '#FFFFFF',
  text2: '#CFC9EE',
  text3: '#A49DD0',
  textDisabled: '#6B6496',
  textOnLight: '#1B1030',
  placeholder: '#8F88BF',
  // Principale · Flamme
  primary: '#FF5B2E',
  primaryHi: '#FF7A45',
  primaryFace: '#D93A14',
  primaryPressed: '#C2330F',
  primaryEdge: '#8C2108',
  primaryTint: 'rgba(255,91,46,0.18)',
  link: '#FF8A5C',
  // Secondaire · Électrique
  secondary: '#8C6BFF',
  secondaryFace: '#6A45F0',
  secondaryEdge: '#3B1FA8',
  secondaryTint: 'rgba(140,107,255,0.18)',
  // XP
  xp: '#38D6FF',
  xpHi: '#6CF0FF',
  xpFace: '#1FA8E0',
  xpEdge: '#0B5A86',
  xpInk: '#06263A',
  xpTint: 'rgba(56,214,255,0.16)',
  // Statuts
  success: '#3EE07F',
  successFace: '#158043',
  successEdge: '#0B4D27',
  successTint: 'rgba(62,224,127,0.16)',
  danger: '#FF4D6A',
  dangerText: '#FF7A8E',
  dangerHi: '#FF6A80',
  dangerFace: '#C8243F',
  dangerEdge: '#6E0F22',
  dangerTint: 'rgba(255,77,106,0.16)',
  warning: '#FFB020',
  warningInk: '#2A1A00',
  // Or (récompenses et sélection)
  gold: '#FFC933',
  goldHi: '#FFE07A',
  goldFace: '#F0A10C',
  goldEdge: '#8A5A00',
  goldInk: '#5A3A00',
  goldTint: 'rgba(255,201,51,0.18)',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const rarity = {
  common: { color: '#A7AFC2', ink: '#2B3142', icon: 'circle', stars: 1, label: 'Commune' },
  uncommon: { color: '#4ADE80', ink: '#0B3D20', icon: 'change-history', stars: 2, label: 'Peu commune' },
  rare: { color: '#5AAEFF', ink: '#06244D', icon: 'crop-square', stars: 3, label: 'Rare' },
  epic: { color: '#C084FF', ink: '#2A0B4D', icon: 'pentagon', stars: 4, label: 'Épique' },
  legendary: { color: '#FFB020', ink: '#4D2A00', icon: 'hexagon', stars: 5, label: 'Légendaire' },
  mythic: { color: '#FF7AC0', ink: '#FFFFFF', icon: 'auto-awesome', stars: 6, label: 'Mythique' },
} as const;

export const podium = {
  gold: { hi: '#FFE07A', face: '#F0A10C', edge: '#8A5A00', ink: '#5A3A00', ring: '#FFC933' },
  silver: { hi: '#F1F5FF', face: '#A9B6CF', edge: '#5C6A85', ink: '#2B3142', ring: '#C9D3E6' },
  bronze: { hi: '#F5B27A', face: '#C2703A', edge: '#6E3A14', ink: '#4A2208', ring: '#E0965A' },
} as const;

/** Dégradés nommés (expo-linear-gradient), du haut vers le bas. */
export const gradient = {
  night: ['#1A1240', '#0D0A1E'],
  flame: ['#FF7A45', '#D93A14'],
  volt: ['#8C6BFF', '#6A45F0'],
  voltDeep: ['#8C6BFF', '#3B1FA8'],
  treasure: ['#FFE07A', '#F0A10C'],
  lagoon: ['#6CF0FF', '#1FA8E0'],
  jade: ['#3EE07F', '#158043'],
  ember: ['#FF6A80', '#C8243F'],
  prism: ['#FF4FA3', '#8C6BFF', '#38D6FF'],
  silver: ['#F1F5FF', '#A9B6CF'],
  bronze: ['#F5B27A', '#C2703A'],
  surface: ['#322A66', '#262050'],
  surfaceHero: ['#3D3480', '#2C2560'],
} as const satisfies Record<string, readonly [string, string, ...string[]]>;

export type GradientName = keyof typeof gradient;

/* ------------------------------------------------------------------ */
/* Typographie                                                         */
/* ------------------------------------------------------------------ */

/** Noms des polices chargées dans src/app/_layout.tsx (@expo-google-fonts). */
export const font = {
  display: 'LilitaOne_400Regular',
  poster: 'Anton_400Regular',
  body: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
  bodyHeavy: 'Nunito_800ExtraBold',
  bodyBlack: 'Nunito_900Black',
} as const;

export const type = {
  display: { fontFamily: font.display, fontSize: 40, lineHeight: 44 },
  h1: { fontFamily: font.display, fontSize: 30, lineHeight: 34 },
  h2: { fontFamily: font.display, fontSize: 24, lineHeight: 28 },
  h3: { fontFamily: font.bodyHeavy, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: font.body, fontSize: 16, lineHeight: 24 },
  small: { fontFamily: font.body, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: font.bodyHeavy, fontSize: 12, lineHeight: 16, letterSpacing: 1, textTransform: 'uppercase' },
  micro: { fontFamily: font.bodyHeavy, fontSize: 10, lineHeight: 12, letterSpacing: 1.8, textTransform: 'uppercase' },
  button: { fontFamily: font.display, fontSize: 20, lineHeight: 24 },
  scoreXL: { fontFamily: font.display, fontSize: 72, lineHeight: 76 },
  scoreL: { fontFamily: font.display, fontSize: 44, lineHeight: 48 },
  scoreM: { fontFamily: font.display, fontSize: 24, lineHeight: 28 },
  poster: { fontFamily: font.poster, fontSize: 96, lineHeight: 100 },
  hero: { fontFamily: font.poster, fontSize: 56, lineHeight: 62 },
  stat: { fontFamily: font.poster, fontSize: 40, lineHeight: 46 },
} as const;

/* ------------------------------------------------------------------ */
/* Espacements, rayons, bordures, relief, animations                   */
/* ------------------------------------------------------------------ */

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 14: 56 } as const;
export const screenPadding = 20;

export const radius = { xs: 8, sm: 12, md: 16, lg: 22, xl: 28, blade: 10, pill: 999 } as const;

export const border = { hair: 1, base: 2, select: 3 } as const;

/** Hauteur de la tranche visible sous un élément en relief. */
export const elevation = { flat: 0, set: 4, thick: 6, hero: 8 } as const;

export const shadow = {
  heroDrop: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 12,
  },
  glowGold: { shadowColor: '#FFC933', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.55, shadowRadius: 12 },
  glowPrimary: { shadowColor: '#FF5B2E', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.55, shadowRadius: 12 },
  glowXp: { shadowColor: '#38D6FF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10 },
  highlight: 'rgba(255,255,255,0.35)',
  highlightSoft: 'rgba(255,255,255,0.14)',
} as const;

export const motion = {
  instant: 80,
  fast: 160,
  base: 240,
  emphasis: 400,
  reward: 900,
  celebrate: 1200,
  easeOut: [0.2, 0.8, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  springPop: { damping: 12, stiffness: 220 },
} as const;

/** Couche éditoriale manga (planche 04b). */
export const editorial = {
  skewPortrait: '-8deg',
  skewPanel: '-10deg',
  unskewPanel: '10deg',
  posterStroke: 'rgba(255,255,255,0.55)',
  posterStrokeSoft: 'rgba(255,255,255,0.14)',
  dotsColor: 'rgba(255,255,255,0.2)',
  dotsSize: 8,
} as const;

/* ------------------------------------------------------------------ */
/* Compatibilité avec l'ancien code (template Expo, composants arcade) */
/* ------------------------------------------------------------------ */

export const Colors = {
  light: {
    text: color.textOnLight,
    background: '#F8F6FF',
    backgroundElement: '#E9E5FA',
    backgroundSelected: '#D8D1F5',
    textSecondary: '#5A5380',
    primary: color.primaryFace,
    secondary: color.secondaryFace,
    xpGreen: color.successFace,
    cardBorder: 'rgba(0,0,0,0.08)',
  },
  dark: {
    text: color.text1,
    background: color.bgBase,
    backgroundSecondary: color.bgRaised,
    backgroundElement: color.surface1,
    backgroundSelected: color.surface2,
    textSecondary: color.text2,
    textMuted: color.text3,
    primary: color.primary,
    secondary: color.secondary,
    xpGreen: color.success,
    cardBorder: color.line,
    error: color.danger,
    warning: color.warning,
  },
} as const;

export const ArcadeTheme = Colors.dark;

/** Ancien jeu de jetons, conservé pour les composants de src/components/arcade. */
export const Tokens = {
  bg: color.bgBase,
  surface: color.bgRaised,
  surfaceRaised: color.surface2,
  card: color.surface1,
  card60: 'rgba(28,22,56,0.6)',
  card70: 'rgba(28,22,56,0.7)',
  card75: 'rgba(28,22,56,0.75)',
  card80: 'rgba(28,22,56,0.8)',
  card90: 'rgba(28,22,56,0.9)',
  black: '#000',
  white: '#FFFFFF',
  muted: color.text3,
  slate300: '#C9D3E6',
  slate300_15: 'rgba(201,211,230,0.15)',
  white03: 'rgba(255,255,255,0.03)',
  white04: 'rgba(255,255,255,0.04)',
  white05: 'rgba(255,255,255,0.05)',
  white06: 'rgba(255,255,255,0.06)',
  white08: 'rgba(255,255,255,0.08)',
  white10: 'rgba(255,255,255,0.1)',
  white12: 'rgba(255,255,255,0.12)',
  white15: 'rgba(255,255,255,0.15)',
  white20: 'rgba(255,255,255,0.2)',
  white25: 'rgba(255,255,255,0.25)',
  white30: 'rgba(255,255,255,0.3)',
  cyan: color.xp,
  cyan10: 'rgba(56,214,255,0.1)',
  cyan12: 'rgba(56,214,255,0.12)',
  cyan15: 'rgba(56,214,255,0.15)',
  cyan25: 'rgba(56,214,255,0.25)',
  cyan30: 'rgba(56,214,255,0.3)',
  cyan35: 'rgba(56,214,255,0.35)',
  cyan40: 'rgba(56,214,255,0.4)',
  green: color.success,
  green04: 'rgba(62,224,127,0.04)',
  green08: 'rgba(62,224,127,0.08)',
  green12: 'rgba(62,224,127,0.12)',
  green25: 'rgba(62,224,127,0.25)',
  green30: 'rgba(62,224,127,0.3)',
  green40: 'rgba(62,224,127,0.4)',
  violet20: 'rgba(140,107,255,0.2)',
  violet30: 'rgba(140,107,255,0.3)',
  gold: color.gold,
  gold10: 'rgba(255,201,51,0.1)',
  gold15: 'rgba(255,201,51,0.15)',
  gold30: 'rgba(255,201,51,0.3)',
  red: color.danger,
  red08: 'rgba(255,77,106,0.08)',
  red12: 'rgba(255,77,106,0.12)',
  red15: 'rgba(255,77,106,0.15)',
  red25: 'rgba(255,77,106,0.25)',
  red30: 'rgba(255,77,106,0.3)',
  orange: color.primary,
  orange15: 'rgba(255,91,46,0.15)',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: { sans: font.body, serif: 'ui-serif', rounded: font.body, mono: 'ui-monospace' },
  default: { sans: font.body, serif: 'serif', rounded: font.body, mono: 'monospace' },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = { half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 64 } as const;

/** Hauteur réservée en bas des écrans à onglets (dock flottant + marge). */
export const BottomTabInset = 104;
export const MaxContentWidth = 800;
