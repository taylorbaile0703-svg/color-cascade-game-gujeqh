
# Privacy Policy Setup Guide 🔐

This guide will help you host the privacy policy on GitHub Pages and update the app to use the correct URL.

## Option 1: GitHub Pages (Recommended - Free)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `color-cascade` (or any name you prefer)
3. Make it public (required for GitHub Pages)
4. Initialize with a README

### Step 2: Upload Privacy Policy

1. Upload the `privacy-policy.html` file to your repository
2. You can do this via:
   - GitHub web interface (Add file → Upload files)
   - Git command line:
     ```bash
     git clone https://github.com/yourusername/color-cascade.git
     cd color-cascade
     cp /path/to/privacy-policy.html .
     git add privacy-policy.html
     git commit -m "Add privacy policy"
     git push
     ```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait a few minutes for deployment

### Step 4: Get Your Privacy Policy URL

Your privacy policy will be available at:
```
https://yourusername.github.io/color-cascade/privacy-policy.html
```

Replace `yourusername` with your actual GitHub username.

### Step 5: Update the App

Update both profile screen files with your actual URL:

**File: `app/(tabs)/profile.tsx`**
```typescript
const privacyUrl = "https://yourusername.github.io/color-cascade/privacy-policy.html";
```

**File: `app/(tabs)/profile.ios.tsx`**
```typescript
const privacyUrl = "https://yourusername.github.io/color-cascade/privacy-policy.html";
```

### Step 6: Test the Link

1. Run your app
2. Go to the Profile tab
3. Tap on "Privacy Policy"
4. Verify it opens in the browser correctly

## Option 2: Custom Domain (Optional)

If you have a custom domain, you can use it with GitHub Pages:

1. Add a `CNAME` file to your repository with your domain
2. Configure DNS settings with your domain provider
3. Update the privacy policy URL in the app

Example:
```
https://www.colorcascade.app/privacy-policy.html
```

## Option 3: Other Static Hosting Services

You can also use other free static hosting services:

### Netlify
1. Sign up at [Netlify](https://www.netlify.com)
2. Drag and drop your `privacy-policy.html` file
3. Get your URL (e.g., `https://color-cascade.netlify.app/privacy-policy.html`)

### Vercel
1. Sign up at [Vercel](https://vercel.com)
2. Deploy your HTML file
3. Get your URL (e.g., `https://color-cascade.vercel.app/privacy-policy.html`)

### Firebase Hosting
1. Sign up at [Firebase](https://firebase.google.com)
2. Use Firebase CLI to deploy
3. Get your URL (e.g., `https://color-cascade.web.app/privacy-policy.html`)

## Customizing the Privacy Policy

Before hosting, you may want to customize the privacy policy:

### Update Contact Information

In `privacy-policy.html`, find the contact section and update:

```html
<p>
    <strong>Email:</strong> <a href="mailto:your-email@example.com">your-email@example.com</a>
</p>
<p>
    <strong>GitHub:</strong> <a href="https://github.com/yourusername/color-cascade" target="_blank">github.com/yourusername/color-cascade</a>
</p>
```

### Update Last Updated Date

```html
<div class="last-updated">Last Updated: January 2025</div>
```

Change to the current date when you publish.

## Verification Checklist

After hosting your privacy policy:

- [ ] Privacy policy is accessible via URL
- [ ] URL is updated in `app/(tabs)/profile.tsx`
- [ ] URL is updated in `app/(tabs)/profile.ios.tsx`
- [ ] Link opens correctly in iOS app
- [ ] Link opens correctly in Android app
- [ ] Privacy policy displays correctly on mobile browsers
- [ ] Privacy policy displays correctly on desktop browsers
- [ ] Contact information is correct
- [ ] Last updated date is current

## App Store Requirements

Both Apple App Store and Google Play Store require a privacy policy URL:

### Apple App Store
- Add the privacy policy URL in App Store Connect
- Under "App Privacy" section
- Must be publicly accessible

### Google Play Store
- Add the privacy policy URL in Play Console
- Under "Store presence" → "Privacy policy"
- Must be publicly accessible

## Important Notes

1. **Keep it Updated**: Update the privacy policy if you add any features that collect data
2. **Accessibility**: Ensure the URL is always accessible (don't delete the repository)
3. **HTTPS**: Use HTTPS URLs (GitHub Pages provides this automatically)
4. **Mobile-Friendly**: The provided HTML is already mobile-responsive
5. **No Authentication**: The privacy policy must be publicly accessible without login

## Testing

Test your privacy policy on multiple devices:

```bash
# Test on iOS simulator
npm run ios

# Test on Android emulator
npm run android

# Test on real devices
# Install the app and tap the Privacy Policy link
```

## Troubleshooting

### Link doesn't open
- Check that the URL is correct
- Verify the privacy policy is publicly accessible
- Check device internet connection
- Look for errors in console logs

### 404 Error
- Wait a few minutes after enabling GitHub Pages
- Verify the file name is exactly `privacy-policy.html`
- Check that the repository is public

### Styling issues
- The HTML file is self-contained with inline CSS
- Should work on all modern browsers
- Test on different screen sizes

## Example URLs

Here are examples of what your privacy policy URL might look like:

- GitHub Pages: `https://yourusername.github.io/color-cascade/privacy-policy.html`
- Custom domain: `https://www.colorcascade.app/privacy-policy.html`
- Netlify: `https://color-cascade.netlify.app/privacy-policy.html`
- Vercel: `https://color-cascade.vercel.app/privacy-policy.html`

Choose the option that works best for you!

---

**Next Steps:**
1. Host your privacy policy using one of the methods above
2. Update the URLs in both profile screen files
3. Test the link on both iOS and Android
4. Proceed with EAS setup and app store submission
