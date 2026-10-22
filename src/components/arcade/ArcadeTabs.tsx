import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ArcadeTheme } from '@/constants/theme';

export type MainTabType = 'games' | 'leaderboard' | 'history';
export type SubCategoryType = 'daily' | 'quiz' | 'duels';

interface ArcadeTabsProps {
  activeTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
  activeCategory: SubCategoryType;
  onCategoryChange: (cat: SubCategoryType) => void;
}

export const ArcadeTabs: React.FC<ArcadeTabsProps> = ({
  activeTab,
  onTabChange,
  activeCategory,
  onCategoryChange,
}) => {
  const handleTabPress = (tab: MainTabType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onTabChange(tab);
  };

  const handleCatPress = (cat: SubCategoryType) => {
    Haptics.selectionAsync();
    onCategoryChange(cat);
  };

  return (
    <View style={styles.container}>
      {/* 1. Capsule principale des 3 onglets (JEUX, CLASSEMENT, HISTORIQUE) */}
      <View style={styles.capsuleSwitcher}>
        <TouchableOpacity
          style={[styles.switcherTab, activeTab === 'games' && styles.switcherTabActive]}
          onPress={() => handleTabPress('games')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="game-controller"
            size={16}
            color={activeTab === 'games' ? '#FFFFFF' : ArcadeTheme.textSecondary}
          />
          <Text
            style={[styles.switcherTabText, activeTab === 'games' && styles.switcherTabTextActive]}
          >
            JEUX
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.switcherTab, activeTab === 'leaderboard' && styles.switcherTabActive]}
          onPress={() => handleTabPress('leaderboard')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="trophy"
            size={16}
            color={activeTab === 'leaderboard' ? '#FFFFFF' : ArcadeTheme.textSecondary}
          />
          <Text
            style={[
              styles.switcherTabText,
              activeTab === 'leaderboard' && styles.switcherTabTextActive,
            ]}
          >
            CLASSEMENT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.switcherTab, activeTab === 'history' && styles.switcherTabActive]}
          onPress={() => handleTabPress('history')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="time-outline"
            size={16}
            color={activeTab === 'history' ? '#FFFFFF' : ArcadeTheme.textSecondary}
          />
          <Text
            style={[styles.switcherTabText, activeTab === 'history' && styles.switcherTabTextActive]}
          >
            HISTORIQUE
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2. Filtres en pilule avec pastille lumineuse (Sous-catégories) */}
      {activeTab === 'games' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryPillsScroll}
        >
          <TouchableOpacity
            style={[styles.catPill, activeCategory === 'daily' && styles.catPillActive]}
            onPress={() => handleCatPress('daily')}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.dotIndicator,
                { backgroundColor: activeCategory === 'daily' ? ArcadeTheme.primary : '#515E7C' },
              ]}
            />
            <Text
              style={[
                styles.catPillText,
                activeCategory === 'daily' && styles.catPillTextActive,
              ]}
            >
              DÉFIS DU JOUR <Text style={styles.catCount}>5 JEUX</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.catPill, activeCategory === 'quiz' && styles.catPillActive]}
            onPress={() => handleCatPress('quiz')}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.dotIndicator,
                { backgroundColor: activeCategory === 'quiz' ? ArcadeTheme.secondary : '#515E7C' },
              ]}
            />
            <Text
              style={[styles.catPillText, activeCategory === 'quiz' && styles.catPillTextActive]}
            >
              QUIZ LIBRES <Text style={styles.catCount}>7 MODES</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.catPill, activeCategory === 'duels' && styles.catPillActive]}
            onPress={() => handleCatPress('duels')}
            activeOpacity={0.7}
          >
            <View style={[styles.dotIndicator, { backgroundColor: '#FFD700' }]} />
            <Text
              style={[styles.catPillText, activeCategory === 'duels' && styles.catPillTextActive]}
            >
              DUELS 1v1 <Text style={styles.catCount}>BIENTÔT</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 12,
  },
  capsuleSwitcher: {
    flexDirection: 'row',
    backgroundColor: 'rgba(19, 27, 47, 0.7)',
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  switcherTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  switcherTabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  switcherTabText: {
    color: ArcadeTheme.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  switcherTabTextActive: {
    color: '#FFFFFF',
  },
  categoryPillsScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 27, 47, 0.6)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    gap: 6,
  },
  catPillActive: {
    backgroundColor: 'rgba(0, 210, 255, 0.12)',
    borderColor: 'rgba(0, 210, 255, 0.35)',
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  catPillText: {
    color: ArcadeTheme.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  catPillTextActive: {
    color: '#FFFFFF',
  },
  catCount: {
    color: ArcadeTheme.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
});
