import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color, gradient as gradients, GradientName } from '@/constants/theme';

interface BarProps {
  value: number; // 0 à 1
  height?: number;
  gradient?: GradientName;
  glow?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** Barre continue dans un puits (XP, chrono, plafond du jour). */
export function Bar({ value, height = 14, gradient = 'lagoon', glow = false, style, accessibilityLabel }: BarProps) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}
      style={[styles.well, { height, borderRadius: height / 2 }, style]}
    >
      {pct > 0 ? (
        <LinearGradient
          colors={gradients[gradient] as unknown as [string, string]}
          style={[
            { width: `${Math.max(pct * 100, 6)}%`, height: '100%', borderRadius: height / 2 },
            glow && { shadowColor: gradients[gradient][0], shadowOpacity: 0.7, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
          ]}
        />
      ) : null}
    </View>
  );
}

interface SegmentsProps {
  total: number;
  done: number;
  current?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** Barre segmentée (quêtes 3 sur 5, question 4 sur 10). */
export function Segments({ total, done, current, height = 12, style, accessibilityLabel }: SegmentsProps) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: total, now: done }}
      style={[styles.segments, style]}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < done;
        const isCurrent = current === i;
        return isDone ? (
          <LinearGradient key={i} colors={gradients.treasure as unknown as [string, string]} style={[styles.seg, { height, borderRadius: height / 2 }]} />
        ) : (
          <View
            key={i}
            style={[
              styles.seg,
              styles.segEmpty,
              { height, borderRadius: height / 2 },
              isCurrent && { backgroundColor: color.primary, borderTopWidth: 0 },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  well: {
    backgroundColor: color.bgSunken,
    borderTopWidth: 3,
    borderTopColor: 'rgba(0,0,0,0.45)',
    overflow: 'hidden',
  },
  segments: { flexDirection: 'row', gap: 5 },
  seg: { flex: 1 },
  segEmpty: { backgroundColor: color.bgSunken, borderTopWidth: 3, borderTopColor: 'rgba(0,0,0,0.45)' },
});
