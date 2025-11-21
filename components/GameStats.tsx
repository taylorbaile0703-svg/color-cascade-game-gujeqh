
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';

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
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Level</Text>
        <Text style={styles.statValue}>{level}</Text>
      </View>
      
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Score</Text>
        <Text style={styles.statValue}>{score}</Text>
      </View>
      
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Best</Text>
        <Text style={styles.statValue}>{highScore}</Text>
      </View>
      
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Length</Text>
        <Text style={styles.statValue}>{sequenceLength}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    minWidth: 70,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '800',
  },
});
