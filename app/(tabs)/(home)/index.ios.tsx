
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
    <LinearGradient
      colors={[colors.background, colors.backgroundLight, colors.background]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.appIcon}>🎨</Text>
          <View style={styles.glowCircle} />
        </View>
        
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

        <TouchableOpacity 
          style={styles.profileButtonWrapper} 
          onPress={() => router.push('/(tabs)/profile')}
          activeOpacity={0.85}
        >
          <View style={styles.profileButton}>
            <IconSymbol
              ios_icon_name="person.circle"
              android_material_icon_name="account-circle"
              size={20}
              color={colors.text}
            />
            <Text style={styles.profileButtonText}>About & Privacy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 80,
  },
  appIcon: {
    fontSize: 120,
    zIndex: 2,
  },
  glowCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primary,
    opacity: 0.15,
    top: -30,
    left: -30,
    zIndex: 1,
  },
  playButtonWrapper: {
    borderRadius: 30,
    boxShadow: '0px 15px 40px rgba(168, 85, 247, 0.5)',
    elevation: 12,
    marginBottom: 20,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 52,
    borderRadius: 30,
    minWidth: 280,
    gap: 12,
  },
  playButtonText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  profileButtonWrapper: {
    marginTop: 12,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  profileButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
