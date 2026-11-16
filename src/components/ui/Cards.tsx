import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color, font, gradient as gradients, GradientName, radius } from '@/constants/theme';
import { Dots } from './Editorial';
import { Icon, IconName } from './Icon';
import { Relief } from './Relief';
import { Tag } from './Tag';
import { Txt } from './Txt';

export type GameState = 'todo' | 'done' | 'failed' | 'locked';

export interface GameCardData {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  gradient: GradientName;
  maxPoints: number;
  state: GameState;
  score?: number;
  meta?: string;
}

interface GameCardProps {
  game: GameCardData;
  index?: number;
  total?: number;
  onPress?: (game: GameCardData) => void;
  style?: StyleProp<ViewStyle>;
}

/** Carte de mini-jeu « relief illustré » (planche 08), avec ses états. */
export function GameCard({ game, index, total, onPress, style }: GameCardProps) {
  const locked = game.state === 'locked';
  const done = game.state === 'done';
  const failed = game.state === 'failed';
  const art = locked ? (['#1C1638', '#1C1638'] as const) : failed ? (['#4A4190', '#2C2560'] as const) : gradients[game.gradient];

  const badge = done
    ? { label: `+${game.score ?? 0}`, bg: color.successFace, ink: color.white, icon: 'checkCircle' as IconName }
    : failed
      ? { label: '0', bg: color.dangerFace, ink: color.white, icon: 'close' as IconName }
      : locked
        ? { label: 'Verrouillé', bg: color.surface3, ink: color.text2, icon: 'lock' as IconName }
        : { label: `${game.maxPoints}`, bg: color.gold, ink: color.goldInk, icon: 'toll' as IconName };

  return (
    <Pressable
      disabled={locked}
      onPress={() => onPress?.(game)}
      accessibilityRole="button"
      accessibilityState={{ disabled: locked }}
      accessibilityLabel={`${game.title}, ${locked ? 'verrouillé' : done ? `terminé, ${game.score ?? 0} points` : failed ? 'raté' : `jusqu'à ${game.maxPoints} points`}`}
      style={({ pressed }) => [pressed && !locked && { transform: [{ translateY: 3 }] }, style]}
    >
      <Relief
        level={locked || done || failed ? 'flat' : 'thick'}
        gradient={locked ? undefined : 'surface'}
        face={locked ? color.bgRaised : undefined}
        radius={radius.lg}
        style={game.state === 'todo' ? styles.todoRing : undefined}
        contentStyle={styles.clip}
      >
        <LinearGradient colors={art as unknown as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.art}>
          {!locked ? <Dots style={styles.dotsHalf} /> : null}
          <Icon name={game.icon} size={56} color={locked ? color.textDisabled : color.white} style={styles.artIcon} />
          {typeof index === 'number' && total ? (
            <View style={styles.counter}>
              <Txt style={styles.counterText}>
                {index + 1} / {total}
              </Txt>
            </View>
          ) : null}
          <View style={styles.badgeWrap}>
            <Tag label={badge.label} bg={badge.bg} ink={badge.ink} icon={badge.icon} />
          </View>
        </LinearGradient>
        <View style={styles.body}>
          <Txt variant="h2" tone={locked ? color.text3 : color.text1} style={styles.title}>
            {game.title}
          </Txt>
          <Txt variant="small" numberOfLines={2}>
            {game.meta ?? game.description}
          </Txt>
        </View>
      </Relief>
    </Pressable>
  );
}

export interface CategoryData {
  id: string;
  title: string;
  icon: IconName;
  gradient: GradientName;
  media: 'Texte' | 'Image' | 'Audio';
  gain: number;
}

/** Carte de catégorie de quiz « tuile illustrée ». */
export function CategoryCard({ category, onPress, style }: { category: CategoryData; onPress?: (c: CategoryData) => void; style?: StyleProp<ViewStyle> }) {
  const mediaIcon: IconName = category.media === 'Audio' ? 'volume' : category.media === 'Image' ? 'visibility' : 'quiz';
  return (
    <Pressable
      onPress={() => onPress?.(category)}
      accessibilityRole="button"
      accessibilityLabel={`${category.title}, ${category.media}, ${category.gain} points par bonne réponse`}
      style={({ pressed }) => [pressed && { transform: [{ translateY: 3 }] }, style]}
    >
      <Relief level="thick" gradient="surface" radius={radius.lg} contentStyle={styles.clip}>
        <LinearGradient colors={gradients[category.gradient] as unknown as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.catArt}>
          <Dots style={styles.dotsHalf} />
          <Icon name={category.icon} size={44} color={color.white} style={styles.catIcon} />
          <Txt style={styles.catGain}>+{category.gain}</Txt>
        </LinearGradient>
        <View style={styles.catBody}>
          <Txt numberOfLines={2} style={styles.catTitle}>
            {category.title}
          </Txt>
          <View style={styles.media}>
            <Icon name={mediaIcon} size={14} color={color.text2} />
            <Txt style={styles.mediaText}>{category.media}</Txt>
          </View>
        </View>
      </Relief>
    </Pressable>
  );
}

/** Carte de statistique plate : icône teintée, grand chiffre, libellé. */
export function StatTile({ icon, tint, value, label, style }: { icon: IconName; tint: string; value: string; label: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View accessibilityLabel={`${label} : ${value}`} style={[styles.stat, style]}>
      <View style={[styles.statIcon, { backgroundColor: tint + '2E' }]}>
        <Icon name={icon} size={22} color={tint} />
      </View>
      <Txt style={styles.statValue}>{value}</Txt>
      <Txt variant="label">{label}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
  todoRing: { borderWidth: 3, borderColor: color.primary },
  art: { height: 112, justifyContent: 'center', paddingLeft: 18, overflow: 'hidden' },
  dotsHalf: { left: '45%' },
  artIcon: { textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 0 },
  counter: { position: 'absolute', left: 12, top: 12, paddingHorizontal: 10, height: 26, borderRadius: 13, backgroundColor: 'rgba(13,10,30,0.55)', justifyContent: 'center' },
  counterText: { fontFamily: font.bodyHeavy, fontSize: 12, lineHeight: 16, color: color.white },
  badgeWrap: { position: 'absolute', right: 12, top: 12 },
  body: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, gap: 4 },
  title: { fontSize: 22, lineHeight: 26 },
  catArt: { height: 84, justifyContent: 'center', paddingLeft: 12, overflow: 'hidden' },
  catIcon: { textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 0 },
  catGain: { position: 'absolute', right: 10, bottom: 6, fontFamily: font.poster, fontSize: 22, lineHeight: 28, color: 'rgba(255,255,255,0.95)' },
  catBody: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 12, gap: 6 },
  catTitle: { fontFamily: font.display, fontSize: 16, lineHeight: 20, color: color.text1, minHeight: 40 },
  media: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', paddingHorizontal: 8, height: 24, borderRadius: 12, backgroundColor: color.surface1 },
  mediaText: { fontFamily: font.bodyHeavy, fontSize: 12, lineHeight: 16, color: color.text2 },
  stat: { flex: 1, borderRadius: radius.lg, backgroundColor: color.surface1, padding: 16, gap: 6 },
  statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontFamily: font.poster, fontSize: 32, lineHeight: 38, color: color.text1 },
});
