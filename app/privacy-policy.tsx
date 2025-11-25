
import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { TouchableOpacity } from "react-native";
import * as WebBrowser from 'expo-web-browser';

export default function PrivacyPolicyScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const openGitHubPrivacyPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://github.com/taylorbaile0703-svg/color-cascade-game-gujeqh/blob/main/PRIVACY_POLICY.md');
    } catch (error) {
      console.log('Error opening GitHub:', error);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) {
      return <Text style={[styles.contentText, { color: theme.colors.text }]}>{text}</Text>;
    }

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <Text style={[styles.contentText, { color: theme.colors.text }]}>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={index} style={styles.highlight}>{part}</Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <SafeAreaView 
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]} 
      edges={['top']}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={[styles.searchContainer, { 
        backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        borderBottomColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }]}>
        <IconSymbol
          ios_icon_name="magnifyingglass"
          android_material_icon_name="search"
          size={20}
          color={theme.dark ? '#98989D' : '#666'}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search privacy policy..."
          placeholderTextColor={theme.dark ? '#98989D' : '#666'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")} activeOpacity={0.7}>
            <IconSymbol
              ios_icon_name="xmark.circle.fill"
              android_material_icon_name="cancel"
              size={20}
              color={theme.dark ? '#98989D' : '#666'}
            />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.titleContainer}>
          <Text style={[styles.emoji, { color: theme.colors.text }]}>🎨</Text>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Privacy Policy</Text>
          <Text style={[styles.appName, { color: theme.dark ? '#98989D' : '#666' }]}>
            Color Cascade Memory Game
          </Text>
          <Text style={[styles.lastUpdated, { color: theme.dark ? '#888' : '#999' }]}>
            Last Updated: January 2025
          </Text>
        </View>

        <View style={[styles.highlightBox, { 
          backgroundColor: theme.dark ? 'rgba(124, 58, 237, 0.2)' : '#f3f4f6',
          borderLeftColor: theme.colors.primary
        }]}>
          {highlightText(
            "TL;DR: Color Cascade is a simple memory game that stores your high score locally on your device. We don't collect, store, or share any personal information. Your data never leaves your device.",
            searchQuery
          )}
        </View>

        <TouchableOpacity 
          style={[styles.githubLinkBox, { 
            backgroundColor: theme.dark ? 'rgba(124, 58, 237, 0.2)' : '#f3f4f6',
            borderLeftColor: theme.colors.primary
          }]}
          onPress={openGitHubPrivacyPolicy}
          activeOpacity={0.7}
        >
          <Text style={[styles.githubTitle, { color: theme.colors.text }]}>
            📄 <Text style={styles.bold}>Official Privacy Policy</Text>
          </Text>
          <View style={styles.githubLinkContent}>
            <Text style={[styles.githubLink, { color: theme.colors.primary }]}>
              View on GitHub →
            </Text>
          </View>
          <Text style={[styles.githubSubtext, { color: theme.dark ? '#999' : '#666' }]}>
            For the most up-to-date version of our privacy policy, please visit our GitHub repository.
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            1. Introduction
          </Text>
          {highlightText(
            "Welcome to Color Cascade Memory Game (\"we,\" \"our,\" or \"the App\"). We are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our mobile application.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            2. Information We Collect
          </Text>
          
          <Text style={[styles.subsectionTitle, { color: theme.dark ? '#a78bfa' : '#9333ea' }]}>
            2.1 Personal Information
          </Text>
          {highlightText(
            "We do not collect any personal information. Color Cascade does not require you to create an account, provide your name, email address, phone number, or any other personally identifiable information.",
            searchQuery
          )}

          <Text style={[styles.subsectionTitle, { color: theme.dark ? '#a78bfa' : '#9333ea' }]}>
            2.2 Game Data
          </Text>
          {highlightText(
            "The only data stored by the App is:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText(
              "High Score: Your highest game score is stored locally on your device using AsyncStorage (a local storage mechanism).",
              searchQuery
            )}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText(
              "Game Progress: Current game state while you're playing (level, sequence, etc.) - stored temporarily in device memory.",
              searchQuery
            )}
          </View>
          {highlightText(
            "This data is stored only on your device and is never transmitted to our servers or any third parties.",
            searchQuery
          )}

          <Text style={[styles.subsectionTitle, { color: theme.dark ? '#a78bfa' : '#9333ea' }]}>
            2.3 Technical Information
          </Text>
          {highlightText(
            "We do not collect any technical information such as:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Device identifiers", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("IP addresses", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Location data", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Usage analytics", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Crash reports", searchQuery)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            3. How We Use Information
          </Text>
          {highlightText(
            "Since we don't collect any information, we don't use, process, or analyze any data. The high score stored on your device is used solely to display your personal best score within the game.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            4. Data Storage and Security
          </Text>
          
          <Text style={[styles.subsectionTitle, { color: theme.dark ? '#a78bfa' : '#9333ea' }]}>
            4.1 Local Storage
          </Text>
          {highlightText(
            "Your high score is stored using AsyncStorage, a secure local storage system provided by React Native. This data:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Remains on your device", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Is not accessible to other apps", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Is deleted when you uninstall the app", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Is not backed up to cloud services", searchQuery)}
          </View>

          <Text style={[styles.subsectionTitle, { color: theme.dark ? '#a78bfa' : '#9333ea' }]}>
            4.2 No Server Communication
          </Text>
          {highlightText(
            "Color Cascade operates entirely offline. The app does not:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Connect to any servers", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Send data over the internet", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Require an internet connection to function", searchQuery)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            5. Third-Party Services
          </Text>
          {highlightText(
            "Color Cascade does not integrate with any third-party services, analytics platforms, advertising networks, or social media platforms. There are no third parties that receive any information from the App.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            6. Children&apos;s Privacy
          </Text>
          {highlightText(
            "Color Cascade is suitable for all ages, including children under 13. Since we do not collect any personal information, we comply with the Children's Online Privacy Protection Act (COPPA) and similar regulations worldwide.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            7. Permissions
          </Text>
          {highlightText(
            "The App requests minimal permissions:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText(
              "Haptic Feedback: To provide vibration feedback when you interact with the game (optional, can be disabled in device settings).",
              searchQuery
            )}
          </View>
          {highlightText(
            "The App explicitly blocks the following permissions:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Camera access", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Microphone access", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Location access (fine and coarse)", searchQuery)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            8. Data Retention and Deletion
          </Text>
          {highlightText(
            "Your high score is stored indefinitely on your device until you:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Uninstall the app (automatically deletes all data)", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Clear the app's data through your device settings", searchQuery)}
          </View>
          {highlightText(
            "There is no data stored on our servers to delete, as we don't collect or store any data externally.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            9. Your Rights
          </Text>
          {highlightText(
            "Since we don't collect any personal data, there is no data to:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Access", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Correct", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Delete", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Export", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Object to processing", searchQuery)}
          </View>
          {highlightText(
            "You have complete control over your local game data through your device settings.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            10. International Users
          </Text>
          {highlightText(
            "Color Cascade can be used worldwide. Since no data is collected or transmitted, there are no international data transfer concerns. The app complies with:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("GDPR (European Union)", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("CCPA (California, USA)", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("COPPA (USA)", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Other international privacy regulations", searchQuery)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            11. Updates to This Privacy Policy
          </Text>
          {highlightText(
            "We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by:",
            searchQuery
          )}
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Updating the \"Last Updated\" date at the top of this policy", searchQuery)}
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText("Providing an in-app notification (if applicable)", searchQuery)}
          </View>
          {highlightText(
            "We encourage you to review this Privacy Policy periodically.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            12. Open Source
          </Text>
          {highlightText(
            "Color Cascade is built with transparency in mind. You can review our code to verify our privacy practices. We believe in open development and welcome community scrutiny.",
            searchQuery
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            13. Contact Us
          </Text>
          <View style={[styles.contactBox, { 
            backgroundColor: theme.dark ? 'rgba(124, 58, 237, 0.3)' : 'rgba(102, 126, 234, 0.1)',
          }]}>
            {highlightText(
              "If you have any questions about this Privacy Policy or our privacy practices, please contact us:",
              searchQuery
            )}
            <Text style={[styles.contactDetail, { color: theme.colors.text }]}>
              Email: privacy@colorcascade.app
            </Text>
            <TouchableOpacity onPress={openGitHubPrivacyPolicy} activeOpacity={0.7}>
              <Text style={[styles.contactLink, { color: theme.colors.primary }]}>
                GitHub: View Privacy Policy on GitHub →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.highlightBox, { 
          backgroundColor: theme.dark ? 'rgba(124, 58, 237, 0.2)' : '#f3f4f6',
          borderLeftColor: theme.colors.primary,
          marginTop: 20
        }]}>
          <Text style={[styles.subsectionTitle, { color: theme.dark ? '#a78bfa' : '#9333ea', marginTop: 0 }]}>
            Summary
          </Text>
          {highlightText(
            "Color Cascade respects your privacy. We don't collect, store, or share any personal information. Your high score stays on your device. No ads, no tracking, no data collection. Just a fun memory game.",
            searchQuery
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appName: {
    fontSize: 18,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  highlightBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  githubLinkBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  githubTitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  githubLinkContent: {
    alignItems: 'center',
    marginBottom: 8,
  },
  githubLink: {
    fontSize: 18,
    fontWeight: '600',
  },
  githubSubtext: {
    fontSize: 13,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 15,
    marginRight: 8,
    marginTop: 2,
  },
  contactBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 12,
  },
  contactDetail: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 16,
  },
  contactLink: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  highlight: {
    backgroundColor: '#FFD700',
    color: '#000',
    fontWeight: '600',
  },
  bold: {
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});
