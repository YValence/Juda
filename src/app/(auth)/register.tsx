import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { color, radius, screenPadding } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { BladeButton, Field, Icon, IconButton, Kicker, PosterText, Relief, Screen, Tag, Txt } from '@/components/ui';

type FieldKey = 'username' | 'email' | 'password' | 'code';

/** Écran 4 · Inscription (intensité moyenne), erreurs par champ. */
export default function RegisterScreen() {
  const router = useRouter();
  const { register, error, clearError } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const clearFieldError = (k: FieldKey) => setErrors((e) => ({ ...e, [k]: undefined }));

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    const u = username.trim();
    if (u.length < 3 || u.length > 20) next.username = 'Le pseudo doit faire entre 3 et 20 caractères.';
    if (!email.trim() || !email.includes('@')) next.email = "Cet email n'est pas valide.";
    if (password.length < 8) next.password = 'Le mot de passe doit faire au moins 8 caractères.';
    if (!activationCode.trim()) next.code = "Le code d'activation est obligatoire.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    clearError();
    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const res = await register(username.trim(), email.trim(), password, activationCode.trim());
    setIsSubmitting(false);

    if (res.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)');
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const goToLogin = () => {
    clearError();
    if (router.canGoBack()) router.back();
    else router.replace('/(auth)/login');
  };

  const codeLooksValid = activationCode.trim().length >= 4;
  const passwordOk = password.length >= 8;

  return (
    <Screen edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.topBar}>
            <IconButton icon="back" accessibilityLabel="Retour" blade onPress={goToLogin} />
          </View>

          <View style={styles.header}>
            <PosterText text="NOUVEAU" size={110} stroke="rgba(255,255,255,0.10)" style={styles.poster} />
            <Tag label="Accès sur invitation" icon="key" bg={color.secondaryFace} />
            <Kicker jp="新規" label="Nouveau héros" tone={color.secondary} />
            <Txt variant="display">Crée ton profil</Txt>
            <Txt variant="body">Ton code d'activation t'a été donné par l'organisateur du groupe.</Txt>
          </View>

          <Relief level="thick" gradient="surface" radius={radius.xl} contentStyle={styles.card}>
            {error ? (
              <View style={styles.errorBox} accessibilityLiveRegion="polite">
                <Icon name="error" size={20} color={color.dangerText} />
                <Txt variant="small" tone={color.text1} style={styles.flex}>
                  {error}
                </Txt>
              </View>
            ) : null}

            <Field
              label="Pseudo"
              icon="person"
              placeholder="KazeNoTora"
              autoCapitalize="none"
              maxLength={20}
              counter
              value={username}
              error={errors.username}
              help="Entre 3 et 20 caractères."
              onChangeText={(t) => {
                setUsername(t);
                clearFieldError('username');
              }}
            />
            <Field
              label="Email"
              icon="mail"
              placeholder="nom@exemple.fr"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              error={errors.email}
              onChangeText={(t) => {
                setEmail(t);
                clearFieldError('email');
              }}
            />
            <Field
              label="Mot de passe"
              icon="lock"
              placeholder="8 caractères minimum"
              password
              autoComplete="new-password"
              value={password}
              error={errors.password}
              valid={passwordOk}
              validMessage="8 caractères minimum : c'est bon."
              onChangeText={(t) => {
                setPassword(t);
                clearFieldError('password');
              }}
            />
            <Field
              label="Code d'activation"
              icon="key"
              placeholder="JUDA2026"
              autoCapitalize="characters"
              autoCorrect={false}
              value={activationCode}
              error={errors.code}
              valid={codeLooksValid}
              validMessage="Format valide. Le code sera vérifié à l'inscription."
              onChangeText={(t) => {
                setActivationCode(t.toUpperCase());
                clearFieldError('code');
              }}
              onSubmitEditing={handleRegister}
            />

            <BladeButton label="Créer mon compte" icon="sparkles" size="l" fullWidth loading={isSubmitting} onPress={handleRegister} style={styles.submit} />
            <BladeButton variant="ghost" label="J'ai déjà un compte" onPress={goToLogin} />
          </Relief>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: screenPadding, paddingTop: 8, paddingBottom: 40, gap: 20 },
  topBar: { flexDirection: 'row' },
  header: { gap: 10 },
  poster: { position: 'absolute', right: -60, top: -30 },
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
});
