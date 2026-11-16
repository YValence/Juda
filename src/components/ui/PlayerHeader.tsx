import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { color, font } from '@/constants/theme';
import { Avatar } from './Avatar';
import { IconButton } from './IconButton';
import { PointsPill } from './Pills';
import { Txt } from './Txt';

interface PlayerHeaderProps {
  username: string;
  avatar: number;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  points: number;
  notifications?: number;
  onPressNotifications?: () => void;
}

/** En-tête avec solde de points : avatar à anneau d'XP, pseudo, niveau, solde, cloche. */
export function PlayerHeader({ username, avatar, level, currentXp, nextLevelXp, points, notifications = 0, onPressNotifications }: PlayerHeaderProps) {
  const pct = nextLevelXp > 0 ? Math.max(0, Math.min(1, currentXp / nextLevelXp)) : 0;
  const size = 52;
  const r = size / 2 - 2;
  const c = 2 * Math.PI * r;
  return (
    <View style={styles.row}>
      <View accessibilityLabel={`Niveau ${level}, ${currentXp} sur ${nextLevelXp} XP`} style={{ width: size, height: size }}>
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
          <Circle cx={size / 2} cy={size / 2} r={r} stroke={color.surface3} strokeWidth={3} fill="none" />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color.secondary}
            strokeWidth={3}
            fill="none"
            strokeDasharray={`${c * pct} ${c}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <Avatar index={avatar} size={size - 10} style={styles.avatar} />
        <View style={styles.level}>
          <Txt style={styles.levelText}>{level}</Txt>
        </View>
      </View>
      <View style={styles.info}>
        <Txt numberOfLines={1} style={styles.name}>
          {username}
        </Txt>
        <Txt style={styles.xp}>
          Niv. {level} · {currentXp} / {nextLevelXp} XP
        </Txt>
      </View>
      <PointsPill points={points} />
      <IconButton icon="notifications" accessibilityLabel={notifications > 0 ? `Notifications, ${notifications} nouvelles` : 'Notifications'} badge={notifications} onPress={onPressNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { position: 'absolute', left: 5, top: 5 },
  level: {
    position: 'absolute',
    right: -6,
    bottom: -4,
    paddingHorizontal: 5,
    minWidth: 22,
    height: 20,
    borderRadius: 7,
    backgroundColor: color.secondaryFace,
    borderWidth: 2,
    borderColor: color.bgTop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: { fontFamily: font.display, fontSize: 12, lineHeight: 14, color: color.white },
  info: { flex: 1, minWidth: 0 },
  name: { fontFamily: font.bodyHeavy, fontSize: 16, lineHeight: 20, color: color.text1 },
  xp: { fontFamily: font.bodyBold, fontSize: 12, lineHeight: 16, color: color.secondary },
});
