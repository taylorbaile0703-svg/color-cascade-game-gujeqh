
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameBoard } from '@/components/GameBoard';
import { GameStats } from '@/components/GameStats';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function GameScreen() {
  const router = useRouter();
  const { gameState, availableColors, startGame, handleColorPress } = useGameLogic();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Color Memory Cascade</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {gameState.gamePhase === 'idle' ? (
          <View style={styles.startContainer}>
            <Text style={styles.title}>🎨 Color Memory Cascade</Text>
            <Text style={styles.subtitle}>
              Watch the color sequence, then repeat it!
            </Text>
            <Text style={styles.description}>
              - Levels get progressively harder{'\n'}
              - More colors unlock as you advance{'\n'}
              - Sequences get longer and faster{'\n'}
              - No losing - keep trying until you get it!
            </Text>
            
            {gameState.highScore > 0 && (
              <View style={styles.highScoreCard}>
                <Text style={styles.highScoreLabel}>Your Best Score</Text>
                <Text style={styles.highScoreValue}>{gameState.highScore}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <GameStats
              level={gameState.level}
              score={gameState.score}
              highScore={gameState.highScore}
              sequenceLength={gameState.sequence.length}
            />
            
            <GameBoard
              availableColors={availableColors}
              sequence={gameState.sequence}
              playerSequence={gameState.playerSequence}
              isShowingSequence={gameState.isShowingSequence}
              isPlayerTurn={gameState.isPlayerTurn}
              onColorPress={handleColorPress}
              gamePhase={gameState.gamePhase}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: colors.card,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  highScoreCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    alignItems: 'center',
    minWidth: 200,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  highScoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  highScoreValue: {
    fontSize: 36,
    color: colors.primary,
    fontWeight: '800',
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.3)',
    elevation: 4,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
});
