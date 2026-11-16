import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { color } from '@/constants/theme';

/**
 * Avatars illustrés DiceBear (https://dicebear.com) — licence libre.
 * Style « lorelei » par Lisa Wischofsky, sous CC0 1.0 (rendu le plus proche anime, aucun crédit requis).
 * Autres styles possibles : 'adventurer' (CC BY 4.0), 'notionists' (CC0), 'big-smile' (CC0), 'avataaars'.
 * On envoie comme graine le nom d'avatar générique, jamais le pseudo réel du joueur.
 */
export const AVATAR_STYLE = 'lorelei';

export function avatarImageUri(index: number, size = 200): string {
  const name = AVATARS[((index % AVATARS.length) + AVATARS.length) % AVATARS.length].name;
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/9.x/${AVATAR_STYLE}/png?seed=${seed}&size=${Math.round(size)}`;
}

/* Les 12 avatars originaux de la charte (planche 04). Aucun personnage existant. */

const HAIR = {
  spiky: ['M23 52 C19 30 31 15 50 14 C69 15 81 30 77 52 Z', 'M25 47 L27 26 L36 33 L40 14 L50 28 L58 11 L63 29 L73 21 L75 47 C69 38 60 34 50 35 C40 34 31 38 25 47 Z'],
  bob: ['M21 68 C16 34 29 15 50 15 C71 15 84 34 79 68 L71 68 L71 46 L29 46 L29 68 Z', 'M26 49 C24 27 37 18 50 18 C63 18 76 27 74 49 C67 41 59 33 52 36 C46 31 35 38 26 49 Z'],
  long: ['M19 96 C12 52 23 15 50 15 C77 15 88 52 81 96 L70 96 L72 52 L28 52 L30 96 Z', 'M26 51 C24 26 38 17 54 18 C68 19 77 31 74 51 C66 45 58 35 52 29 C47 38 37 46 26 51 Z'],
  crop: ['M27 44 C26 24 37 16 50 16 C63 16 74 24 73 44 Z', 'M27 43 C27 25 38 17 51 17 C64 17 73 25 73 43 C66 34 58 30 49 31 C41 30 33 35 27 43 Z'],
  pony: ['M24 50 C20 30 31 16 50 16 C69 16 80 30 76 50 Z M71 32 C88 36 93 58 85 76 C82 61 78 50 69 45 Z', 'M26 47 C26 28 37 19 50 19 C63 19 74 28 74 47 C64 43 52 37 46 26 C42 36 34 43 26 47 Z'],
} as const;

const EYES = {
  open: { d: 'M37.6 52 a3.8 5.2 0 1 0 7.6 0 a3.8 5.2 0 1 0 -7.6 0 Z M54.8 52 a3.8 5.2 0 1 0 7.6 0 a3.8 5.2 0 1 0 -7.6 0 Z', fill: '#1B1030', stroke: 0, shine: 'M39.6 49.6 a1.5 1.5 0 1 0 3 0 a1.5 1.5 0 1 0 -3 0 Z M56.8 49.6 a1.5 1.5 0 1 0 3 0 a1.5 1.5 0 1 0 -3 0 Z' },
  happy: { d: 'M37.4 53.5 Q41.4 47.5 45.4 53.5 M54.6 53.5 Q58.6 47.5 62.6 53.5', fill: 'none', stroke: 2.6, shine: '' },
  sharp: { d: 'M36.5 49.5 L46 52 L45 56.5 L38 55.5 Z M63.5 49.5 L54 52 L55 56.5 L62 55.5 Z', fill: '#1B1030', stroke: 0, shine: 'M41 52.4 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M56.6 52.4 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z' },
} as const;

const MOUTH = {
  smile: { d: 'M45 62 Q50 66 55 62', fill: 'none' },
  grin: { d: 'M44 61 Q50 69 56 61 Z', fill: '#7A1E3A' },
  flat: { d: 'M47 63 L53 63', fill: 'none' },
  smirk: { d: 'M45 63 Q51 65 56 60', fill: 'none' },
} as const;

const ACC = {
  none: '',
  horns: 'M34 25 C30 15 31 8 35 3 C37 11 40 17 42 22 Z M66 25 C70 15 69 8 65 3 C63 11 60 17 58 22 Z',
  cat: 'M27 34 L24 11 L42 22 Z M73 34 L76 11 L58 22 Z',
  fox: 'M28 32 L22 4 L44 20 Z M72 32 L78 4 L56 20 Z',
  hood: 'M13 102 C10 58 21 9 50 8 C79 9 90 58 87 102 Z',
  headband: 'M27 37 L73 37 L73 43 L27 43 Z M72 38 L87 32 L85 43 L72 43 Z',
  visor: 'M27 46 C27 43 29 42 32 42 L68 42 C71 42 73 43 73 46 L73 54 C73 57 71 58 68 58 L32 58 C29 58 27 57 27 54 Z',
  glasses: 'M46.5 52 a5.6 5.6 0 1 1 -11.2 0 a5.6 5.6 0 1 1 11.2 0 Z M64.7 52 a5.6 5.6 0 1 1 -11.2 0 a5.6 5.6 0 1 1 11.2 0 Z M46.5 51 L53.5 51',
  star: 'M67 27 L69.2 32 L74.6 32.4 L70.5 35.9 L71.8 41.2 L67 38.4 L62.2 41.2 L63.5 35.9 L59.4 32.4 L64.8 32 Z',
  buns: 'M21 22 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0 Z M59 22 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0 Z',
  scarf: 'M27 79 C38 86 62 86 73 79 L76 90 C62 97 38 97 24 90 Z M62 88 L70 88 L73 102 L64 102 Z',
} as const;

type Acc = keyof typeof ACC;

interface AvatarDef {
  name: string;
  bg: [string, string];
  skin: string;
  hair: string;
  style: keyof typeof HAIR;
  eyes: keyof typeof EYES;
  mouth: keyof typeof MOUTH;
  shirt: string;
  back: Acc;
  backColor?: string;
  front: Acc;
  frontColor?: string;
  frontOpacity?: number;
}

export const AVATARS: AvatarDef[] = [
  { name: 'Kaze', bg: ['#FF8A5C', '#B83A1A'], skin: '#FFD9B8', hair: '#FF6A3D', style: 'spiky', eyes: 'sharp', mouth: 'grin', shirt: '#2B2266', back: 'none', front: 'headband', frontColor: '#38D6FF' },
  { name: 'Mira', bg: ['#B79BFF', '#5232D8'], skin: '#F2C29B', hair: '#7A55F5', style: 'long', eyes: 'open', mouth: 'smile', shirt: '#FF4F8B', back: 'none', front: 'star', frontColor: '#FFC933' },
  { name: 'Tora', bg: ['#FFE07A', '#E59A0B'], skin: '#A86E4C', hair: '#2A1838', style: 'crop', eyes: 'happy', mouth: 'grin', shirt: '#FF5B2E', back: 'cat', backColor: '#2A1838', front: 'none' },
  { name: 'Yuki', bg: ['#6CF0FF', '#1F7FE0'], skin: '#FFE3CC', hair: '#EAF2FF', style: 'bob', eyes: 'open', mouth: 'flat', shirt: '#38D6FF', back: 'hood', backColor: '#2457C9', front: 'none' },
  { name: 'Ren', bg: ['#6EF0A0', '#158043'], skin: '#D9A07A', hair: '#2E1A47', style: 'pony', eyes: 'sharp', mouth: 'smirk', shirt: '#1C1638', back: 'none', front: 'scarf', frontColor: '#FF4D6A' },
  { name: 'Hana', bg: ['#FFA3CF', '#D63A8A'], skin: '#FFD9B8', hair: '#FF7AB6', style: 'bob', eyes: 'happy', mouth: 'smile', shirt: '#6A45F0', back: 'buns', backColor: '#FF7AB6', front: 'none' },
  { name: 'Daiki', bg: ['#FF6A80', '#9E1B35'], skin: '#7A4A33', hair: '#2B1A12', style: 'spiky', eyes: 'open', mouth: 'grin', shirt: '#FFC933', back: 'horns', backColor: '#FFE7B0', front: 'none' },
  { name: 'Sora', bg: ['#8C6BFF', '#2A1F7A'], skin: '#F2C29B', hair: '#38D6FF', style: 'crop', eyes: 'open', mouth: 'smile', shirt: '#14B8A6', back: 'none', front: 'visor', frontColor: '#FF5B2E', frontOpacity: 0.92 },
  { name: 'Kitsu', bg: ['#FFC27A', '#E0601A'], skin: '#FFE3CC', hair: '#FF9A3D', style: 'long', eyes: 'happy', mouth: 'smile', shirt: '#FFFFFF', back: 'fox', backColor: '#FF9A3D', front: 'none' },
  { name: 'Jun', bg: ['#5EEAD4', '#0F766E'], skin: '#A86E4C', hair: '#14365C', style: 'bob', eyes: 'open', mouth: 'smile', shirt: '#FFC933', back: 'none', front: 'glasses' },
  { name: 'Akari', bg: ['#FFE07A', '#FF7A45'], skin: '#D9A07A', hair: '#FFD23F', style: 'pony', eyes: 'sharp', mouth: 'smirk', shirt: '#C8243F', back: 'none', front: 'none' },
  { name: 'Nox', bg: ['#4B3A99', '#120C33'], skin: '#F2C29B', hair: '#F1ECFF', style: 'spiky', eyes: 'sharp', mouth: 'flat', shirt: '#1B1030', back: 'hood', backColor: '#3B1FA8', front: 'none' },
];

function shade(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * 0.84);
  const g = Math.round(((n >> 8) & 255) * 0.78);
  const b = Math.round((n & 255) * 0.8);
  return `rgb(${r},${g},${b})`;
}

/**
 * Index d'avatar d'un joueur : « avatar:N » dans avatar_url si présent,
 * sinon un index stable calculé à partir du pseudo.
 */
export function avatarIndexFor(username?: string | null, avatarUrl?: string | null): number {
  const m = avatarUrl?.match(/^avatar:(\d+)$/);
  if (m) return Number(m[1]) % AVATARS.length;
  const s = username ?? '';
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % AVATARS.length;
}

interface AvatarProps {
  index?: number;
  size?: number;
  shape?: 'round' | 'square';
  /** Silhouette noire (perso mystère, carte manquante). */
  silhouette?: boolean;
  ring?: string;
  ringWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export function Avatar({ index = 0, size = 64, shape = 'round', silhouette = false, ring, ringWidth = 3, style }: AvatarProps) {
  const a = AVATARS[((index % AVATARS.length) + AVATARS.length) % AVATARS.length];
  const radius = shape === 'round' ? size / 2 : Math.round(size * 0.3);
  const e = EYES[a.eyes];
  const m = MOUTH[a.mouth];
  const sk = shade(a.skin);
  const dark = silhouette ? '#000000' : undefined;
  const fill = (c?: string) => dark ?? c ?? 'none';

  const body = (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {ACC[a.back] ? <Path d={ACC[a.back]} fill={fill(a.backColor)} /> : null}
      <Path d={HAIR[a.style][0]} fill={fill(a.hair)} />
      <Path d="M16 102 C18 82 32 75 50 75 C68 75 82 82 84 102 Z" fill={fill(a.shirt)} />
      <Path d="M44 62 L56 62 L56 77 L44 77 Z" fill={fill(sk)} />
      <Path d="M42 75 L50 84 L58 75 Z" fill={fill(sk)} />
      <Path d="M25.5 52 a3.8 5.2 0 1 0 7.6 0 a3.8 5.2 0 1 0 -7.6 0 Z M66.9 52 a3.8 5.2 0 1 0 7.6 0 a3.8 5.2 0 1 0 -7.6 0 Z" fill={fill(a.skin)} />
      <Ellipse cx={50} cy={49} rx={21} ry={23} fill={fill(a.skin)} />
      {!silhouette ? (
        <>
          <Ellipse cx={43} cy={40} rx={9} ry={6} fill="rgba(255,255,255,0.16)" />
          <Path d="M32 59 a3.6 2.1 0 1 0 7.2 0 a3.6 2.1 0 1 0 -7.2 0 Z M60.8 59 a3.6 2.1 0 1 0 7.2 0 a3.6 2.1 0 1 0 -7.2 0 Z" fill="#FF7A9A" fillOpacity={0.45} />
          <Path d={e.d} fill={e.fill} stroke="#1B1030" strokeWidth={e.stroke} strokeLinecap="round" />
          {e.shine ? <Path d={e.shine} fill="#FFFFFF" /> : null}
          <Path d={m.d} fill={m.fill} stroke="#5A1630" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
      <Path d={HAIR[a.style][1]} fill={fill(a.hair)} />
      {ACC[a.front] ? (
        <Path
          d={ACC[a.front]}
          fill={a.front === 'glasses' ? 'none' : fill(a.frontColor)}
          fillOpacity={a.frontOpacity ?? 1}
          stroke={a.front === 'glasses' ? fill('#1B1030') : 'none'}
          strokeWidth={a.front === 'glasses' ? 2.4 : 0}
          strokeLinecap="round"
        />
      ) : null}
    </Svg>
  );

  const disc = (
    <View
      accessibilityRole="image"
      accessibilityLabel={silhouette ? 'Silhouette mystère' : `Avatar ${a.name}`}
      style={{ width: size, height: size, borderRadius: radius, overflow: 'hidden' }}
    >
      {!silhouette ? (
        <LinearGradient colors={a.bg} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />
      ) : null}
      {/* zIndex explicite : sur le web, le dégradé (absolute, z-index 0) passe sinon par-dessus le visage SVG. */}
      {/* Le visage SVG maison sert de secours : il reste visible si l'image DiceBear n'a pas (encore) chargé. */}
      <View style={{ position: 'relative', zIndex: 1 }}>{body}</View>
      {!silhouette ? (
        <Image
          source={{ uri: avatarImageUri(index, size * 2) }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}
          contentFit="cover"
          transition={160}
          cachePolicy="memory-disk"
          accessibilityLabel={`Avatar ${a.name}`}
        />
      ) : null}
      {!silhouette ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius,
            borderBottomWidth: Math.max(2, Math.round(size * 0.05)),
            borderBottomColor: 'rgba(0,0,0,0.22)',
          }}
        />
      ) : null}
    </View>
  );

  if (!ring) return <View style={style}>{disc}</View>;
  return (
    <View style={[{ borderRadius: radius + ringWidth, borderWidth: ringWidth, borderColor: ring, alignSelf: 'flex-start' }, style]}>
      {disc}
    </View>
  );
}

export const avatarCount = AVATARS.length;
export const avatarBg = (index: number) => AVATARS[index % AVATARS.length].bg;
export const avatarName = (index: number) => AVATARS[index % AVATARS.length].name;
export const AVATAR_FALLBACK = color.surface3;
