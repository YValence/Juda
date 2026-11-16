import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { BottomTabInset, color, editorial, font, gradient, radius, screenPadding } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import {
  Avatar,
  avatarIndexFor,
  Bar,
  BladeButton,
  CornerTicks,
  Dots,
  formatPoints,
  Icon,
  IconButton,
  Kicker,
  LevelBadge,
  PosterText,
  Screen,
  SpeedLines,
  StatTile,
  Tag,
  Txt,
} from '@/components/ui';

/** Écran 19 · Profil (intensité forte), avec la variante invité. */
export default function ProfileScreen() {
  const router = useRouter();
  const { profile, isGuest, logout } = useAuth();

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Se déconnecter ?', 'Tu pourras te reconnecter avec ton email et ton mot de passe.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Se déconnecter',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const username = profile?.username || 'Joueur';
  const avatar = avatarIndexFor(profile?.username, profile?.avatar_url);
  const points = profile?.points ?? 0;
  const level = profile?.level ?? 1;
  const currentXp = profile?.currentXp ?? 0;
  const nextLevelXp = profile?.nextLevelXp ?? 1500;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Kicker jp="プロフィール" label="Profil joueur" tone={color.secondary} />
          <IconButton icon="settings" accessibilityLabel="Réglages" onPress={() => Alert.alert('Réglages', 'Les réglages arrivent bientôt.')} />
        </View>

        {/* Fiche éditoriale */}
        <View style={styles.card}>
          <LinearGradient colors={['#1A1240', color.surface2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <SpeedLines cx={38} cy={54} color="rgba(0,0,0,0.14)" count={34} thickness={0.42} />
          <PosterText text={username.slice(0, 8)} size={120} stroke="rgba(140,107,255,0.22)" style={styles.cardPoster} />
          <View style={styles.portraitEdge}>
            <LinearGradient colors={gradient.flame as unknown as [string, string]} style={styles.portrait}>
              <Dots />
              <View style={styles.portraitAvatar}>
                <Avatar index={avatar} size={170} shape="square" />
              </View>
            </LinearGradient>
          </View>
          <CornerTicks inset={12} />
          <View style={styles.identity}>
            {isGuest ? <Tag label="Invité" bg={color.gold} ink={color.goldInk} /> : <LevelBadge level={level} />}
            <View style={styles.nameRow}>
              <View style={styles.accent} />
              <Txt numberOfLines={1} adjustsFontSizeToFit style={styles.name}>
                {username.toUpperCase()}
              </Txt>
            </View>
            <View style={styles.big}>
              <Txt style={styles.bigValue}>{formatPoints(points)}</Txt>
              <Txt variant="label">Points</Txt>
            </View>
          </View>
        </View>

        {/* Progression */}
        <View style={styles.panel}>
          <View style={styles.rowBetween}>
            <Txt variant="label">Niveau {level}</Txt>
            <Txt style={styles.xpText}>
              {currentXp} / {nextLevelXp} XP
            </Txt>
          </View>
          <Bar value={nextLevelXp > 0 ? currentXp / nextLevelXp : 0} glow accessibilityLabel="Progression vers le niveau suivant" />
          <Txt variant="small">Gagne de l'XP avec les missions et l'entraînement.</Txt>
        </View>

        {/* Statistiques (démo : à brancher sur Supabase) */}
        <View style={styles.grid}>
          <StatTile icon="quiz" tint={color.xp} value="12" label="Duels joués" />
          <StatTile icon="fire" tint={color.primary} value="4 j" label="Série" />
        </View>
        <View style={styles.grid}>
          <StatTile icon="leaderboard" tint={color.gold} value="#5" label="Rang semaine" />
          <StatTile icon="checkCircle" tint={color.success} value="87 %" label="Bonnes réponses" />
        </View>

        {isGuest ? (
          <Pressable
            onPress={() => router.push('/(auth)/register')}
            accessibilityRole="button"
            accessibilityLabel="Créer un compte pour sauvegarder ta progression"
            style={({ pressed }) => [styles.guest, pressed && { opacity: 0.9 }]}
          >
            <LinearGradient colors={gradient.treasure as unknown as [string, string]} style={styles.guestIcon}>
              <Icon name="sparkles" size={24} color={color.goldInk} />
            </LinearGradient>
            <View style={styles.flex}>
              <Txt style={styles.guestTitle}>Crée ton compte</Txt>
              <Txt variant="small">Le mode démo ne garde pas tes points.</Txt>
            </View>
            <Icon name="chevronRight" color={color.text2} />
          </Pressable>
        ) : null}

        <BladeButton label="Se déconnecter" variant="danger" icon="logout" fullWidth onPress={handleLogout} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: screenPadding, paddingTop: 8, paddingBottom: BottomTabInset + 16, gap: 16 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  card: { height: 260, borderRadius: radius.xl, overflow: 'hidden', borderBottomWidth: 8, borderBottomColor: color.edge },
  cardPoster: { position: 'absolute', right: -20, top: -14 },
  portraitEdge: { position: 'absolute', left: 22, top: 22, bottom: 22, width: 140, transform: [{ skewX: editorial.skewPortrait }], borderWidth: 3, borderColor: color.gold, overflow: 'hidden' },
  portrait: { flex: 1 },
  portraitAvatar: { position: 'absolute', left: -24, bottom: -8, transform: [{ skewX: '8deg' }] },
  identity: { position: 'absolute', left: 184, right: 16, top: 26, bottom: 22, gap: 10, justifyContent: 'space-between' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  accent: { width: 4, height: 44, backgroundColor: color.primary },
  name: { flex: 1, fontFamily: font.poster, fontSize: 40, lineHeight: 48, color: color.white },
  big: { gap: 0 },
  bigValue: { fontFamily: font.poster, fontSize: 40, lineHeight: 46, color: color.gold },
  panel: { borderRadius: radius.lg, backgroundColor: color.surface1, padding: 16, gap: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  xpText: { fontFamily: font.bodyHeavy, fontSize: 13, lineHeight: 16, color: color.xp },
  grid: { flexDirection: 'row', gap: 12 },
  guest: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: color.surface2, borderWidth: 2, borderColor: color.gold },
  guestIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  guestTitle: { fontFamily: font.display, fontSize: 20, lineHeight: 24, color: color.text1 },
});
