
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Updates from 'expo-updates';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from './IconSymbol';

export function UpdateChecker() {
  const theme = useTheme();
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');

  const checkForUpdates = async () => {
    if (__DEV__) {
      setMessage('Updates are disabled in development mode');
      return;
    }

    if (!Updates.isEnabled) {
      setMessage('Updates are not enabled for this build');
      return;
    }

    setChecking(true);
    setMessage('Checking for updates...');

    try {
      console.log('Manual update check initiated');
      console.log('Current update ID:', Updates.updateId);
      console.log('Runtime version:', Updates.runtimeVersion);

      const update = await Updates.checkForUpdateAsync();
      console.log('Update check result:', update);

      if (update.isAvailable) {
        setMessage('Update found! Downloading...');
        const fetchResult = await Updates.fetchUpdateAsync();
        console.log('Update fetched:', fetchResult);
        
        setMessage('Update downloaded! Restarting app...');
        setTimeout(async () => {
          await Updates.reloadAsync();
        }, 1000);
      } else {
        setMessage('You have the latest version!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Update check failed:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setChecking(false);
    }
  };

  // Don't show in dev mode
  if (__DEV__) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={checkForUpdates}
        disabled={checking}
        activeOpacity={0.7}
      >
        {checking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <IconSymbol
              ios_icon_name="arrow.clockwise"
              android_material_icon_name="refresh"
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>Check for Updates</Text>
          </>
        )}
      </TouchableOpacity>
      {message ? (
        <Text style={[styles.message, { color: theme.colors.text }]}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 180,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
