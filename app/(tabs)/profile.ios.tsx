
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import * as Linking from "expo-linking";

export default function ProfileScreen() {
  const theme = useTheme();

  const openPrivacyPolicy = async () => {
    const privacyUrl = "https://gist.githubusercontent.com/anonymous/privacy-policy-color-cascade/raw/PRIVACY.md";
    try {
      const canOpen = await Linking.canOpenURL(privacyUrl);
      if (canOpen) {
        await Linking.openURL(privacyUrl);
      } else {
        Alert.alert("Error", "Cannot open Privacy Policy link");
      }
    } catch (error) {
      console.log("Error opening Privacy Policy:", error);
      Alert.alert("Error", "Failed to open Privacy Policy link");
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <GlassView style={styles.profileHeader} glassEffectStyle="regular">
          <IconSymbol ios_icon_name="gamecontroller.fill" android_material_icon_name="sports-esports" size={80} color={theme.colors.primary} />
          <Text style={[styles.name, { color: theme.colors.text }]}>Color Cascade</Text>
          <Text style={[styles.subtitle, { color: theme.dark ? '#98989D' : '#666' }]}>Memory Game</Text>
        </GlassView>

        <GlassView style={styles.section} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
          <Text style={[styles.infoText, { color: theme.dark ? '#98989D' : '#666' }]}>
            Test your memory with infinite levels that progressively get harder. 
            Keep playing and improve your high score!
          </Text>
        </GlassView>

        <GlassView style={styles.section} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Legal</Text>
          
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
                  Learn how we protect your data
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
  linkButton: {
    paddingVertical: 4,
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
  divider: {
    height: 1,
    marginVertical: 12,
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
