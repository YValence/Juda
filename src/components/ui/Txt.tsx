import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { color, type } from '@/constants/theme';

export type TxtVariant = keyof typeof type;

interface TxtProps extends TextProps {
  variant?: TxtVariant;
  tone?: string;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

/** Texte de la charte : choisir une variante de l'échelle typographique. */
export function Txt({ variant = 'body', tone, align, style, ...rest }: TxtProps) {
  const base = type[variant] as TextStyle;
  const defaultTone =
    variant === 'body' || variant === 'small' ? color.text2 : variant === 'label' || variant === 'micro' ? color.text3 : color.text1;
  return (
    <Text
      {...rest}
      style={[styles.reset, base, { color: tone ?? defaultTone }, align ? { textAlign: align } : null, style]}
    />
  );
}

const styles = StyleSheet.create({
  reset: { includeFontPadding: false },
});
