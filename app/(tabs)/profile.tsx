
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();

  const openPrivacyPolicy = () => {
    router.push('/privacy-policy');
  };

  const openExternalLink = async () => {
    try {
      // Replace this URL with your actual website or support page
      await WebBrowser.openBrowserAsync('https://natively.dev');
    } catch (error) {
      console.log('Error opening browser:', error);
      Alert.alert('Error', 'Could not open the link');
    }
  };

  const openGitHubPrivacyPolicy = async () => {
    try {
      // Link to your app's privacy policy on GitHub
      await WebBrowser.openBrowserAsync('https://github.com/taylorbaile0703-svg/color-cascade-game-gujeqh/blob/main/PRIVACY_POLICY.md');
    } catch (error) {
      console.log('Error opening GitHub:', error);
      Alert.alert('Error', 'Could not open GitHub');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        <GlassView style={[
          styles.profileHeader,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <IconSymbol ios_icon_name="gamecontroller.fill" android_material_icon_name="sports-esports" size={80} color={theme.colors.primary} />
          <Text style={[styles.name, { color: theme.colors.text }]}>Color Cascade</Text>
          <Text style={[styles.subtitle, { color: theme.dark ? '#98989D' : '#666' }]}>Memory Game</Text>
        </GlassView>

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
          <Text style={[styles.infoText, { color: theme.dark ? '#98989D' : '#666' }]}>
            Test your memory with infinite levels that progressively get harder. 
            Keep playing and improve your high score!
          </Text>
        </GlassView>

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Features</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={[styles.featureText, { color: theme.dark ? '#98989D' : '#666' }]}>
              Progressive difficulty - levels get harder as you advance
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🌈</Text>
            <Text style={[styles.featureText, { color: theme.dark ? '#98989D' : '#666' }]}>
              More colors unlock with each level
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>♾️</Text>
            <Text style={[styles.featureText, { color: theme.dark ? '#98989D' : '#666' }]}>
              No losing - keep trying until you succeed
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={[styles.featureText, { color: theme.dark ? '#98989D' : '#666' }]}>
              Works completely offline - no internet required
            </Text>
          </View>
        </GlassView>

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy & Legal</Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={openPrivacyPolicy}
            activeOpacity={0.7}
          >
            <View style={styles.linkContent}>
              <IconSymbol 
                ios_icon_name="hand.raised.fill" 
                android_material_icon_name="privacy-tip" 
                size={24} 
                color={theme.colors.primary} 
              />
              <View style={styles.linkTextContainer}>
                <Text style={[styles.linkTitle, { color: theme.colors.text }]}>Privacy Policy</Text>
                <Text style={[styles.linkSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
                  We don&apos;t collect any personal data
                </Text>
              </View>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="chevron-right" 
                size={20} 
                color={theme.dark ? '#98989D' : '#666'} 
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={openGitHubPrivacyPolicy}
            activeOpacity={0.7}
          >
            <View style={styles.linkContent}>
              <IconSymbol 
                ios_icon_name="chevron.left.forwardslash.chevron.right" 
                android_material_icon_name="code" 
                size={24} 
                color={theme.colors.primary} 
              />
              <View style={styles.linkTextContainer}>
                <Text style={[styles.linkTitle, { color: theme.colors.text }]}>Privacy Policy on GitHub</Text>
                <Text style={[styles.linkSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
                  View the official privacy policy
                </Text>
              </View>
              <IconSymbol 
                ios_icon_name="arrow.up.right" 
                android_material_icon_name="open-in-new" 
                size={20} 
                color={theme.dark ? '#98989D' : '#666'} 
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={openExternalLink}
            activeOpacity={0.7}
          >
            <View style={styles.linkContent}>
              <IconSymbol 
                ios_icon_name="globe" 
                android_material_icon_name="language" 
                size={24} 
                color={theme.colors.primary} 
              />
              <View style={styles.linkTextContainer}>
                <Text style={[styles.linkTitle, { color: theme.colors.text }]}>Visit Our Website</Text>
                <Text style={[styles.linkSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
                  Learn more about our apps
                </Text>
              </View>
              <IconSymbol 
                ios_icon_name="arrow.up.right" 
                android_material_icon_name="open-in-new" 
                size={20} 
                color={theme.dark ? '#98989D' : '#666'} 
              />
            </View>
          </TouchableOpacity>

          <View style={styles.privacyHighlight}>
            <Text style={[styles.privacyText, { color: theme.dark ? '#98989D' : '#666' }]}>
              ✓ No data collection{'\n'}
              ✓ No tracking or analytics{'\n'}
              ✓ No ads{'\n'}
              ✓ Your high score stays on your device
            </Text>
          </View>
        </GlassView>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.dark ? '#98989D' : '#666' }]}>
            Version 1.0.4
          </Text>
          <Text style={[styles.footerText, { color: theme.dark ? '#98989D' : '#666' }]}>
            Made with ❤️ using React Native & Expo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 32,
    marginBottom: 16,
    gap: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  linkButton: {
    paddingVertical: 4,
    marginBottom: 16,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkTextContainer: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  linkSubtitle: {
    fontSize: 13,
  },
  privacyHighlight: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED',
  },
  privacyText: {
    fontSize: 14,
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
  },
});
