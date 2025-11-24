# Color Cascade

This app was built using [Natively.dev](https://natively.dev) - a platform for creating mobile apps.

## Building for Android

This project is configured to build Android apps using EAS Build (Expo Application Services).

### Prerequisites
1. Install dependencies: `npm install`
2. Log in to your Expo account: `npx eas login`

### Build Commands

**Preview Build (APK)**
```bash
npx eas build --platform android --profile preview
```

**Production Build (App Bundle)**
```bash
npx eas build --platform android --profile production
```

**Development Build**
```bash
npx eas build --platform android --profile development
```

For more information, see the [EAS Build documentation](https://docs.expo.dev/build/introduction/).

Made with 💙 for creativity.
