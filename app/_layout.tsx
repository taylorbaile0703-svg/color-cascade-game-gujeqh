
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Only check for updates in production builds
        if (!__DEV__ && Updates.isEnabled) {
          console.log('Checking for updates...');
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Update check timeout')), 5000)
          );

          try {
            const update = await Promise.race([
              Updates.checkForUpdateAsync(),
              timeoutPromise,
            ]);

            if (update && typeof update === 'object' && 'isAvailable' in update && update.isAvailable) {
              console.log('Update available, fetching...');
              await Updates.fetchUpdateAsync();
              console.log('Update fetched, reloading...');
              await Updates.reloadAsync();
            } else {
              console.log('No updates available');
            }
          } catch (updateError) {
            console.log('Update check failed or timed out:', updateError);
            // Continue anyway - don't block the app
          }
        } else {
          console.log('Skipping update check (dev mode or updates disabled)');
        }
      } catch (error) {
        console.error('Error during app preparation:', error);
        setUpdateError('Failed to check for updates');
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="formsheet" options={{ presentation: 'formSheet' }} />
      <Stack.Screen
        name="transparent-modal"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
  },
});
