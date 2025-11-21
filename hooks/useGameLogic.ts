
import { useState, useEffect, useCallback } from 'react';
import { GameState, GameColor } from '@/types/game';
import { Feedback } from '@/utils/haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GAME_COLORS: GameColor[] = [
  { id: 'red', color: '#ff3b5c', name: 'Red' },
  { id: 'blue', color: '#00d4ff', name: 'Blue' },
  { id: 'green', color: '#00ff88', name: 'Green' },
  { id: 'yellow', color: '#ffeb3b', name: 'Yellow' },
  { id: 'purple', color: '#c77dff', name: 'Purple' },
  { id: 'orange', color: '#ff6b35', name: 'Orange' },
  { id: 'pink', color: '#ff6ec7', name: 'Pink' },
  { id: 'teal', color: '#00f5d4', name: 'Teal' },
];

const HIGH_SCORE_KEY = '@color_cascade_high_score';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    sequence: [],
    playerSequence: [],
    isShowingSequence: false,
    isPlayerTurn: false,
    score: 0,
    highScore: 0,
    gamePhase: 'idle',
  });

  const [availableColors, setAvailableColors] = useState<GameColor[]>([]);

  // Load high score on mount
  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem(HIGH_SCORE_KEY);
      if (savedHighScore !== null) {
        setGameState(prev => ({ ...prev, highScore: parseInt(savedHighScore, 10) }));
      }
    } catch (error) {
      console.log('Error loading high score:', error);
    }
  };

  const saveHighScore = async (score: number) => {
    try {
      await AsyncStorage.setItem(HIGH_SCORE_KEY, score.toString());
    } catch (error) {
      console.log('Error saving high score:', error);
    }
  };

  // Determine available colors based on level
  const getAvailableColors = useCallback((level: number): GameColor[] => {
    const colorCount = Math.min(4 + Math.floor(level / 3), 8);
    return GAME_COLORS.slice(0, colorCount);
  }, []);

  // Generate next sequence
  const generateSequence = useCallback((level: number): string[] => {
    const colors = getAvailableColors(level);
    const sequenceLength = 2 + level;
    const newSequence: string[] = [];
    
    for (let i = 0; i < sequenceLength; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newSequence.push(randomColor.id);
    }
    
    return newSequence;
  }, [getAvailableColors]);

  // Start new game
  const startGame = useCallback(() => {
    const newSequence = generateSequence(1);
    const colors = getAvailableColors(1);
    
    setAvailableColors(colors);
    setGameState({
      level: 1,
      sequence: newSequence,
      playerSequence: [],
      isShowingSequence: true,
      isPlayerTurn: false,
      score: 0,
      highScore: gameState.highScore,
      gamePhase: 'showing',
    });
    
    Feedback.medium();
  }, [generateSequence, getAvailableColors, gameState.highScore]);

  // Show sequence to player
  useEffect(() => {
    if (gameState.gamePhase === 'showing') {
      showSequence();
    }
  }, [gameState.gamePhase]);

  const showSequence = async () => {
    const baseDelay = Math.max(800 - (gameState.level * 30), 400);
    
    for (let i = 0; i < gameState.sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, baseDelay));
      Feedback.light();
    }
    
    await new Promise(resolve => setTimeout(resolve, baseDelay));
    
    setGameState(prev => ({
      ...prev,
      isShowingSequence: false,
      isPlayerTurn: true,
      gamePhase: 'playing',
    }));
  };

  // Handle player color selection
  const handleColorPress = useCallback((colorId: string) => {
    if (!gameState.isPlayerTurn || gameState.gamePhase !== 'playing') {
      return;
    }

    Feedback.selection();

    const newPlayerSequence = [...gameState.playerSequence, colorId];
    const currentIndex = gameState.playerSequence.length;

    // Check if the color is correct
    if (colorId === gameState.sequence[currentIndex]) {
      // Correct color
      if (newPlayerSequence.length === gameState.sequence.length) {
        // Level complete!
        Feedback.success();
        
        const newLevel = gameState.level + 1;
        const newScore = gameState.score + (gameState.level * 10);
        const newHighScore = Math.max(newScore, gameState.highScore);
        
        if (newScore > gameState.highScore) {
          saveHighScore(newScore);
        }

        setGameState(prev => ({
          ...prev,
          playerSequence: newPlayerSequence,
          gamePhase: 'correct',
          score: newScore,
          highScore: newHighScore,
        }));

        // Move to next level after a short delay
        setTimeout(() => {
          const newSequence = generateSequence(newLevel);
          const colors = getAvailableColors(newLevel);
          
          setAvailableColors(colors);
          setGameState(prev => ({
            ...prev,
            level: newLevel,
            sequence: newSequence,
            playerSequence: [],
            isShowingSequence: true,
            isPlayerTurn: false,
            gamePhase: 'showing',
          }));
        }, 1500);
      } else {
        // Continue with current level
        setGameState(prev => ({
          ...prev,
          playerSequence: newPlayerSequence,
        }));
      }
    } else {
      // Incorrect color - show the sequence again
      Feedback.error();
      
      setGameState(prev => ({
        ...prev,
        playerSequence: [],
        isPlayerTurn: false,
        gamePhase: 'incorrect',
      }));

      // After a short delay, replay the sequence
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          isShowingSequence: true,
          gamePhase: 'showing',
        }));
      }, 1000);
    }
  }, [gameState, generateSequence, getAvailableColors, saveHighScore]);

  return {
    gameState,
    availableColors,
    startGame,
    handleColorPress,
    allColors: GAME_COLORS,
  };
};
