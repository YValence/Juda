import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { color, editorial } from '@/constants/theme';
import { Icon, IconName } from './Icon';
import { CountBadge } from './Pills';

interface IconButtonProps {
  icon: IconName;
  accessibilityLabel: string;
  onPress?: () => void;
  badge?: number;
  blade?: boolean;
  tint?: string;
  style?: StyleProp<ViewStyle>;
}

/** Bouton icône 44 × 44 en relief posé. */
export function IconButton({ icon, accessibilityLabel, onPress, badge = 0, blade = false, tint = color.text1, style }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.btn,
        blade && { transform: [{ skewX: editorial.skewPanel }], borderRadius: 10 },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={blade ? { transform: [{ skewX: editorial.unskewPanel }] } : undefined}>
        <Icon name={icon} size={24} color={tint} />
      </View>
      <CountBadge count={badge} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: color.surface2,
    borderBottomWidth: 4,
    borderBottomColor: color.edge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { borderBottomWidth: 1, marginTop: 3, height: 41 },
});
