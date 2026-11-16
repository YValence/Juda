import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabInset, color, font, gradient, radius, screenPadding } from '@/constants/theme';
import { DAILY_GAMES } from '@/constants/games';
import { useMidnightCountdown } from '@/hooks/useCountdown';
import { GameCard, GameCardData, Icon, Kicker, PosterText, Screen, Segments, SpeedLines, Tag, Txt } from '@/components/ui';

/** Écran 11 · Hub des quêtes quotidiennes (intensité moyenne). */
export default function DailyHubScreen() {
  const countdown = useMidnightCountdown();
  const finished = DAILY_GAMES.filter((g) => g.state === 'done' || g.state === 'failed').length;
  const total = DAILY_GAMES.reduce((s, g) => s + (g.state === 'done' ? g.score ?? 0 : 0), 0);
  const allDone = finished === DAILY_GAMES.length;

  const open = (g: GameCardData) => {
    if (g.state === 'done' || g.state === 'failed') {
      Alert.alert(g.title, 'Déjà joué aujourd’hui. Reviens après minuit pour une nouvelle mission.');
      return;
    }
    Alert.alert(g.title, `${g.description}\n\nL’écran de jeu arrive à la prochaine étape.`);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <PosterText text="MISSION" size={96} stroke="rgba(255,255,255,0.12)" style={styles.poster} />
          <View style={styles.timer}>
            <Icon name="schedule" size={16} color={color.xp} />
            <Txt style={styles.timerText}>Fin dans {countdown}</Txt>
          </View>
          <Kicker jp="ミッション" label="Missions · デイリー" tone={color.primary} />
          <Txt variant="h1">Missions du jour</Txt>
        </View>

        <View style={styles.progress}>
          <SpeedLines cx={14} cy={50} color="rgba(255,91,46,0.07)" count={28} thickness={0.5} />
          <View style={styles.progressRow}>
            <View style={styles.progressNum}>
              <Txt style={styles.big}>{finished}</Txt>
              <Txt style={styles.bigMuted}>/5</Txt>
            </View>
            <View style={styles.right}>
              <Txt variant="label">Butin du jour</Txt>
              <Txt style={styles.points}>
                {total}
                <Txt style={styles.pointsMax}> / 300</Txt>
              </Txt>
            </View>
          </View>
          <Segments
            total={5}
            done={finished}
            current={finished < 5 ? finished : undefined}
            accessibilityLabel={`${finished} quêtes sur 5`}
          />
        </View>

        {DAILY_GAMES.map((g, i) => (
          <GameCard key={g.id} game={g} index={i} total={DAILY_GAMES.length} onPress={open} />
        ))}

        <View style={[styles.reward, allDone && styles.rewardOn]}>
          <LinearGradient
            colors={(allDone ? gradient.treasure : [color.surface2, color.surface2]) as unknown as [string, string]}
            style={styles.rewardIcon}
          >
            <Icon name="redeem" size={30} color={allDone ? color.goldInk : color.text3} />
          </LinearGradient>
          <View style={styles.flex}>
            <Txt style={styles.rewardTitle}>Trésor 5 sur 5</Txt>
            <Txt variant="small">
              {allDone ? 'Bravo ! Ton trésor du jour est prêt.' : 'Termine les 5 missions pour le débloquer.'}
            </Txt>
          </View>
          <Tag label="Bientôt" bg={color.secondaryFace} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: screenPadding, paddingTop: 16, paddingBottom: BottomTabInset + 16, gap: 16 },
  header: { gap: 10 },
  poster: { position: 'absolute', right: -30, top: -18 },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    backgroundColor: color.surface1,
  },
  timerText: { fontFamily: font.bodyHeavy, fontSize: 13, lineHeight: 16, color: color.text1, fontVariant: ['tabular-nums'] },
  progress: { borderRadius: radius.lg, backgroundColor: color.surface1, padding: 16, gap: 12, borderWidth: 2, borderColor: color.edge, overflow: 'hidden' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  progressNum: { flexDirection: 'row', alignItems: 'baseline' },
  big: { fontFamily: font.poster, fontSize: 48, lineHeight: 56, color: color.white },
  bigMuted: { fontFamily: font.poster, fontSize: 26, lineHeight: 32, color: color.textDisabled },
  right: { alignItems: 'flex-end' },
  points: { fontFamily: font.display, fontSize: 26, lineHeight: 30, color: color.gold },
  pointsMax: { fontFamily: font.display, fontSize: 16, lineHeight: 20, color: color.text3 },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: color.bgRaised,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.surface3,
  },
  rewardOn: { borderStyle: 'solid', borderColor: color.gold },
  rewardIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  rewardTitle: { fontFamily: font.display, fontSize: 20, lineHeight: 24, color: color.text1 },
});
