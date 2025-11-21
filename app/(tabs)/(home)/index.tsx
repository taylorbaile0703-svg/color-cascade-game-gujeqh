
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
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#a855f7', '#9333ea', '#7e22ce']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playButton}
          >
            <IconSymbol
              ios_icon_name="play.fill"
              android_material_icon_name="play-arrow"
              size={28}
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
    borderRadius: 30,
    boxShadow: '0px 10px 30px rgba(168, 85, 247, 0.4)',
    elevation: 10,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    minWidth: 260,
    gap: 12,
  },
  playButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});
