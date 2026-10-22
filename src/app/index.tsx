import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArcadeTheme } from '@/constants/theme';
import { ArcadeHeader } from '@/components/arcade/ArcadeHeader';
import { ArcadeTabs, MainTabType, SubCategoryType } from '@/components/arcade/ArcadeTabs';
import { ArcadeInfoBanner } from '@/components/arcade/ArcadeInfoBanner';
import { ArcadeCard, ArcadeGameCardData } from '@/components/arcade/ArcadeCard';

// Données des 5 Défis Quotidiens (comme sur votre capture)
const DAILY_GAMES: ArcadeGameCardData[] = [
  {
    id: 'char_1',
    title: 'Perso mystère',
    levelBadge: '• NIV. 1',
    subtitle: 'Luffy ? Gojo ?',
    type: 'mystery_character',
    accentColor: ArcadeTheme.secondary,
  },
  {
    id: 'tech_1',
    title: 'Compétence mystère',
    levelBadge: '• NIV. 1',
    type: 'mystery_technique',
    accentColor: ArcadeTheme.primary,
  },
  {
    id: 'quote_1',
    title: 'Citation mystère',
    levelBadge: '• NIV. 1',
    type: 'quote',
    accentColor: '#FF6B6B',
  },
  {
    id: 'pixel_1',
    title: 'Pixel Manga',
    levelBadge: '• NIV. 1',
    type: 'emoji',
    accentColor: ArcadeTheme.primary,
  },
  {
    id: 'price_1',
    title: 'Juste prix',
    levelBadge: '• NIV. 1',
    type: 'price_game',
    accentColor: '#00F5A0',
  },
];

// Données des Quiz Thématiques Libres
const QUIZ_MODES: ArcadeGameCardData[] = [
  {
    id: 'quiz_culture',
    title: 'Culture G',
    levelBadge: '• 10 PTS',
    type: 'quote',
    accentColor: ArcadeTheme.primary,
  },
  {
    id: 'quiz_japon',
    title: 'Culture du Japon',
    levelBadge: '• 10 PTS',
    type: 'mystery_character',
    accentColor: '#FF6B6B',
  },
  {
    id: 'quiz_flags',
    title: 'Drapeaux',
    levelBadge: '• 10 PTS',
    type: 'emoji',
    accentColor: '#00F5A0',
  },
  {
    id: 'quiz_voices',
    title: 'Voix de persos',
    levelBadge: '• AUDIO',
    type: 'mystery_technique',
    accentColor: ArcadeTheme.secondary,
  },
  {
    id: 'quiz_anime',
    title: 'Reconnaître anime',
    levelBadge: '• IMAGE',
    type: 'mystery_character',
    accentColor: ArcadeTheme.primary,
  },
  {
    id: 'quiz_tactics',
    title: 'Tactiques',
    levelBadge: '• 10 PTS',
    type: 'mystery_technique',
    accentColor: '#FFD700',
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<MainTabType>('games');
  const [activeCategory, setActiveCategory] = useState<SubCategoryType>('daily');

  const handleGameSelect = (game: ArcadeGameCardData) => {
    Alert.alert(
      game.title,
      `Lancement du mini-jeu ${game.title} (Partie chronométrée pour le classement hebdomadaire).`,
      [{ text: 'Commencer !', style: 'default' }, { text: 'Annuler', style: 'cancel' }]
    );
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#080C16" />

      {/* Fond cosmique bleu nuit dégradé */}
      <LinearGradient
        colors={['#080C16', '#0E1426', '#080C16']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 1. Header Arcade : Profil, XP vert néon, Titre */}
          <ArcadeHeader
            username="Hunter_01"
            level={1}
            currentXp={678}
            nextLevelXp={2160}
            points={350}
          />

          {/* 2. Onglets Switcher (JEUX, CLASSEMENT, HISTORIQUE) + Pills */}
          <ArcadeTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* 3. Bannière chronomètre info */}
          <ArcadeInfoBanner />

          {/* 4. Section Défis Quotidiens */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Défis quotidien</Text>
            <View style={styles.todayPill}>
              <Text style={styles.todayPillText}>Aujourd'hui</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {DAILY_GAMES.map((game) => (
              <ArcadeCard
                key={game.id}
                game={game}
                onPress={handleGameSelect}
              />
            ))}
          </ScrollView>

          {/* 5. Section Quiz Libres */}
          <View style={[styles.sectionHeaderRow, { marginTop: 22 }]}>
            <Text style={styles.sectionTitle}>Quiz libres</Text>
            <Text style={styles.sectionSubtitle}>Entraînement & Points</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {QUIZ_MODES.map((quiz) => (
              <ArcadeCard
                key={quiz.id}
                game={quiz}
                onPress={handleGameSelect}
              />
            ))}
          </ScrollView>

          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#080C16',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 14,
    marginBottom: 10,
  },
  sectionTitle: {
    color: ArcadeTheme.text,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    color: ArcadeTheme.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  todayPill: {
    backgroundColor: 'rgba(0, 245, 160, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 160, 0.3)',
  },
  todayPillText: {
    color: '#00F5A0',
    fontSize: 11,
    fontWeight: '700',
  },
  cardsRow: {
    paddingHorizontal: 18,
    gap: 14,
  },
});
