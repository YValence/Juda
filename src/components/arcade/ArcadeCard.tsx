import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ArcadeTheme } from '@/constants/theme';

export interface ArcadeGameCardData {
  id: string;
  title: string;
  levelBadge: string;
  subtitle?: string;
  type: 'mystery_character' | 'mystery_technique' | 'quote' | 'emoji' | 'price_game';
  accentColor: string;
  completed?: boolean;
}

interface ArcadeCardProps {
  game: ArcadeGameCardData;
  onPress: (game: ArcadeGameCardData) => void;
}

export const ArcadeCard: React.FC<ArcadeCardProps> = ({ game, onPress }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress(game);
  };

  // Rendu de l'illustration centrale mystère selon le type de jeu
  const renderVisualCenter = () => {
    switch (game.type) {
      case 'mystery_character':
        return (
          <View style={styles.visualContainer}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.3)', 'rgba(0, 210, 255, 0.15)']}
              style={styles.silhouetteAura}
            >
              <Ionicons name="person" size={54} color="rgba(255, 255, 255, 0.25)" />
              <View style={styles.questionMarkOverlay}>
                <Text style={styles.questionMarkText}>?</Text>
              </View>
            </LinearGradient>
            {game.subtitle && (
              <View style={styles.guessHintBadge}>
                <Text style={styles.guessHintText}>{game.subtitle}</Text>
              </View>
            )}
          </View>
        );

      case 'mystery_technique':
        return (
          <View style={styles.visualContainer}>
            {/* Roue des compétences style LoL / Manga */}
            <View style={styles.techWheel}>
              <View style={[styles.techKeyBadge, { top: -4, alignSelf: 'center' }]}>
                <Text style={styles.techKeyText}>Q</Text>
              </View>
              <View style={[styles.techKeyBadge, { right: -4, top: 22 }]}>
                <Text style={styles.techKeyText}>W</Text>
              </View>
              <View style={[styles.techKeyBadge, { bottom: -4, alignSelf: 'center' }]}>
                <Text style={styles.techKeyText}>R</Text>
              </View>
              <View style={[styles.techKeyBadge, { left: -4, top: 22 }]}>
                <Text style={styles.techKeyText}>E</Text>
              </View>
              <LinearGradient
                colors={['rgba(0, 210, 255, 0.3)', 'rgba(19, 27, 47, 0.9)']}
                style={styles.techCenterCircle}
              >
                <Ionicons name="flash" size={26} color={ArcadeTheme.primary} />
              </LinearGradient>
            </View>
          </View>
        );

      case 'quote':
        return (
          <View style={styles.visualContainer}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.3)', 'rgba(255, 107, 107, 0.15)']}
              style={styles.silhouetteAura}
            >
              <Ionicons name="chatbubbles" size={44} color="rgba(255, 255, 255, 0.3)" />
              <Text style={styles.quoteMarkText}>“</Text>
            </LinearGradient>
          </View>
        );

      case 'emoji':
        return (
          <View style={styles.visualContainer}>
            <View style={styles.pixelGrid}>
              <View style={styles.pixelRow}>
                <View style={[styles.pixelCell, styles.pixelCellActive]} />
                <View style={[styles.pixelCell, styles.pixelCellActive]} />
                <View style={[styles.pixelCell, styles.pixelCellActive]} />
              </View>
              <View style={styles.pixelRow}>
                <View style={styles.pixelCell} />
                <View style={[styles.pixelCell, styles.pixelCellActive]} />
                <View style={styles.pixelCell} />
              </View>
              <View style={styles.pixelRow}>
                <View style={styles.pixelCell} />
                <View style={[styles.pixelCell, styles.pixelCellActive]} />
                <View style={styles.pixelCell} />
              </View>
            </View>
          </View>
        );

      case 'price_game':
        return (
          <View style={styles.visualContainer}>
            <LinearGradient
              colors={['rgba(0, 245, 160, 0.25)', 'rgba(0, 210, 255, 0.15)']}
              style={styles.silhouetteAura}
            >
              <Ionicons name="scale-outline" size={44} color="#00F5A0" />
            </LinearGradient>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {/* Badge supérieur de niveau (ex: • NIV. 1) */}
      <View style={styles.badgeRow}>
        <View style={styles.levelPill}>
          <View style={[styles.levelDot, { backgroundColor: game.accentColor }]} />
          <Text style={styles.levelText}>{game.levelBadge}</Text>
        </View>

        {game.completed && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#00F5A0" />
          </View>
        )}
      </View>

      {/* Titre du défi */}
      <Text style={styles.title} numberOfLines={1}>
        {game.title}
      </Text>

      {/* Visuel central stylisé */}
      <View style={styles.centerWrapper}>{renderVisualCenter()}</View>

      {/* Flèche d'action vers le bas */}
      <View style={styles.bottomArrowRow}>
        <Ionicons name="arrow-forward" size={18} color={ArcadeTheme.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 170,
    height: 250,
    backgroundColor: 'rgba(19, 27, 47, 0.85)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  badgeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  levelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  levelText: {
    color: ArcadeTheme.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  completedBadge: {
    position: 'absolute',
    right: 0,
  },
  title: {
    color: ArcadeTheme.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  visualContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  silhouetteAura: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  questionMarkOverlay: {
    position: 'absolute',
  },
  questionMarkText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    opacity: 0.8,
  },
  quoteMarkText: {
    position: 'absolute',
    color: ArcadeTheme.secondary,
    fontSize: 48,
    fontWeight: '900',
    opacity: 0.7,
  },
  guessHintBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  guessHintText: {
    color: ArcadeTheme.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  techWheel: {
    width: 100,
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  techKeyBadge: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  techKeyText: {
    color: ArcadeTheme.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  techCenterCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.4)',
  },
  pixelGrid: {
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pixelRow: {
    flexDirection: 'row',
    gap: 4,
  },
  pixelCell: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  pixelCellActive: {
    backgroundColor: ArcadeTheme.primary,
    shadowColor: ArcadeTheme.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  bottomArrowRow: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 4,
  },
});
