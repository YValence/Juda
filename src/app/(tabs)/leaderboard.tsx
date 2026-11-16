import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabInset, color, font, gradient, screenPadding } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import {
  Avatar,
  avatarIndexFor,
  Diagonal,
  formatPoints,
  Kicker,
  Podium,
  PosterText,
  RankedPlayer,
  RankRow,
  Screen,
  SegmentedTabs,
  SpeedLines,
  Tag,
  Txt,
} from '@/components/ui';

type PeriodType = 'weekly' | 'monthly' | 'alltime';

type Row = Omit<RankedPlayer, 'avatar'>;

// Données de démonstration : à remplacer par une requête Supabase.
const MOCK_LEADERBOARD: Record<PeriodType, Row[]> = {
  weekly: [
    { rank: 1, username: 'Mira', points: 1420, trend: 1 },
    { rank: 2, username: 'Kaze_99', points: 1280, trend: -1 },
    { rank: 3, username: 'Hana', points: 1190 },
    { rank: 4, username: 'Jun', points: 940, trend: 2 },
    { rank: 5, username: 'Hunter_01', points: 678, isCurrentUser: true, trend: 1 },
    { rank: 6, username: 'Daiki', points: 610, trend: -2 },
    { rank: 7, username: 'Yuki', points: 550 },
  ],
  monthly: [
    { rank: 1, username: 'Kaze_99', points: 4890 },
    { rank: 2, username: 'Mira', points: 4650 },
    { rank: 3, username: 'Hana', points: 4120 },
    { rank: 4, username: 'Hunter_01', points: 2840, isCurrentUser: true },
    { rank: 5, username: 'Jun', points: 2600 },
  ],
  alltime: [
    { rank: 1, username: 'Hana', points: 18450 },
    { rank: 2, username: 'Mira', points: 15300 },
    { rank: 3, username: 'Kaze_99', points: 14900 },
    { rank: 4, username: 'Hunter_01', points: 9680, isCurrentUser: true },
  ],
};

const PERIODS: { key: PeriodType; label: string }[] = [
  { key: 'weekly', label: 'Semaine' },
  { key: 'monthly', label: 'Mois' },
  { key: 'alltime', label: 'Général' },
];

/** Écran 18 · Classement (intensité forte). */
export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { profile } = useAuth();
  const [period, setPeriod] = useState<PeriodType>('weekly');

  const list: RankedPlayer[] = MOCK_LEADERBOARD[period].map((u) => ({
    ...u,
    username: u.isCurrentUser ? profile?.username ?? u.username : u.username,
    avatar: u.isCurrentUser ? avatarIndexFor(profile?.username ?? u.username, profile?.avatar_url) : avatarIndexFor(u.username),
  }));
  const topThree = list.slice(0, 3);
  const others = list.slice(3);
  const me = list.find((u) => u.isCurrentUser);
  const above = me ? list.find((u) => u.rank === me.rank - 1) : undefined;
  const gap = me && above ? above.points - me.points : 0;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} stickyHeaderIndices={[]}>
        <View style={styles.header}>
          <Diagonal points="0,0 66,0 40,100 0,100" gradient="voltDeep" style={styles.headerDiag} />
          <SpeedLines cx={26} cy={60} color="rgba(0,0,0,0.16)" count={36} thickness={0.45} />
          <PosterText text="RANG" size={110} stroke="rgba(255,255,255,0.18)" style={styles.poster} />
          <Tag label="Saison en cours" bg={color.secondaryFace} icon="star" />
          <View style={styles.titleRow}>
            <View>
              <Kicker jp="ランキング" label="Chasseurs" tone={color.white} />
              <Txt variant="h1">Classement</Txt>
            </View>
            {me ? <Txt style={styles.myRankBig}>#{me.rank}</Txt> : null}
          </View>
        </View>

        <SegmentedTabs options={PERIODS} value={period} onChange={setPeriod} />

        <Podium players={topThree} />

        <View style={styles.list}>
          {others.map((p) => (
            <RankRow key={`${period}-${p.rank}`} player={p} />
          ))}
        </View>
      </ScrollView>

      {me ? (
        <View style={[styles.myBar, { bottom: BottomTabInset - 8 + Math.max(insets.bottom - 12, 0) }]} accessibilityLabel={`Ton rang : ${me.rank}e avec ${me.points} points`}>
          <View style={styles.myEdge}>
            <LinearGradient colors={gradient.flame as unknown as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.myFace}>
              <Txt style={styles.myRank}>{me.rank}</Txt>
              <Avatar index={me.avatar} size={40} />
              <View style={styles.flex}>
                <Txt numberOfLines={1} style={styles.myName}>
                  Toi · {me.username}
                </Txt>
                <Txt style={styles.myHint}>{above ? `${gap} pts pour doubler le ${above.rank}e` : 'Tu domines l’arène !'}</Txt>
              </View>
              <Txt style={styles.myPts}>{formatPoints(me.points)}</Txt>
            </LinearGradient>
          </View>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: BottomTabInset + 96, gap: 16 },
  header: { borderRadius: 24, overflow: 'hidden', backgroundColor: color.bgRaised, padding: 18, gap: 6, minHeight: 130, justifyContent: 'flex-end' },
  headerDiag: { opacity: 1 },
  poster: { position: 'absolute', left: -6, bottom: -26 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  myRankBig: { fontFamily: font.poster, fontSize: 52, lineHeight: 58, color: color.gold },
  list: { gap: 10 },
  myBar: { position: 'absolute', left: 16, right: 16 },
  myEdge: { borderRadius: 18, backgroundColor: color.primaryEdge, paddingBottom: 5 },
  myFace: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 66, paddingHorizontal: 14, borderRadius: 18 },
  myRank: { fontFamily: font.poster, fontSize: 26, lineHeight: 32, color: color.white, width: 30, textAlign: 'center' },
  myName: { fontFamily: font.bodyHeavy, fontSize: 15, lineHeight: 20, color: color.white },
  myHint: { fontFamily: font.bodyBold, fontSize: 12, lineHeight: 16, color: '#FFE0D2' },
  myPts: { fontFamily: font.display, fontSize: 22, lineHeight: 26, color: color.white },
});
