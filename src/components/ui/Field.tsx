import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { color, font, radius } from '@/constants/theme';
import { Icon, IconName } from './Icon';
import { Tag } from './Tag';
import { Txt } from './Txt';

interface FieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  icon?: IconName;
  error?: string | null;
  valid?: boolean;
  validMessage?: string;
  help?: string;
  counter?: boolean;
  /** Ajoute le bouton œil pour afficher ou masquer le mot de passe. */
  password?: boolean;
}

/** Champ « puits à repères » (planche 06b). */
export function Field({
  label,
  icon,
  error,
  valid = false,
  validMessage,
  help,
  counter = false,
  password = false,
  value,
  maxLength,
  onFocus,
  onBlur,
  ...input
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [shown, setShown] = useState(false);

  const state = error ? 'error' : valid ? 'valid' : focused ? 'focus' : 'idle';
  const tagBg = state === 'error' ? color.dangerFace : state === 'valid' ? color.successFace : state === 'focus' ? color.primary : color.surface2;
  const borderColor = state === 'error' ? color.danger : state === 'valid' ? color.success : state === 'focus' ? color.primary : color.bgSunken;
  const iconTint = state === 'focus' ? color.primary : state === 'valid' ? color.success : state === 'error' ? color.danger : color.text3;

  return (
    <View style={styles.group}>
      <Tag label={label} bg={tagBg} ink={state === 'idle' ? color.text2 : color.white} />
      <View style={[styles.box, { borderColor }]}>
        {state === 'focus' ? (
          <>
            <View style={[styles.tick, styles.tickTL]} />
            <View style={[styles.tick, styles.tickBR]} />
          </>
        ) : null}
        {icon ? <Icon name={icon} size={20} color={iconTint} /> : null}
        <TextInput
          {...input}
          value={value}
          maxLength={maxLength}
          accessibilityLabel={label}
          secureTextEntry={password ? !shown : input.secureTextEntry}
          placeholderTextColor={color.placeholder}
          selectionColor={color.primary}
          style={styles.input}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        {counter && maxLength ? (
          <Txt variant="small" style={styles.counter}>
            {(value ?? '').length}/{maxLength}
          </Txt>
        ) : null}
        {state === 'error' && !password ? <Icon name="error" size={20} color={color.danger} /> : null}
        {state === 'valid' && !password ? <Icon name="checkCircle" size={20} color={color.success} /> : null}
        {password ? (
          <Pressable
            onPress={() => setShown((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={shown ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            style={styles.eye}
            hitSlop={4}
          >
            <Icon name={shown ? 'visibilityOff' : 'visibility'} size={20} color={color.text2} />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <View style={styles.help}>
          <Icon name="error" size={16} color={color.dangerText} />
          <Txt variant="small" tone={color.dangerText} style={styles.helpText}>
            {error}
          </Txt>
        </View>
      ) : valid && validMessage ? (
        <View style={styles.help}>
          <Icon name="checkCircle" size={16} color={color.success} />
          <Txt variant="small" tone={color.success} style={styles.helpText}>
            {validMessage}
          </Txt>
        </View>
      ) : help ? (
        <Txt variant="small" tone={color.text3} style={styles.helpText}>
          {help}
        </Txt>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: 8 },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 56,
    paddingHorizontal: 16,
    borderRadius: radius.md - 2,
    backgroundColor: color.bgSunken,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    color: color.text1,
    fontFamily: font.bodyBold,
    fontSize: 17,
    padding: 0,
  },
  counter: { fontSize: 12, color: color.text3 },
  eye: { width: 44, height: 44, marginRight: -10, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  tick: { position: 'absolute', width: 12, height: 12, borderColor: color.gold },
  tickTL: { left: -7, top: -7, borderTopWidth: 3, borderLeftWidth: 3 },
  tickBR: { right: -7, bottom: -7, borderBottomWidth: 3, borderRightWidth: 3 },
  help: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  helpText: { fontFamily: font.bodyBold, fontSize: 13, lineHeight: 18 },
});
