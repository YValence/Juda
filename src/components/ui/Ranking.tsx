import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color, font, podium as podiumColors, radius } from '@/constants/theme';
import { Avatar } from './Avatar';
import { PosterText } from './Editorial';
import { Icon } from './Icon';
import { formatPoints } from './Pills';
import { Txt } from './Txt';

export interface RankedPlayer {
  rank: number;
  username: string;
  points: number;
  avatar: number;
  isCurrentUser?: boolean;
  trend?: number;
}

const PLACE = { 1: podiumColors.gold, 2: podiumColors.silver, 3: podiumColors.bronze } as const;

/** Podium « socles + titre géant » (planche 11, variante recommandée). */
export function Podium({ players }: { players: RankedPlayer[] }) {
  const order = [players[1], players[0], players[2]].filter(Boolean) as RankedPlayer[];
  return (
    <View style={styles.podium}>
      <PosterText text="TOP 3" size={104} stroke="rgba(255,255,255,0.12)" style={styles.poster} />
      <View style={styles.row}>
        {order.map((p) => {
          const c = PLACE[p.rank as 1 | 2 | 3] ?? podiumColors.bronze;
          const first = p.rank === 1;
          const h = first ? 150 : p.rank === 2 ? 116 : 96;
          const size = first ? 84 : 66;
          return (
            <View key={p.rank} style={styles.col} accessibilityLabel={`${p.rank}e : ${p.username}, ${p.points} points`}>
              <View style={styles.avatarWrap}>
                {first ? <Icon name="crown" size={36} color={color.gold} style={styles.crown} /> : null}
                <Avatar index={p.avatar} size={size} ring={c.ring} ringWidth={4} />
              </View>
              <View style={[styles.plinthEdge, { backgroundColor: c.edge, height: h + 6 }]}>
                <LinearGradient colors={[c.hi, c.face]} style={[styles.plinth, { height: h }]}>
                  <View style={styles.diamond}>
                    <Txt style={[styles.diamondText, { color: c.ring }]}>{p.rank}</Txt>
                  </View>
                  <Txt numberOfLines={1} style={[styles.name, { color: c.ink }]}>
                    {p.username}
                  </Txt>
                  <Txt style={[styles.pts, { color: c.ink }]}>{formatPoints(p.points)}</Txt>
                </LinearGradient>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/** Ligne de classement. */
export function RankRow({ player }: { player: RankedPlayer }) {
  const me = player.isCurrentUser;
  const trend = player.trend ?? 0;
  return (
    <View
      accessibilityLabel={`${player.rank}e : ${player.username}${me ? ' (toi)' : ''}, ${player.points} points`}
      style={[styles.rankRow, me && styles.rankRowMe]}
    >
      <Txt style={[styles.rankNum, me && { color: color.primary }]}>{player.rank}</Txt>
      <Avatar index={player.avatar} size={44} />
      <View style={styles.rankInfo}>
        <Txt numberOfLines={1} style={styles.rankName}>
          {player.username}
        </Txt>
        {me ? <Txt variant="label" tone={color.link}>Toi</Txt> : null}
      </View>
      {trend !== 0 ? (
        <View style={styles.trend}>
          <Icon name={trend > 0 ? 'arrowUp' : 'arrowDown'} size={20} color={trend > 0 ? color.success : color.dangerText} />
          <Txt style={[styles.trendText, { color: trend > 0 ? color.success : color.dangerText }]}>{Math.abs(trend)}</Txt>
        </View>
      ) : null}
      <Txt style={styles.rankPts}>{formatPoints(player.points)}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  podium: { borderRadius: radius.lg, overflow: 'hidden', paddingTop: 24, paddingHorizontal: 12, paddingBottom: 12 },
  poster: { position: 'absolute', top: 0, alignSelf: 'center' },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 40 },
  col: { flex: 1, alignItems: 'center' },
  avatarWrap: { alignItems: 'center', marginBottom: -12, zIndex: 1 },
  crown: { marginBottom: -8, transform: [{ rotate: '-8deg' }] },
  plinthEdge: { alignSelf: 'stretch', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  plinth: {
    alignItems: 'center',
    paddingTop: 22,
    gap: 2,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 3,
    borderTopColor: 'rgba(255,255,255,0.45)',
  },
  diamond: { width: 32, height: 32, borderRadius: 8, backgroundColor: color.bgBase, transform: [{ rotate: '45deg' }], alignItems: 'center', justifyContent: 'center' },
  diamondText: { fontFamily: font.poster, fontSize: 18, lineHeight: 24, transform: [{ rotate: '-45deg' }] },
  name: { fontFamily: font.bodyHeavy, fontSize: 13, lineHeight: 18, marginTop: 6, paddingHorizontal: 4 },
  pts: { fontFamily: font.display, fontSize: 17, lineHeight: 20 },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 64,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: color.surface2,
    borderBottomWidth: 4,
    borderBottomColor: color.edge,
  },
  rankRowMe: { borderWidth: 2, borderColor: color.primary, borderBottomWidth: 4, borderBottomColor: color.primaryEdge },
  rankNum: { width: 30, textAlign: 'center', fontFamily: font.poster, fontSize: 22, lineHeight: 28, color: color.text2 },
  rankInfo: { flex: 1, minWidth: 0 },
  rankName: { fontFamily: font.bodyHeavy, fontSize: 16, lineHeight: 20, color: color.text1 },
  trend: { flexDirection: 'row', alignItems: 'center' },
  trendText: { fontFamily: font.bodyHeavy, fontSize: 12, lineHeight: 16 },
  rankPts: { fontFamily: font.display, fontSize: 22, lineHeight: 26, color: color.text1, minWidth: 64, textAlign: 'right' },
});
