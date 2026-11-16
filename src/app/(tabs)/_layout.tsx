import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { color } from '@/constants/theme';
import { TabBar } from '@/components/ui';

/** Barre du bas à 5 onglets : dock éditorial flottant (planche 06b). */
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: color.bgBase } }}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="quiz" options={{ title: 'Quiz' }} />
      <Tabs.Screen name="daily" options={{ title: 'Missions' }} />
      <Tabs.Screen name="leaderboard" options={{ title: 'Classement' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
