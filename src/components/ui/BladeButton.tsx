import React from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { color, editorial, font, radius } from '@/constants/theme';
import { Icon, IconName } from './Icon';
import { Txt } from './Txt';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'gold' | 'success' | 'ghost';
export type ButtonSize = 's' | 'm' | 'l';

const SIZES = {
  s: { height: 44, padding: 18, fontSize: 16, edge: 4, icon: 18 },
  m: { height: 52, padding: 24, fontSize: 19, edge: 5, icon: 20 },
  l: { height: 60, padding: 30, fontSize: 22, edge: 6, icon: 24 },
} as const;

const VARIANTS: Record<Exclude<ButtonVariant, 'ghost'>, { colors: [string, string]; pressed: [string, string]; edge: string; ink: string }> = {
  primary: { colors: [color.primaryHi, color.primaryFace], pressed: ['#F0602F', color.primaryPressed], edge: color.primaryEdge, ink: color.white },
  secondary: { colors: [color.surface3, color.surface2], pressed: [color.surface2, color.surface2], edge: color.edge, ink: color.white },
  danger: { colors: [color.dangerHi, color.dangerFace], pressed: ['#F05A70', '#B01E37'], edge: color.dangerEdge, ink: color.white },
  gold: { colors: [color.goldHi, color.goldFace], pressed: ['#F5D060', '#D88E08'], edge: color.goldEdge, ink: color.goldInk },
  success: { colors: [color.success, color.successFace], pressed: ['#35C870', '#12703A'], edge: color.successEdge, ink: color.white },
};

interface BladeButtonProps {
  label?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Lame inclinée (style éditorial). Mettre false pour un bouton droit. */
  blade?: boolean;
  /** Bouton carré ne contenant qu'une icône. */
  iconOnly?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Bouton « lame en relief » (planche 06b). */
export function BladeButton({
  label,
  onPress,
  variant = 'primary',
  size = 'm',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  blade = true,
  iconOnly = false,
  accessibilityLabel,
  style,
}: BladeButtonProps) {
  const s = SIZES[size];
  const inactive = disabled || loading;

  if (variant === 'ghost') {
    return (
      <Pressable
        onPress={onPress}
        disabled={inactive}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: inactive, busy: loading }}
        style={({ pressed }) => [styles.ghost, { minHeight: 44 }, pressed && styles.ghostPressed, style]}
      >
        <View style={styles.ghostDash} />
        {loading ? (
          <ActivityIndicator color={color.link} />
        ) : (
          <Txt style={[styles.ghostLabel, disabled && { color: color.textDisabled }]}>{label}</Txt>
        )}
      </Pressable>
    );
  }

  const v = VARIANTS[variant];
  const skew = blade ? [{ skewX: editorial.skewPanel }] : [];
  const unskew = blade ? [{ skewX: editorial.unskewPanel }] : [];
  const r = blade ? radius.blade : size === 'l' ? radius.lg : size === 'm' ? 18 : 14;

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress?.();
      }}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={[fullWidth ? styles.full : styles.auto, { height: s.height + s.edge, marginHorizontal: blade && fullWidth ? 8 : 0 }, style]}
    >
      {({ pressed }) => {
        const down = pressed && !inactive;
        return (
          <View
            style={{
              marginTop: down ? s.edge - 2 : 0,
              paddingBottom: down ? 2 : s.edge,
              borderRadius: r,
              backgroundColor: disabled ? color.surface1 : v.edge,
              transform: skew,
            }}
          >
            <LinearGradient
              colors={disabled ? [color.surface2, color.surface2] : down ? v.pressed : v.colors}
              locations={[0, 0.55]}
              style={[
                styles.face,
                {
                  height: s.height,
                  borderRadius: r,
                  paddingHorizontal: iconOnly ? 0 : s.padding,
                  width: iconOnly ? s.height : undefined,
                  borderTopColor: down || disabled ? 'transparent' : 'rgba(255,255,255,0.35)',
                },
              ]}
            >
              <View style={[styles.content, { transform: unskew }]}>
                {loading ? (
                  <ActivityIndicator color={v.ink} />
                ) : (
                  <>
                    {icon ? <Icon name={icon} size={s.icon} color={disabled ? color.textDisabled : v.ink} /> : null}
                    {label && !iconOnly ? (
                      <Txt
                        numberOfLines={1}
                        style={{
                          fontFamily: font.display,
                          fontSize: s.fontSize,
                          lineHeight: s.fontSize + 4,
                          color: disabled ? color.textDisabled : v.ink,
                          textShadowColor: variant === 'primary' && !disabled ? 'rgba(110,20,0,0.45)' : 'transparent',
                          textShadowOffset: { width: 0, height: 2 },
                          textShadowRadius: 0,
                        }}
                      >
                        {label}
                      </Txt>
                    ) : null}
                    {iconRight ? <Icon name={iconRight} size={s.icon} color={disabled ? color.textDisabled : v.ink} /> : null}
                  </>
                )}
              </View>
            </LinearGradient>
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  full: { alignSelf: 'stretch' },
  auto: { alignSelf: 'flex-start' },
  face: { alignItems: 'center', justifyContent: 'center', borderTopWidth: 2 },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  ghost: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 8, paddingHorizontal: 12, borderRadius: 12 },
  ghostPressed: { backgroundColor: 'rgba(255,138,92,0.14)' },
  ghostDash: { width: 14, height: 3, backgroundColor: color.primary, transform: [{ skewX: '-30deg' }] },
  ghostLabel: { fontFamily: font.bodyHeavy, fontSize: 16, lineHeight: 20, color: color.link },
});
