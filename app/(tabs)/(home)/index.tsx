
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push('/(tabs)/(home)/game');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appIcon}>🎨</Text>
        
        <TouchableOpacity 
          style={styles.playButtonWrapper} 
          onPress={handleStartGame}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#9b59b6', '#8e44ad', '#6c3483']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playButton}
          >
            <IconSymbol
              ios_icon_name="play.fill"
              android_material_icon_name="play-arrow"
              size={32}
              color="#ffffff"
            />
            <Text style={styles.playButtonText}>Start Playing</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 48,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 120,
  },
  appIcon: {
    fontSize: 120,
    marginBottom: 80,
  },
  playButtonWrapper: {
    borderRadius: 50,
    boxShadow: '0px 8px 24px rgba(155, 89, 182, 0.5)',
    elevation: 8,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 50,
    borderRadius: 50,
    minWidth: 280,
  },
  playButtonText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginLeft: 14,
    letterSpacing: 0.5,
  },
});
