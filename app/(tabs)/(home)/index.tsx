
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push('/(tabs)/(home)/game');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appIcon}>🎨</Text>
        
        <TouchableOpacity style={styles.playButton} onPress={handleStartGame}>
          <IconSymbol
            ios_icon_name="play.fill"
            android_material_icon_name="play-arrow"
            size={28}
            color="#ffffff"
          />
          <Text style={styles.playButtonText}>Start Playing</Text>
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
    marginBottom: 60,
  },
  playButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.3)',
    elevation: 4,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 12,
  },
});
