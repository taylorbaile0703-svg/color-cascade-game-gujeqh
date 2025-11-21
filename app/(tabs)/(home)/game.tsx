
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameBoard } from '@/components/GameBoard';
import { GameStats } from '@/components/GameStats';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';

export default function GameScreen() {
  const router = useRouter();
  const { gameState, availableColors, startGame, handleColorPress } = useGameLogic();

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundLight, colors.background]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
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
            <View style={styles.descriptionCard}>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>🎯</Text>
                <Text style={styles.featureText}>Levels get progressively harder</Text>
              </View>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>🌈</Text>
                <Text style={styles.featureText}>More colors unlock as you advance</Text>
              </View>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>⚡</Text>
                <Text style={styles.featureText}>Sequences get longer and faster</Text>
              </View>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>♾️</Text>
                <Text style={styles.featureText}>No losing - keep trying until you get it!</Text>
              </View>
            </View>
            
            {gameState.highScore > 0 && (
              <LinearGradient
                colors={[colors.card, colors.cardLight]}
                style={styles.highScoreCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.highScoreLabel}>🏆 Your Best Score</Text>
                <Text style={styles.highScoreValue}>{gameState.highScore}</Text>
              </LinearGradient>
            )}

            <TouchableOpacity 
              style={styles.startButtonWrapper} 
              onPress={startGame}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#a855f7', '#9333ea', '#7e22ce']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.startButton}
              >
                <Text style={styles.startButtonText}>Start Game</Text>
              </LinearGradient>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: 'rgba(30, 30, 63, 0.8)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  backButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
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
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(168, 85, 247, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  descriptionCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.cardLight,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    fontWeight: '500',
  },
  highScoreCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
    minWidth: 220,
    boxShadow: '0px 8px 24px rgba(168, 85, 247, 0.3)',
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  highScoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
    marginBottom: 12,
  },
  highScoreValue: {
    fontSize: 48,
    color: colors.primary,
    fontWeight: '900',
    textShadowColor: 'rgba(168, 85, 247, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  startButtonWrapper: {
    borderRadius: 30,
    boxShadow: '0px 12px 32px rgba(168, 85, 247, 0.5)',
    elevation: 10,
  },
  startButton: {
    paddingHorizontal: 56,
    paddingVertical: 18,
    borderRadius: 30,
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
