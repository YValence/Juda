import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { color, editorial, font, gradient } from '@/constants/theme';
import { Icon, IconName } from './Icon';
import { Txt } from './Txt';

const ICONS: Record<string, IconName> = {
  index: 'home',
  quiz: 'quiz',
  daily: 'swords',
  leaderboard: 'leaderboard',
  profile: 'person',
};

/** Dock éditorial flottant (planche 06b) : l'onglet actif est une lame flamme. */
export function TabBar({ state, descriptors, emitter, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.edge}>
        <LinearGradient colors={gradient.surface as unknown as [string, string]} style={styles.dock}>
          {state.routes.map((route, i) => {
            const focused = state.index === i;
            const { options } = descriptors[route.key];
            const label = typeof options.title === 'string' ? options.title : route.name;
            const icon = ICONS[route.name] ?? 'home';
            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={label}
                onPress={() => {
                  const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                  if (!focused && !event.defaultPrevented) {
                    Haptics.selectionAsync().catch(() => {});
                    navigateToTab(route.key);
                  }
                }}
                style={styles.tab}
              >
                {focused ? (
                  <View style={styles.bladeEdge}>
                    <LinearGradient colors={gradient.flame as unknown as [string, string]} style={styles.blade}>
                      <View style={{ transform: [{ skewX: editorial.unskewPanel }] }}>
                        <Icon name={icon} size={28} color={color.white} />
                      </View>
                    </LinearGradient>
                  </View>
                ) : (
                  <Icon name={icon} size={24} color={color.text3} />
                )}
                <Txt numberOfLines={1} style={focused ? styles.labelActive : styles.label}>
                  {label}
                </Txt>
              </Pressable>
            );
          })}
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 10 },
  edge: {
    borderRadius: 22,
    backgroundColor: color.edge,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  dock: { flexDirection: 'row', alignItems: 'center', height: 72, borderRadius: 22, paddingHorizontal: 4, borderTopWidth: 2, borderTopColor: 'rgba(255,255,255,0.12)' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, minHeight: 60 },
  bladeEdge: { marginTop: -30, borderRadius: 10, backgroundColor: color.primaryEdge, paddingBottom: 5, transform: [{ skewX: editorial.skewPanel }] },
  blade: { width: 56, height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderTopWidth: 2, borderTopColor: 'rgba(255,255,255,0.35)' },
  label: { fontFamily: font.bodyHeavy, fontSize: 11, lineHeight: 14, color: color.text3 },
  labelActive: { fontFamily: font.poster, fontSize: 12, lineHeight: 16, letterSpacing: 0.8, textTransform: 'uppercase', color: color.white },
});
