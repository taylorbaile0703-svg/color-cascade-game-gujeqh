
import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { TouchableOpacity } from "react-native";

export default function PrivacyPolicyScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  // Embedded HTML content - no hosting required
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Color Cascade Memory Game</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: ${theme.dark ? '#e5e5e5' : '#333'};
            background: ${theme.dark ? '#1a1a1a' : '#ffffff'};
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            color: ${theme.colors.primary};
            font-size: 2.5em;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .app-name {
            text-align: center;
            color: ${theme.dark ? '#999' : '#666'};
            font-size: 1.2em;
            margin-bottom: 30px;
        }
        
        .last-updated {
            text-align: center;
            color: ${theme.dark ? '#888' : '#999'};
            font-size: 0.9em;
            margin-bottom: 40px;
            font-style: italic;
        }
        
        h2 {
            color: ${theme.colors.primary};
            font-size: 1.8em;
            margin-top: 40px;
            margin-bottom: 15px;
            border-bottom: 2px solid ${theme.colors.primary};
            padding-bottom: 10px;
        }
        
        h3 {
            color: ${theme.dark ? '#a78bfa' : '#9333ea'};
            font-size: 1.3em;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        
        ul {
            margin-left: 30px;
            margin-bottom: 15px;
        }
        
        li {
            margin-bottom: 8px;
        }
        
        .highlight {
            background-color: ${theme.dark ? 'rgba(124, 58, 237, 0.2)' : '#f3f4f6'};
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid ${theme.colors.primary};
        }

        .github-link {
            background-color: ${theme.dark ? 'rgba(124, 58, 237, 0.2)' : '#f3f4f6'};
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid ${theme.colors.primary};
            text-align: center;
        }

        .github-link a {
            color: ${theme.colors.primary};
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1em;
        }

        .github-link a:hover {
            text-decoration: underline;
        }
        
        .contact-info {
            background: ${theme.dark ? 'rgba(124, 58, 237, 0.3)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
            color: ${theme.dark ? '#e5e5e5' : 'white'};
            padding: 30px;
            border-radius: 15px;
            margin-top: 40px;
            text-align: center;
        }
        
        .contact-info a {
            color: ${theme.dark ? '#a78bfa' : 'white'};
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            h1 {
                font-size: 2em;
            }
            
            h2 {
                font-size: 1.5em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Privacy Policy</h1>
        <div class="app-name">Color Cascade Memory Game</div>
        <div class="last-updated">Last Updated: January 2025</div>
        
        <div class="highlight">
            <strong>TL;DR:</strong> Color Cascade is a simple memory game that stores your high score locally on your device. We don't collect, store, or share any personal information. Your data never leaves your device.
        </div>

        <div class="github-link">
            <p style="margin-bottom: 10px; color: ${theme.dark ? '#e5e5e5' : '#333'};">📄 <strong>Official Privacy Policy</strong></p>
            <a href="https://github.com/taylorbaile0703-svg/color-cascade-game-gujeqh/blob/main/PRIVACY_POLICY.md" target="_blank">
                View on GitHub →
            </a>
            <p style="margin-top: 10px; font-size: 0.9em; color: ${theme.dark ? '#999' : '#666'};">
                For the most up-to-date version of our privacy policy, please visit our GitHub repository.
            </p>
        </div>
        
        <h2>1. Introduction</h2>
        <p>
            Welcome to Color Cascade Memory Game ("we," "our," or "the App"). We are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our mobile application.
        </p>
        
        <h2>2. Information We Collect</h2>
        
        <h3>2.1 Personal Information</h3>
        <p>
            <strong>We do not collect any personal information.</strong> Color Cascade does not require you to create an account, provide your name, email address, phone number, or any other personally identifiable information.
        </p>
        
        <h3>2.2 Game Data</h3>
        <p>
            The only data stored by the App is:
        </p>
        <ul>
            <li><strong>High Score:</strong> Your highest game score is stored locally on your device using AsyncStorage (a local storage mechanism).</li>
            <li><strong>Game Progress:</strong> Current game state while you're playing (level, sequence, etc.) - stored temporarily in device memory.</li>
        </ul>
        <p>
            This data is stored <strong>only on your device</strong> and is never transmitted to our servers or any third parties.
        </p>
        
        <h3>2.3 Technical Information</h3>
        <p>
            We do not collect any technical information such as:
        </p>
        <ul>
            <li>Device identifiers</li>
            <li>IP addresses</li>
            <li>Location data</li>
            <li>Usage analytics</li>
            <li>Crash reports</li>
        </ul>
        
        <h2>3. How We Use Information</h2>
        <p>
            Since we don't collect any information, we don't use, process, or analyze any data. The high score stored on your device is used solely to display your personal best score within the game.
        </p>
        
        <h2>4. Data Storage and Security</h2>
        
        <h3>4.1 Local Storage</h3>
        <p>
            Your high score is stored using AsyncStorage, a secure local storage system provided by React Native. This data:
        </p>
        <ul>
            <li>Remains on your device</li>
            <li>Is not accessible to other apps</li>
            <li>Is deleted when you uninstall the app</li>
            <li>Is not backed up to cloud services</li>
        </ul>
        
        <h3>4.2 No Server Communication</h3>
        <p>
            Color Cascade operates entirely offline. The app does not:
        </p>
        <ul>
            <li>Connect to any servers</li>
            <li>Send data over the internet</li>
            <li>Require an internet connection to function</li>
        </ul>
        
        <h2>5. Third-Party Services</h2>
        <p>
            Color Cascade does not integrate with any third-party services, analytics platforms, advertising networks, or social media platforms. There are no third parties that receive any information from the App.
        </p>
        
        <h2>6. Children's Privacy</h2>
        <p>
            Color Cascade is suitable for all ages, including children under 13. Since we do not collect any personal information, we comply with the Children's Online Privacy Protection Act (COPPA) and similar regulations worldwide.
        </p>
        
        <h2>7. Permissions</h2>
        <p>
            The App requests minimal permissions:
        </p>
        <ul>
            <li><strong>Haptic Feedback:</strong> To provide vibration feedback when you interact with the game (optional, can be disabled in device settings).</li>
        </ul>
        <p>
            The App explicitly blocks the following permissions:
        </p>
        <ul>
            <li>Camera access</li>
            <li>Microphone access</li>
            <li>Location access (fine and coarse)</li>
        </ul>
        
        <h2>8. Data Retention and Deletion</h2>
        <p>
            Your high score is stored indefinitely on your device until you:
        </p>
        <ul>
            <li>Uninstall the app (automatically deletes all data)</li>
            <li>Clear the app's data through your device settings</li>
        </ul>
        <p>
            There is no data stored on our servers to delete, as we don't collect or store any data externally.
        </p>
        
        <h2>9. Your Rights</h2>
        <p>
            Since we don't collect any personal data, there is no data to:
        </p>
        <ul>
            <li>Access</li>
            <li>Correct</li>
            <li>Delete</li>
            <li>Export</li>
            <li>Object to processing</li>
        </ul>
        <p>
            You have complete control over your local game data through your device settings.
        </p>
        
        <h2>10. International Users</h2>
        <p>
            Color Cascade can be used worldwide. Since no data is collected or transmitted, there are no international data transfer concerns. The app complies with:
        </p>
        <ul>
            <li>GDPR (European Union)</li>
            <li>CCPA (California, USA)</li>
            <li>COPPA (USA)</li>
            <li>Other international privacy regulations</li>
        </ul>
        
        <h2>11. Updates to This Privacy Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by:
        </p>
        <ul>
            <li>Updating the "Last Updated" date at the top of this policy</li>
            <li>Providing an in-app notification (if applicable)</li>
        </ul>
        <p>
            We encourage you to review this Privacy Policy periodically.
        </p>
        
        <h2>12. Open Source</h2>
        <p>
            Color Cascade is built with transparency in mind. You can review our code to verify our privacy practices. We believe in open development and welcome community scrutiny.
        </p>
        
        <h2>13. Contact Us</h2>
        <div class="contact-info">
            <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <p style="margin-top: 20px;">
                <strong>Email:</strong> <a href="mailto:privacy@colorcascade.app">privacy@colorcascade.app</a>
            </p>
            <p>
                <strong>GitHub:</strong> <a href="https://github.com/taylorbaile0703-svg/color-cascade-game-gujeqh/blob/main/PRIVACY_POLICY.md" target="_blank">View Privacy Policy on GitHub</a>
            </p>
        </div>
        
        <div class="highlight" style="margin-top: 40px;">
            <h3 style="margin-top: 0;">Summary</h3>
            <p style="margin-bottom: 0;">
                <strong>Color Cascade respects your privacy.</strong> We don't collect, store, or share any personal information. Your high score stays on your device. No ads, no tracking, no data collection. Just a fun memory game.
            </p>
        </div>
    </div>
</body>
</html>`;

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
      
      <View style={styles.webViewContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading privacy policy...</Text>
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.colors.text }]}>
              Failed to load privacy policy. Please try again.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setError(false);
                setLoading(true);
              }}
              style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        <WebView
          source={{ html: htmlContent, baseUrl: '' }}
          style={[styles.webView, { backgroundColor: theme.colors.background }]}
          onLoadEnd={() => {
            console.log('Privacy policy loaded successfully');
            setLoading(false);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error:', nativeEvent);
            setError(true);
            setLoading(false);
          }}
          showsVerticalScrollIndicator={true}
          bounces={true}
          scrollEnabled={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
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
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    padding: 20,
    gap: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
