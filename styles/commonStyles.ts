
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#0f0f1e',
  backgroundLight: '#1a1a2e',
  text: '#ffffff',
  textSecondary: '#a0a0c0',
  primary: '#a855f7',
  primaryDark: '#7e22ce',
  secondary: '#6366f1',
  accent: '#fbbf24',
  card: '#1e1e3f',
  cardLight: '#2a2a4a',
  highlight: '#10b981',
  success: '#22c55e',
  error: '#ef4444',
  
  // Game colors for the memory game - more vibrant
  gameRed: '#ff3b5c',
  gameBlue: '#00d4ff',
  gameGreen: '#00ff88',
  gameYellow: '#ffeb3b',
  gamePurple: '#c77dff',
  gameOrange: '#ff6b35',
  gamePink: '#ff6ec7',
  gameTeal: '#00f5d4',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardLight,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(168, 85, 247, 0.2)',
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.text,
  },
});
