import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color, font, gradient } from '@/constants/theme';
import { Icon } from './Icon';
import { Txt } from './Txt';

export const formatPoints = (n: number) => n.toLocaleString('fr-FR').replace(/ | |,/g, ' ');

/** Solde de points : pièce or + chiffre Lilita. */
export function PointsPill({ points, style }: { points: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View accessibilityLabel={`${points} points`} style={[styles.points, style]}>
      <LinearGradient colors={gradient.treasure as unknown as [string, string]} style={styles.coin}>
        <Icon name="toll" size={20} color={color.goldInk} />
      </LinearGradient>
      <Txt style={styles.pointsText}>{formatPoints(points)}</Txt>
    </View>
  );
}

/** Pastille de niveau, en lame électrique. */
export function LevelBadge({ level, style }: { level: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View accessibilityLabel={`Niveau ${level}`} style={[styles.levelEdge, style]}>
      <LinearGradient colors={gradient.volt as unknown as [string, string]} style={styles.levelFace}>
        <Txt style={styles.levelText}>Niv. {level}</Txt>
      </LinearGradient>
    </View>
  );
}

/** Compteur rouge (notifications). */
export function CountBadge({ count, style }: { count: number; style?: StyleProp<ViewStyle> }) {
  if (count <= 0) return null;
  return (
    <View style={[styles.count, style]}>
      <Txt style={styles.countText}>{count > 99 ? '99+' : count}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  points: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    paddingLeft: 4,
    paddingRight: 12,
    borderRadius: 999,
    backgroundColor: color.surface2,
    borderBottomWidth: 3,
    borderBottomColor: color.edge,
  },
  coin: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  pointsText: { fontFamily: font.display, fontSize: 18, lineHeight: 22, color: color.text1 },
  levelEdge: { borderRadius: 6, backgroundColor: color.secondaryEdge, paddingBottom: 3, transform: [{ skewX: '-10deg' }], alignSelf: 'flex-start' },
  levelFace: { borderRadius: 6, paddingHorizontal: 10, height: 28, justifyContent: 'center' },
  levelText: { fontFamily: font.display, fontSize: 15, lineHeight: 18, color: color.white, transform: [{ skewX: '10deg' }] },
  count: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: color.danger,
    borderWidth: 2,
    borderColor: color.bgTop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: { fontFamily: font.bodyBlack, fontSize: 11, lineHeight: 14, color: color.white },
});
