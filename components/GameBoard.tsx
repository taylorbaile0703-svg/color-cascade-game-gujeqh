
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { ColorButton } from './ColorButton';
import { GameColor } from '@/types/game';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';

interface GameBoardProps {
  availableColors: GameColor[];
  sequence: string[];
  playerSequence: string[];
  isShowingSequence: boolean;
  isPlayerTurn: boolean;
  onColorPress: (colorId: string) => void;
  gamePhase: 'idle' | 'showing' | 'playing' | 'correct' | 'incorrect';
}

const { width } = Dimensions.get('window');
const BUTTON_SIZE = Math.min((width - 100) / 3, 110);

export const GameBoard: React.FC<GameBoardProps> = ({
  availableColors,
  sequence,
  playerSequence,
  isShowingSequence,
  isPlayerTurn,
  onColorPress,
  gamePhase,
}) => {
  const [activeColorIndex, setActiveColorIndex] = useState<number>(-1);
  const fadeAnim = new Animated.Value(1);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    if (isShowingSequence && sequence.length > 0) {
      showSequenceAnimation();
    }
  }, [isShowingSequence, sequence]);

  useEffect(() => {
    if (gamePhase === 'correct') {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [gamePhase]);

  const showSequenceAnimation = async () => {
    const baseDelay = Math.max(800 - (sequence.length * 10), 400);
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, baseDelay));
      const colorIndex = availableColors.findIndex(c => c.id === sequence[i]);
      setActiveColorIndex(colorIndex);
      
      await new Promise(resolve => setTimeout(resolve, baseDelay * 0.6));
      setActiveColorIndex(-1);
    }
  };

  const getStatusMessage = () => {
    switch (gamePhase) {
      case 'showing':
        return '👀 Watch the sequence...';
      case 'playing':
        return '🎮 Your turn! Repeat the sequence';
      case 'correct':
        return '🎉 Perfect! Next level...';
      case 'incorrect':
        return '💫 Try again!';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (gamePhase) {
      case 'correct':
        return colors.success;
      case 'incorrect':
        return colors.error;
      default:
        return colors.text;
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusMessage()}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {sequence.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    index < playerSequence.length
                      ? colors.primary
                      : colors.cardLight,
                  transform: [{ scale: index < playerSequence.length ? 1.2 : 1 }],
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.colorGrid}>
        {availableColors.map((colorItem, index) => (
          <ColorButton
            key={colorItem.id}
            color={colorItem.color}
            onPress={() => onColorPress(colorItem.id)}
            disabled={!isPlayerTurn}
            isActive={activeColorIndex === index}
            size={BUTTON_SIZE}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  statusContainer: {
    marginBottom: 30,
    minHeight: 60,
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.cardLight,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 300,
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    margin: 5,
    boxShadow: '0px 2px 6px rgba(168, 85, 247, 0.4)',
    elevation: 3,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 450,
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 30,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.cardLight,
  },
});
