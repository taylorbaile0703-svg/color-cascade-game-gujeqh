
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ColorButton } from './ColorButton';
import { GameColor } from '@/types/game';
import { colors } from '@/styles/commonStyles';

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
const BUTTON_SIZE = Math.min((width - 80) / 3, 100);

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

  useEffect(() => {
    if (isShowingSequence && sequence.length > 0) {
      showSequenceAnimation();
    }
  }, [isShowingSequence, sequence]);

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
        return 'Watch the sequence...';
      case 'playing':
        return 'Your turn! Repeat the sequence';
      case 'correct':
        return '🎉 Perfect! Next level...';
      case 'incorrect':
        return '❌ Oops! Try again';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{getStatusMessage()}</Text>
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
                      ? colors.highlight
                      : colors.textSecondary,
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
    </View>
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
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 4,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
  },
});
