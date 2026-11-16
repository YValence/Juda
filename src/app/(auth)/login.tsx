import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { color, font, radius, screenPadding } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, BladeButton, Field, Icon, Kicker, PosterText, Relief, Screen, Tag, Txt } from '@/components/ui';

/** Écran 3 · Connexion (intensité moyenne). */
export default function LoginScreen() {
  const router = useRouter();
  const { login, loginAsGuest, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setLocalError('Renseigne ton email et ton mot de passe.');
      return;
    }
    setLocalError(null);
    clearError();
    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const res = await login(email.trim(), password);
    setIsSubmitting(false);

    if (res.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)');
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleGuestMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    loginAsGuest();
    router.replace('/(tabs)');
  };

  const message = localError || error;

  return (
    <Screen edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <PosterText text="JOUER" size={120} stroke="rgba(255,255,255,0.10)" style={styles.poster} />
            <View style={styles.avatars}>
              <Avatar index={0} size={56} style={styles.av1} />
              <Avatar index={1} size={72} style={styles.av2} />
              <Avatar index={5} size={56} style={styles.av3} />
            </View>
            <Tag label="Juda Arcade" icon="gamepad" />
            <Kicker jp="ログイン" label="Connexion" tone={color.primary} />
            <Txt variant="display" style={styles.title}>
              Bon retour !
            </Txt>
            <Txt variant="body">Connecte-toi pour retrouver tes points, tes missions et ton rang.</Txt>
          </View>

          <Relief level="thick" gradient="surface" radius={radius.xl} contentStyle={styles.card}>
            {message ? (
              <View style={styles.errorBox} accessibilityLiveRegion="polite">
                <Icon name="error" size={20} color={color.dangerText} />
                <Txt variant="small" tone={color.text1} style={styles.flex}>
                  {message}
                </Txt>
              </View>
            ) : null}

            <Field
              label="Email"
              icon="mail"
              placeholder="nom@exemple.fr"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setLocalError(null);
              }}
            />
            <Field
              label="Mot de passe"
              icon="lock"
              placeholder="Ton mot de passe"
              password
              autoComplete="password"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setLocalError(null);
              }}
              onSubmitEditing={handleLogin}
            />

            <BladeButton label="Se connecter" size="l" fullWidth loading={isSubmitting} onPress={handleLogin} style={styles.submit} />

            <BladeButton
              variant="ghost"
              label="Pas encore de compte ? S'inscrire"
              onPress={() => {
                clearError();
                router.push('/(auth)/register');
              }}
            />
          </Relief>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Txt variant="label">ou</Txt>
            <View style={styles.line} />
          </View>

          <BladeButton variant="secondary" label="Essayer en mode démo" icon="bolt" fullWidth onPress={handleGuestMode} />
          <Txt variant="small" align="center" tone={color.text3} style={styles.demoNote}>
            Le mode démo ne sauvegarde pas ta progression.
          </Txt>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 40, gap: 20 },
  header: { gap: 10, paddingTop: 8 },
  poster: { position: 'absolute', right: -40, top: -6 },
  avatars: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 },
  av1: { transform: [{ rotate: '-6deg' }] },
  av2: { marginLeft: -12, zIndex: 1 },
  av3: { marginLeft: -12, transform: [{ rotate: '6deg' }] },
  title: { marginTop: 4 },
  card: { padding: 20, gap: 18 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: radius.md,
    backgroundColor: color.dangerTint,
    borderWidth: 2,
    borderColor: color.danger,
  },
  submit: { marginTop: 4 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  line: { flex: 1, height: 1, backgroundColor: color.line },
  demoNote: { fontFamily: font.body, marginTop: -8 },
});
