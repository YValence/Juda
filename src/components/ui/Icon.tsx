import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';
import { color } from '@/constants/theme';

/**
 * Jeu d'icônes unique de la charte : Material (remplies).
 * Les noms suivent Material Symbols ; ceux qui manquent dans MaterialIcons
 * passent par MaterialCommunityIcons.
 */
const MATERIAL = {
  home: 'home',
  quiz: 'quiz',
  leaderboard: 'leaderboard',
  person: 'person',
  style: 'style',
  toll: 'toll',
  star: 'star',
  trophy: 'emoji-events',
  fire: 'local-fire-department',
  bolt: 'bolt',
  schedule: 'schedule',
  timer: 'timer',
  lock: 'lock',
  lockOpen: 'lock-open',
  check: 'check',
  checkCircle: 'check-circle',
  cancel: 'cancel',
  error: 'error',
  lightbulb: 'lightbulb',
  volume: 'volume-up',
  play: 'play-arrow',
  pause: 'pause',
  replay: 'replay',
  notifications: 'notifications',
  settings: 'settings',
  redeem: 'redeem',
  swap: 'swap-horiz',
  search: 'search',
  visibility: 'visibility',
  visibilityOff: 'visibility-off',
  back: 'arrow-back',
  forward: 'arrow-forward',
  chevronRight: 'chevron-right',
  close: 'close',
  add: 'add',
  remove: 'remove',
  flag: 'flag',
  public: 'public',
  mic: 'mic',
  movie: 'movie',
  psychology: 'psychology',
  wifiOff: 'wifi-off',
  mail: 'mail',
  key: 'vpn-key',
  logout: 'logout',
  quote: 'format-quote',
  autoAwesome: 'auto-awesome',
  emoji: 'sentiment-very-satisfied',
  balance: 'balance',
  menuBook: 'menu-book',
  category: 'category',
  temple: 'temple-buddhist',
  verified: 'verified',
  sparkles: 'auto-awesome',
  gamepad: 'sports-esports',
  info: 'info',
  arrowUp: 'arrow-drop-up',
  arrowDown: 'arrow-drop-down',
  faceSad: 'sentiment-dissatisfied',
  tactics: 'psychology',
} as const;

const COMMUNITY = {
  swords: 'sword-cross',
  crown: 'crown',
} as const;

export type IconName = keyof typeof MATERIAL | keyof typeof COMMUNITY;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function Icon({ name, size = 24, color: tint = color.text1, style }: IconProps) {
  if (name in COMMUNITY) {
    return (
      <MaterialCommunityIcons
        name={COMMUNITY[name as keyof typeof COMMUNITY]}
        size={size}
        color={tint}
        style={style}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
    );
  }
  return (
    <MaterialIcons
      name={MATERIAL[name as keyof typeof MATERIAL]}
      size={size}
      color={tint}
      style={style}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
