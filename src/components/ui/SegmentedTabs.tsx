import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { color, font, gradient } from '@/constants/theme';
import { Txt } from './Txt';

interface SegmentedTabsProps<K extends string> {
  options: { key: K; label: string }[];
  value: K;
  onChange: (key: K) => void;
}

/** Onglets en capsule dans un puits ; l'actif est une pastille électrique. */
export function SegmentedTabs<K extends string>({ options, value, onChange }: SegmentedTabsProps<K>) {
  return (
    <View accessibilityRole="tablist" style={styles.well}>
      {options.map((o) => {
        const active = o.key === value;
        return (
          <Pressable
            key={o.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              onChange(o.key);
            }}
            style={styles.tab}
          >
            {active ? (
              <View style={styles.activeEdge}>
                <LinearGradient colors={gradient.volt as unknown as [string, string]} style={styles.activeFace}>
                  <Txt style={styles.activeLabel}>{o.label}</Txt>
                </LinearGradient>
              </View>
            ) : (
              <Txt style={styles.label}>{o.label}</Txt>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  well: {
    flexDirection: 'row',
    gap: 4,
    padding: 5,
    borderRadius: 999,
    backgroundColor: color.bgSunken,
    borderTopWidth: 3,
    borderTopColor: 'rgba(0,0,0,0.45)',
  },
  tab: { flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' },
  activeEdge: { alignSelf: 'stretch', flex: 1, borderRadius: 999, backgroundColor: color.secondaryEdge, paddingBottom: 3 },
  activeFace: { flex: 1, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  activeLabel: { fontFamily: font.display, fontSize: 16, lineHeight: 20, color: color.white },
  label: { fontFamily: font.bodyHeavy, fontSize: 15, lineHeight: 20, color: color.text2 },
});
