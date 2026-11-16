import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { BottomTabInset, color, font, radius, screenPadding } from '@/constants/theme';
import { DAILY_GAMES, DAILY_POINT_CAP, DEMO_QUIZ_POINTS_TODAY, QUIZ_CATEGORIES } from '@/constants/games';
import { useAuth } from '@/hooks/useAuth';
import { useMidnightCountdown } from '@/hooks/useCountdown';
import {
  Avatar,
  avatarIndexFor,
  Bar,
  BladeButton,
  CategoryCard,
  CornerTicks,
  Diagonal,
  Dots,
  Icon,
  Kicker,
  PlayerHeader,
  PosterText,
  Relief,
  Screen,
  Segments,
  SpeedLines,
  Tag,
  Txt,
} from '@/components/ui';

/** Écran 6 · Accueil — planche manga (missions, ki, entraînement, prime). */
export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const countdown = useMidnightCountdown();

  const username = profile?.username || 'Joueur';
  const avatar = avatarIndexFor(profile?.username, profile?.avatar_url);
  const done = DAILY_GAMES.filter((g) => g.state === 'done' || g.state === 'failed').length;
  const questPoints = DAILY_GAMES.reduce((sum, g) => sum + (g.state === 'done' ? g.score ?? 0 : 0), 0);
  const nextGame = DAILY_GAMES.find((g) => g.state === 'todo');
  const capLeft = Math.max(0, DAILY_POINT_CAP - DEMO_QUIZ_POINTS_TODAY);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <PlayerHeader
          username={username}
          avatar={avatar}
          level={profile?.level ?? 1}
          currentXp={profile?.currentXp ?? 0}
          nextLevelXp={profile?.nextLevelXp ?? 1500}
          points={profile?.points ?? 0}
          notifications={3}
          onPressNotifications={() => Alert.alert('Notifications', 'Les notifications arrivent bientôt.')}
        />

        {/* Case héros : missions du jour */}
        <Pressable
          onPress={() => router.push('/(tabs)/daily' as Href)}
          accessibilityRole="button"
          accessibilityLabel={`Missions du jour : ${done} sur 5 terminées, ${questPoints} points. Fin dans ${countdown}`}
        >
          <View style={styles.inkFrame}>
            <Relief level="hero" face={color.bgRaised} radius={22} contentStyle={styles.hero}>
              <Diagonal points="0,0 70,0 40,100 0,100" gradient="flame" />
              <SpeedLines cx={30} cy={48} color="rgba(0,0,0,0.18)" count={44} thickness={0.45} />
              <Dots style={styles.heroDots} />
              <PosterText text="MISSION" size={88} stroke="rgba(255,255,255,0.35)" style={styles.heroPoster} />
              <Avatar index={avatar} size={182} style={styles.heroAvatar} />
              <View style={styles.heroTopRow}>
                <View style={styles.timer}>
                  <Icon name="schedule" size={16} color={color.xp} />
                  <Txt style={styles.timerText}>{countdown}</Txt>
                </View>
                <Tag label="Rang S" bg={color.gold} ink={color.goldInk} icon="star" />
              </View>
              <View style={styles.heroBottom}>
                <Kicker jp="ミッション" label="Missions · デイリー" tone={color.white} />
                <Txt variant="h1" style={styles.heroTitle}>
                  Missions du jour
                </Txt>
                <Segments total={5} done={done} height={10} accessibilityLabel={`${done} missions sur 5`} />
                <View style={styles.heroStats}>
                  <Txt style={styles.heroBig}>{done}/5</Txt>
                  <Txt style={styles.heroSmall}>· {questPoints} / 300 pts</Txt>
                </View>
              </View>
              <CornerTicks tint={color.gold} size={14} inset={10} />
            </Relief>
          </View>
        </Pressable>

        {nextGame ? (
          <BladeButton
            label={`Mission suivante : ${nextGame.title}`}
            icon="play"
            size="l"
            fullWidth
            onPress={() => router.push('/(tabs)/daily' as Href)}
          />
        ) : null}

        {/* Ki du jour (plafond) */}
        <View style={styles.cap}>
          <View style={styles.capHead}>
            <Kicker jp="気" label="Ki du jour" tone={color.gold} />
            <Txt style={styles.capValue}>
              {DEMO_QUIZ_POINTS_TODAY}
              <Txt style={styles.capMax}> / {DAILY_POINT_CAP}</Txt>
            </Txt>
          </View>
          <Bar value={DEMO_QUIZ_POINTS_TODAY / DAILY_POINT_CAP} gradient="treasure" accessibilityLabel="Ki du jour, plafond de points" />
          <Txt variant="small">Encore {capLeft} points à encaisser avant minuit.</Txt>
        </View>

        {/* Entraînement libre (quiz) */}
        <View style={styles.sectionRow}>
          <View style={styles.flex}>
            <Kicker jp="トレーニング" label="Entraînement" tone={color.secondary} />
            <Txt variant="h2" style={styles.sectionTitle}>
              Entraînement libre
            </Txt>
          </View>
          <BladeButton variant="ghost" label="Tout voir" onPress={() => router.push('/(tabs)/quiz' as Href)} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cats} style={styles.catsScroll}>
          {QUIZ_CATEGORIES.slice(0, 4).map((c) => (
            <CategoryCard key={c.id} category={c} style={styles.cat} onPress={() => router.push('/(tabs)/quiz' as Href)} />
          ))}
        </ScrollView>

        {/* Prime hebdo (classement) */}
        <Pressable
          onPress={() => router.push('/(tabs)/leaderboard')}
          accessibilityRole="button"
          accessibilityLabel="Ta prime cette semaine : 3e. Ouvrir le classement"
          style={({ pressed }) => [styles.rank, pressed && { opacity: 0.85 }]}
        >
          <SpeedLines cx={18} cy={50} color="rgba(255,201,51,0.07)" count={30} thickness={0.5} />
          <Txt style={styles.rankNum}>#3</Txt>
          <View style={styles.flex}>
            <Kicker jp="ランキング" label="Prime hebdo" tone={color.gold} />
            <Txt style={styles.rankTitle}>Ta prime cette semaine</Txt>
            <Txt variant="small">40 pts derrière le 2e chasseur</Txt>
          </View>
          <View style={styles.stack}>
            <Avatar index={1} size={30} />
            <Avatar index={0} size={30} style={styles.stacked} />
            <Avatar index={5} size={30} style={styles.stacked} />
          </View>
          <Icon name="chevronRight" color={color.text3} />
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: BottomTabInset + 16, gap: 18 },
  inkFrame: { borderRadius: 24, borderWidth: 3, borderColor: color.edge, backgroundColor: color.edge, padding: 0 },
  hero: { height: 236, overflow: 'hidden', borderRadius: 22 },
  heroDots: { left: '42%' },
  heroPoster: { position: 'absolute', left: -6, top: 2, opacity: 0.9 },
  heroAvatar: { position: 'absolute', right: -22, bottom: -30 },
  heroTopRow: {
    position: 'absolute',
    left: 14,
    right: 14,
    top: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(13,10,30,0.6)',
  },
  timerText: { fontFamily: font.bodyHeavy, fontSize: 13, lineHeight: 16, color: color.white, fontVariant: ['tabular-nums'] },
  heroBottom: { position: 'absolute', left: 16, bottom: 16, width: 216, gap: 8 },
  heroTitle: { color: color.white },
  heroStats: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  heroBig: { fontFamily: font.poster, fontSize: 34, lineHeight: 40, color: color.white },
  heroSmall: { fontFamily: font.bodyHeavy, fontSize: 13, lineHeight: 16, color: '#FFE0D2' },
  cap: {
    borderRadius: radius.lg,
    backgroundColor: color.surface1,
    padding: 16,
    gap: 10,
    borderWidth: 2,
    borderColor: color.edge,
  },
  capHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  capValue: { fontFamily: font.display, fontSize: 22, lineHeight: 26, color: color.gold },
  capMax: { fontFamily: font.display, fontSize: 15, lineHeight: 18, color: color.text3 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8, marginBottom: -6 },
  sectionTitle: { marginTop: 2 },
  catsScroll: { marginHorizontal: -screenPadding },
  cats: { paddingHorizontal: screenPadding, gap: 12, paddingBottom: 6 },
  cat: { width: 150 },
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 76,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: color.surface1,
    borderWidth: 2,
    borderColor: color.edge,
    overflow: 'hidden',
  },
  rankNum: { fontFamily: font.poster, fontSize: 36, lineHeight: 42, color: color.gold },
  rankTitle: { fontFamily: font.bodyHeavy, fontSize: 15, lineHeight: 20, color: color.text1, marginTop: 2 },
  stack: { flexDirection: 'row' },
  stacked: { marginLeft: -10 },
});
