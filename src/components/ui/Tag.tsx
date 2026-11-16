import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { color, editorial, font } from '@/constants/theme';
import { Icon, IconName } from './Icon';
import { Txt } from './Txt';

interface TagProps {
  label: string;
  bg?: string;
  ink?: string;
  icon?: IconName;
  outline?: string;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

/** Étiquette inclinée de la couche éditoriale (« Nouveau », « Niv. 14 », compteurs). */
export function Tag({ label, bg = color.primary, ink = color.white, icon, outline, size = 'sm', style }: TagProps) {
  const h = size === 'sm' ? 24 : 30;
  return (
    <View
      style={[
        styles.tag,
        {
          height: h,
          backgroundColor: outline ? 'transparent' : bg,
          borderWidth: outline ? 2 : 0,
          borderColor: outline,
        },
        style,
      ]}
    >
      <View style={styles.inner}>
        {icon ? <Icon name={icon} size={size === 'sm' ? 14 : 16} color={outline ?? ink} /> : null}
        <Txt
          style={{
            fontFamily: font.bodyHeavy,
            fontSize: size === 'sm' ? 11 : 13,
            lineHeight: size === 'sm' ? 14 : 16,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: outline ?? ink,
          }}
        >
          {label}
        </Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 4,
    transform: [{ skewX: editorial.skewPanel }],
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    transform: [{ skewX: editorial.unskewPanel }],
  },
});
