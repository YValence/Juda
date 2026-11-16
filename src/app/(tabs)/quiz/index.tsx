import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabInset, color, font, radius, screenPadding } from '@/constants/theme';
import { DAILY_POINT_CAP, DEMO_QUIZ_POINTS_TODAY, QUIZ_CATEGORIES } from '@/constants/games';
import { Bar, CategoryCard, CategoryData, Kicker, PosterText, Screen, SpeedLines, Tag, Txt } from '@/components/ui';

/** Écran 7 · Catégories de quiz (intensité moyenne). */
export default function QuizCategoriesScreen() {
  const left = Math.max(0, DAILY_POINT_CAP - DEMO_QUIZ_POINTS_TODAY);
  const capped = left === 0;

  const open = (c: CategoryData) =>
    Alert.alert(c.title, '10 questions, 15 secondes chacune. L’écran de partie arrive à la prochaine étape.', [{ text: 'OK' }]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <PosterText text="TRAINING" size={92} stroke="rgba(255,255,255,0.12)" style={styles.poster} />
          <Tag
            label={capped ? 'Ki au max' : `${left} pts restants`}
            bg={capped ? color.warning : color.primary}
            ink={capped ? color.warningInk : color.white}
          />
          <Kicker jp="トレーニング" label="Entraînement" tone={color.secondary} />
          <Txt variant="h1">Entraînement libre</Txt>
          <Txt variant="body">7 arènes, 10 questions par duel, 10 points par bonne réponse.</Txt>
        </View>

        <View style={styles.cap}>
          <SpeedLines cx={12} cy={50} color="rgba(255,201,51,0.07)" count={26} thickness={0.5} />
          <View style={styles.capRow}>
            <Kicker jp="気" label="Ki du jour" tone={color.gold} />
            <Txt style={styles.capValue}>
              {DEMO_QUIZ_POINTS_TODAY}
              <Txt style={styles.capMax}> / {DAILY_POINT_CAP}</Txt>
            </Txt>
          </View>
          <Bar value={DEMO_QUIZ_POINTS_TODAY / DAILY_POINT_CAP} gradient="treasure" accessibilityLabel="Plafond de points du jour" />
          {capped ? <Txt variant="small">Tu peux continuer à jouer pour t'entraîner, sans gagner de points.</Txt> : null}
        </View>

        <View style={styles.grid}>
          {QUIZ_CATEGORIES.map((c) => (
            <CategoryCard key={c.id} category={c} onPress={open} style={styles.cell} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: screenPadding, paddingTop: 16, paddingBottom: BottomTabInset + 16, gap: 18 },
  header: { gap: 8 },
  poster: { position: 'absolute', right: -16, top: -18 },
  cap: { borderRadius: radius.lg, backgroundColor: color.surface1, padding: 16, gap: 10, borderWidth: 2, borderColor: color.edge, overflow: 'hidden' },
  capRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  capValue: { fontFamily: font.display, fontSize: 22, lineHeight: 26, color: color.gold },
  capMax: { fontFamily: font.display, fontSize: 15, lineHeight: 18, color: color.text3 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cell: { width: '47.8%' },
});
