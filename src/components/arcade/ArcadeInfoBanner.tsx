import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ArcadeTheme } from '@/constants/theme';

export const ArcadeInfoBanner: React.FC = () => {
  const [hideChrono, setHideChrono] = useState(false);

  const toggleSwitch = (val: boolean) => {
    Haptics.selectionAsync();
    setHideChrono(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <View style={styles.clockIconBox}>
          <Ionicons name="stopwatch-outline" size={18} color={ArcadeTheme.primary} />
        </View>
      </View>

      <View style={styles.contentCol}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Les parties sont chronométrées</Text>
          <View style={styles.betaBadge}>
            <Text style={styles.betaText}>BÊTA PLUS</Text>
          </View>
        </View>

        <Text style={styles.desc}>
          Le chrono démarre à l'ouverture d'un défi. Retrouve ton temps dans l'onglet Classement.
        </Text>

        <View style={styles.switchRow}>
          <Switch
            value={hideChrono}
            onValueChange={toggleSwitch}
            trackColor={{ false: '#1A243D', true: ArcadeTheme.primary }}
            thumbColor={'#FFFFFF'}
            style={styles.switch}
          />
          <Text style={styles.switchLabel}>
            Masquer le chrono pendant la partie{' '}
            <Text style={styles.switchSublabel}>• Tu restes classé</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginVertical: 6,
    backgroundColor: 'rgba(19, 27, 47, 0.75)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  leftCol: {
    paddingTop: 2,
  },
  clockIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCol: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  title: {
    color: ArcadeTheme.text,
    fontSize: 13,
    fontWeight: '800',
  },
  betaBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  betaText: {
    color: ArcadeTheme.secondary,
    fontSize: 9,
    fontWeight: '800',
  },
  desc: {
    color: ArcadeTheme.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  switch: {
    transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
  },
  switchLabel: {
    color: ArcadeTheme.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  switchSublabel: {
    color: ArcadeTheme.textMuted,
    fontSize: 10,
  },
});
