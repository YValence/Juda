import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { color, font, gradient } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { Diagonal, Dots, Icon, PosterText, Txt } from '@/components/ui';

/** Écran 1 · Démarrage : logo, nom, chargement. */
export default function EntryScreen() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={gradient.night as unknown as [string, string]} style={StyleSheet.absoluteFill} />
        <Diagonal points="0,0 100,0 100,38 0,62" gradient="voltDeep" opacity={0.35} />
        <Dots style={{ top: '50%' }} />
        <PosterText text="ARCADE" size={150} stroke="rgba(255,255,255,0.08)" style={styles.poster} />
        <View style={styles.center}>
          <View style={styles.logoEdge}>
            <LinearGradient colors={gradient.flame as unknown as [string, string]} style={styles.logo}>
              <Icon name="gamepad" size={64} color={color.white} />
            </LinearGradient>
            <LinearGradient colors={gradient.treasure as unknown as [string, string]} style={styles.star}>
              <Icon name="star" size={22} color={color.goldInk} />
            </LinearGradient>
          </View>
          <Txt style={styles.juda}>JUDA</Txt>
          <Txt style={styles.arcade}>ARCADE</Txt>
          <ActivityIndicator size="small" color={color.primary} style={{ marginTop: 20 }} accessibilityLabel="Chargement" />
        </View>
      </View>
    );
  }

  if (isAuthenticated) return <Redirect href="/(tabs)" />;
  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.bgBase, alignItems: 'center', justifyContent: 'center' },
  poster: { position: 'absolute', bottom: 80, left: -10 },
  center: { alignItems: 'center' },
  logoEdge: { borderRadius: 30, backgroundColor: color.primaryEdge, paddingBottom: 8, marginBottom: 22 },
  logo: { width: 112, height: 112, borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderTopWidth: 3, borderTopColor: 'rgba(255,255,255,0.35)' },
  star: { position: 'absolute', right: -12, top: -12, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  juda: { fontFamily: font.display, fontSize: 64, lineHeight: 64, color: color.white, textShadowColor: color.secondaryFace, textShadowOffset: { width: 0, height: 5 }, textShadowRadius: 0 },
  arcade: { fontFamily: font.display, fontSize: 64, lineHeight: 66, color: color.primary, textShadowColor: '#6E1A05', textShadowOffset: { width: 0, height: 5 }, textShadowRadius: 0 },
});
