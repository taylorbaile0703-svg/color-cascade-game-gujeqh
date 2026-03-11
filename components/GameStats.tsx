
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';

interface GameStatsProps {
  level: number;
  score: number;
  highScore: number;
  sequenceLength: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  level,
  score,
  highScore,
  sequenceLength,
}) => {
  const stats = [
    { icon: '🎯', label: 'Level', value: level },
    { icon: '⭐', label: 'Score', value: score },
    { icon: '🏆', label: 'Best', value: highScore },
    { icon: '📏', label: 'Length', value: sequenceLength },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <LinearGradient
          key={stat.label}
          colors={[colors.card, colors.cardLight]}
          style={styles.statCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statIcon}>{stat.icon}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
          <Text style={styles.statValue}>{stat.value}</Text>
        </LinearGradient>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    borderRadius: 16,
    padding: 16,
    minWidth: 75,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.cardLight,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    color: colors.text,
    fontWeight: '900',
  },
});
