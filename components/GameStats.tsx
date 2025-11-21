
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
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.card, colors.cardLight]}
        style={styles.statCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.statIcon}>🎯</Text>
        <Text style={styles.statLabel}>Level</Text>
        <Text style={styles.statValue}>{level}</Text>
      </LinearGradient>
      
      <LinearGradient
        colors={[colors.card, colors.cardLight]}
        style={styles.statCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.statIcon}>⭐</Text>
        <Text style={styles.statLabel}>Score</Text>
        <Text style={styles.statValue}>{score}</Text>
      </LinearGradient>
      
      <LinearGradient
        colors={[colors.card, colors.cardLight]}
        style={styles.statCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.statIcon}>🏆</Text>
        <Text style={styles.statLabel}>Best</Text>
        <Text style={styles.statValue}>{highScore}</Text>
      </LinearGradient>
      
      <LinearGradient
        colors={[colors.card, colors.cardLight]}
        style={styles.statCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.statIcon}>📏</Text>
        <Text style={styles.statLabel}>Length</Text>
        <Text style={styles.statValue}>{sequenceLength}</Text>
      </LinearGradient>
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
