import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { color, gradient } from '@/constants/theme';

interface ScreenProps {
  children: React.ReactNode;
  edges?: Edge[];
}

/** Fond « Nuit » commun à tous les écrans. */
export function Screen({ children, edges = ['top', 'left', 'right'] }: ScreenProps) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <LinearGradient colors={gradient.night as unknown as [string, string]} locations={[0, 0.45]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safe} edges={edges}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bgBase },
  safe: { flex: 1 },
});
