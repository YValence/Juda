import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color, elevation, gradient as gradients, GradientName, radius as radii, shadow } from '@/constants/theme';

export type ReliefLevel = keyof typeof elevation;

interface ReliefProps {
  children?: React.ReactNode;
  /** Niveau de relief : plat, posé (4), épais (6), héros (8 + ombre portée). */
  level?: ReliefLevel;
  gradient?: GradientName | readonly [string, string, ...string[]];
  face?: string;
  edge?: string;
  radius?: number;
  highlight?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Surface « épaisse » de la charte : une face posée sur une tranche de couleur
 * plus sombre, sans flou, identique sur iOS et Android.
 */
export function Relief({
  children,
  level = 'thick',
  gradient,
  face,
  edge = color.edge,
  radius = radii.lg,
  highlight = true,
  style,
  contentStyle,
}: ReliefProps) {
  const depth = elevation[level];
  const colors = gradient
    ? typeof gradient === 'string'
      ? gradients[gradient as GradientName]
      : gradient
    : ([face ?? color.surface1, face ?? color.surface1] as const);

  return (
    <View
      style={[
        { borderRadius: radius, backgroundColor: depth > 0 ? edge : 'transparent', paddingBottom: depth },
        level === 'hero' && shadow.heroDrop,
        level === 'flat' && styles.flatBorder,
        style,
      ]}
    >
      <LinearGradient
        colors={colors as unknown as [string, string, ...string[]]}
        style={[
          { borderRadius: radius },
          highlight && depth > 0 && styles.highlight,
          contentStyle,
        ]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  highlight: {
    borderTopWidth: 2,
    borderTopColor: shadow.highlightSoft,
  },
  flatBorder: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
});
