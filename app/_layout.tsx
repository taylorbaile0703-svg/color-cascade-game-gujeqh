
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { View, Text, ActivityIndicator, StyleSheet, AppState } from 'react-native';
import { colors } from '@/styles/commonStyles';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Check for updates on app start (production only)
        if (!__DEV__ && Updates.isEnabled) {
          console.log('Checking for updates on app start...');
          console.log('Current update ID:', Updates.updateId);
          console.log('Runtime version:', Updates.runtimeVersion);
          
          try {
            const update = await Updates.checkForUpdateAsync();
            console.log('Update check result:', update);

            if (update.isAvailable) {
              console.log('Update available! Fetching...');
              const fetchResult = await Updates.fetchUpdateAsync();
              console.log('Update fetched:', fetchResult);
              
              // Reload immediately to apply the update
              console.log('Reloading app to apply update...');
              await Updates.reloadAsync();
            } else {
              console.log('App is up to date');
            }
          } catch (updateError) {
            console.error('Update check/fetch failed:', updateError);
            // Continue anyway - don't block the app
          }
        } else {
          console.log('Updates disabled or in dev mode');
        }
      } catch (error) {
        console.error('Error during app preparation:', error);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Also check for updates when app comes to foreground
  useEffect(() => {
    if (!__DEV__ && Updates.isEnabled) {
      const subscription = AppState.addEventListener('change', async (nextAppState) => {
        if (nextAppState === 'active') {
          console.log('App became active, checking for updates...');
          try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
              console.log('Update available in background check');
              await Updates.fetchUpdateAsync();
              // Don't reload immediately, just fetch for next restart
              console.log('Update fetched and ready for next app restart');
            }
          } catch (error) {
            console.error('Background update check failed:', error);
          }
        }
      });

      return () => {
        subscription.remove();
      };
    }
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
