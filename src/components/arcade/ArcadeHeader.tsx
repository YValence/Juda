import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ArcadeTheme } from '@/constants/theme';

interface ArcadeHeaderProps {
  username?: string;
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
  points?: number;
}

export const ArcadeHeader: React.FC<ArcadeHeaderProps> = ({
  username = 'Hunter_01',
  level = 1,
  currentXp = 680,
  nextLevelXp = 2000,
  points = 350,
}) => {
  const xpPercent = Math.min(Math.max((currentXp / nextLevelXp) * 100, 5), 100);
  const remainingXp = nextLevelXp - currentXp;

  const handlePressIcon = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      {/* Ligne supérieure : Profil & Actions */}
      <View style={styles.topRow}>
        {/* Logo / Badge de raccourci */}
        <View style={styles.pillBadge}>
          <Ionicons name="game-controller" size={14} color={ArcadeTheme.primary} />
          <Text style={styles.pillBadgeText}>JUDA ARCADE</Text>
        </View>

        {/* Profil utilisateur à droite */}
        <View style={styles.userProfileContainer}>
          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={handlePressIcon}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={18} color={ArcadeTheme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userPill}
            onPress={handlePressIcon}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[ArcadeTheme.primary, ArcadeTheme.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
            </LinearGradient>
            <Text style={styles.usernameText}>{username}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Titre Principal & Jauge d'XP */}
      <View style={styles.heroRow}>
        <View style={styles.titleCol}>
          <View style={styles.appTitleWrapper}>
            <View style={styles.iconCircle}>
              <Ionicons name="game-controller" size={20} color={ArcadeTheme.primary} />
            </View>
            <Text style={styles.appTitle}>Juda Arcade</Text>
          </View>
          <Text style={styles.appSubtitle}>
            Des mini-jeux Manga & Anime, un nouveau défi chaque jour.
          </Text>
        </View>

        {/* Bloc Niveau & XP */}
        <View style={styles.xpBox}>
          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>NIV. GLOBAL {level}</Text>
            <Text style={styles.xpFraction}>
              {currentXp} <Text style={styles.xpTotal}>/ {nextLevelXp} XP</Text>
            </Text>
          </View>

          {/* Barre d'XP néon */}
          <View style={styles.xpBarTrack}>
            <LinearGradient
              colors={['#00F5A0', '#00D2FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.xpBarFill, { width: `${xpPercent}%` }]}
            />
          </View>

          <Text style={styles.xpSubtext}>
            Plus que {remainingXp} XP avant le niv. {level + 1}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 6,
  },
  pillBadgeText: {
    color: ArcadeTheme.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingRight: 12,
    paddingVertical: 3,
    paddingLeft: 4,
    gap: 8,
  },
  avatarGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  usernameText: {
    color: ArcadeTheme.text,
    fontSize: 13,
    fontWeight: '700',
  },
  heroRow: {
    gap: 14,
  },
  titleCol: {
    gap: 4,
  },
  appTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: ArcadeTheme.text,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: ArcadeTheme.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },
  xpBox: {
    backgroundColor: 'rgba(19, 27, 47, 0.7)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 12,
    gap: 6,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelLabel: {
    color: ArcadeTheme.text,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  xpFraction: {
    color: '#00F5A0',
    fontSize: 11,
    fontWeight: '800',
  },
  xpTotal: {
    color: ArcadeTheme.textMuted,
    fontWeight: '600',
  },
  xpBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  xpSubtext: {
    color: ArcadeTheme.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
});
