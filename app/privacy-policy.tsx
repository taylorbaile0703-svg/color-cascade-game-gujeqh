
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, Platform, ActivityIndicator } from "react-native";
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
  const [privacyContent, setPrivacyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Fetch from GitHub raw content URL
      const response = await fetch('https://raw.githubusercontent.com/taylorbaile0703-svg/color-cascade-game-gujeqh/main/PRIVACY_POLICY.md');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const text = await response.text();
      setPrivacyContent(text);
      console.log('Privacy policy fetched successfully');
    } catch (err) {
      console.error('Error fetching privacy policy:', err);
      setError('Failed to load privacy policy. Please check your internet connection.');
      // Fallback to local content
      setPrivacyContent(getFallbackContent());
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackContent = () => {
    return `# 🎨 Privacy Policy

Color Cascade Memory Game

Last Updated: January 2025

TL;DR: Color Cascade is a simple memory game that stores your high score locally on your device. We don't collect, store, or share any personal information. Your data never leaves your device.

## 1. Introduction

Welcome to Color Cascade Memory Game ("we," "our," or "the App"). We are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our mobile application.

## 2. Information We Collect

### 2.1 Personal Information

We do not collect any personal information. Color Cascade does not require you to create an account, provide your name, email address, phone number, or any other personally identifiable information.

### 2.2 Game Data

The only data stored by the App is:

- High Score: Your highest game score is stored locally on your device using AsyncStorage (a local storage mechanism).
- Game Progress: Current game state while you're playing (level, sequence, etc.) - stored temporarily in device memory.

This data is stored only on your device and is never transmitted to our servers or any third parties.

### 2.3 Technical Information

We do not collect any technical information such as:

- Device identifiers
- IP addresses
- Location data
- Usage analytics
- Crash reports

## 3. How We Use Information

Since we don't collect any information, we don't use, process, or analyze any data. The high score stored on your device is used solely to display your personal best score within the game.

## 4. Data Storage and Security

### 4.1 Local Storage

Your high score is stored using AsyncStorage, a secure local storage system provided by React Native. This data:

- Remains on your device
- Is not accessible to other apps
- Is deleted when you uninstall the app
- Is not backed up to cloud services

### 4.2 No Server Communication

Color Cascade operates entirely offline. The app does not:

- Connect to any servers
- Send data over the internet
- Require an internet connection to function

## 5. Third-Party Services

Color Cascade does not integrate with any third-party services, analytics platforms, advertising networks, or social media platforms. There are no third parties that receive any information from the App.

## 6. Children's Privacy

Color Cascade is suitable for all ages, including children under 13. Since we do not collect any personal information, we comply with the Children's Online Privacy Protection Act (COPPA) and similar regulations worldwide.

## 7. Permissions

The App requests minimal permissions:

- Haptic Feedback: To provide vibration feedback when you interact with the game (optional, can be disabled in device settings).

The App explicitly blocks the following permissions:

- Camera access
- Microphone access
- Location access (fine and coarse)

## 8. Data Retention and Deletion

Your high score is stored indefinitely on your device until you:

- Uninstall the app (automatically deletes all data)
- Clear the app's data through your device settings

There is no data stored on our servers to delete, as we don't collect or store any data externally.

## 9. Your Rights

Since we don't collect any personal data, there is no data to:

- Access
- Correct
- Delete
- Export
- Object to processing

You have complete control over your local game data through your device settings.

## 10. International Users

Color Cascade can be used worldwide. Since no data is collected or transmitted, there are no international data transfer concerns. The app complies with:

- GDPR (European Union)
- CCPA (California, USA)
- COPPA (USA)
- Other international privacy regulations

## 11. Updates to This Privacy Policy

We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by:

- Updating the "Last Updated" date at the top of this policy
- Providing an in-app notification (if applicable)

We encourage you to review this Privacy Policy periodically.

## 12. Open Source

Color Cascade is built with transparency in mind. You can review our code to verify our privacy practices. We believe in open development and welcome community scrutiny.

## 13. Contact Us

If you have any questions about this Privacy Policy or our privacy practices, please contact us:

Email: privacy@colorcascade.app

GitHub: View Privacy Policy on GitHub

### Summary

Color Cascade respects your privacy. We don't collect, store, or share any personal information. Your high score stays on your device. No ads, no tracking, no data collection. Just a fun memory game.`;
  };

  const openGitHubPrivacyPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://github.com/taylorbaile0703-svg/color-cascade-game-gujeqh/blob/main/PRIVACY_POLICY.md');
    } catch (error) {
      console.log('Error opening GitHub:', error);
    }
  };

  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip empty lines
      if (!line.trim()) {
        elements.push(<View key={key++} style={{ height: 8 }} />);
        continue;
      }

      // H1 headers (# )
      if (line.startsWith('# ')) {
        const text = line.substring(2);
        elements.push(
          <View key={key++} style={styles.section}>
            {highlightText(text, searchQuery, [styles.h1, { color: theme.colors.primary }])}
          </View>
        );
        continue;
      }

      // H2 headers (## )
      if (line.startsWith('## ')) {
        const text = line.substring(3);
        elements.push(
          <View key={key++} style={styles.section}>
            {highlightText(text, searchQuery, [styles.h2, { color: theme.colors.primary }])}
          </View>
        );
        continue;
      }

      // H3 headers (### )
      if (line.startsWith('### ')) {
        const text = line.substring(4);
        elements.push(
          <View key={key++} style={styles.subsection}>
            {highlightText(text, searchQuery, [styles.h3, { color: theme.dark ? '#a78bfa' : '#9333ea' }])}
          </View>
        );
        continue;
      }

      // Bullet points (- )
      if (line.trim().startsWith('- ')) {
        const text = line.trim().substring(2);
        elements.push(
          <View key={key++} style={styles.bulletPoint}>
            <Text style={[styles.bullet, { color: theme.colors.text }]}>•</Text>
            {highlightText(text, searchQuery, [styles.contentText, { color: theme.colors.text }])}
          </View>
        );
        continue;
      }

      // Bold text (**text**)
      if (line.includes('**')) {
        const parts = line.split('**');
        const textElements: JSX.Element[] = [];
        parts.forEach((part, index) => {
          if (index % 2 === 1) {
            textElements.push(
              <Text key={index} style={styles.bold}>{part}</Text>
            );
          } else {
            textElements.push(
              <Text key={index}>{part}</Text>
            );
          }
        });
        elements.push(
          <View key={key++} style={{ marginBottom: 8 }}>
            {highlightText(line.replace(/\*\*/g, ''), searchQuery, [styles.contentText, { color: theme.colors.text }])}
          </View>
        );
        continue;
      }

      // Links [text](url)
      const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const beforeLink = line.substring(0, linkMatch.index);
        const linkText = linkMatch[1];
        const afterLink = line.substring((linkMatch.index || 0) + linkMatch[0].length);
        
        elements.push(
          <View key={key++} style={{ marginBottom: 8 }}>
            <Text style={[styles.contentText, { color: theme.colors.text }]}>
              {beforeLink}
              <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
                {linkText}
              </Text>
              {afterLink}
            </Text>
          </View>
        );
        continue;
      }

      // Regular text
      elements.push(
        <View key={key++} style={{ marginBottom: 8 }}>
          {highlightText(line, searchQuery, [styles.contentText, { color: theme.colors.text }])}
        </View>
      );
    }

    return elements;
  };

  const highlightText = (text: string, query: string, style: any) => {
    if (!query.trim()) {
      return <Text style={style}>{text}</Text>;
    }

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <Text style={style}>
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

  const filterContent = (content: string, query: string) => {
    if (!query.trim()) {
      return content;
    }

    const lines = content.split('\n');
    const filteredLines: string[] = [];
    const lowerQuery = query.toLowerCase();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes(lowerQuery)) {
        // Include context: previous line, matching line, and next line
        if (i > 0 && !filteredLines.includes(lines[i - 1])) {
          filteredLines.push(lines[i - 1]);
        }
        if (!filteredLines.includes(line)) {
          filteredLines.push(line);
        }
        if (i < lines.length - 1 && !filteredLines.includes(lines[i + 1])) {
          filteredLines.push(lines[i + 1]);
        }
      }
    }

    return filteredLines.length > 0 ? filteredLines.join('\n') : content;
  };

  const displayContent = searchQuery.trim() ? filterContent(privacyContent, searchQuery) : privacyContent;

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
        <TouchableOpacity
          onPress={fetchPrivacyPolicy}
          style={styles.refreshButton}
          activeOpacity={0.7}
        >
          <IconSymbol
            ios_icon_name="arrow.clockwise"
            android_material_icon_name="refresh"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
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

      {error ? (
        <View style={styles.errorContainer}>
          <IconSymbol
            ios_icon_name="exclamationmark.triangle.fill"
            android_material_icon_name="warning"
            size={48}
            color={theme.dark ? '#fbbf24' : '#f59e0b'}
          />
          <Text style={[styles.errorText, { color: theme.colors.text }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={fetchPrivacyPolicy}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.githubButton, { borderColor: theme.colors.primary }]}
            onPress={openGitHubPrivacyPolicy}
            activeOpacity={0.7}
          >
            <Text style={[styles.githubButtonText, { color: theme.colors.primary }]}>
              View on GitHub
            </Text>
          </TouchableOpacity>
        </View>
      ) : isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading privacy policy from GitHub...
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          <TouchableOpacity 
            style={[styles.githubLinkBox, { 
              backgroundColor: theme.dark ? 'rgba(124, 58, 237, 0.2)' : '#f3f4f6',
              borderLeftColor: theme.colors.primary
            }]}
            onPress={openGitHubPrivacyPolicy}
            activeOpacity={0.7}
          >
            <Text style={[styles.githubTitle, { color: theme.colors.text }]}>
              📄 <Text style={styles.bold}>Loaded from GitHub</Text>
            </Text>
            <View style={styles.githubLinkContent}>
              <Text style={[styles.githubLink, { color: theme.colors.primary }]}>
                View on GitHub →
              </Text>
            </View>
            <Text style={[styles.githubSubtext, { color: theme.dark ? '#999' : '#666' }]}>
              This content is fetched directly from our GitHub repository.
            </Text>
          </TouchableOpacity>

          {searchQuery.trim() && (
            <View style={[styles.searchResultsBox, { 
              backgroundColor: theme.dark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
              borderLeftColor: '#22c55e'
            }]}>
              <Text style={[styles.searchResultsText, { color: theme.colors.text }]}>
                🔍 Showing results for: <Text style={styles.bold}>&quot;{searchQuery}&quot;</Text>
              </Text>
            </View>
          )}

          {parseMarkdown(displayContent)}

          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
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
  refreshButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  githubButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  githubButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  searchResultsBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  searchResultsText: {
    fontSize: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  subsection: {
    marginTop: 12,
    marginBottom: 8,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 24,
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
