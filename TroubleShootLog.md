## Dev and Production Dependencies - Log

### Quick Summary:

# ProductivityApp - Full Troubleshooting Log

- This document details all the troubleshooting and debugging steps performed on **August 11, 2025** for the ProductivityApp project.  
- It combines the original dependency logs with the additional troubleshooting efforts done today.

---

Command to run list of all dependencies + versions:

```bash
npm list --depth=0
```

--- 

### Node

- Vesion: 18.20.5

### Expo

```bash
ProductivityApp on  main [!?] via ⬢ v18.20.5 on ☁️  (us-east-1) took 4s
❯ npx expo --version
0.24.20
```

- installed expo-router adn other dev dependencies

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

- Verison: 0.24.20

### NativeWind

- rn-new@2.18.7

- Installed usign the following commading based on the docs:

```bash
npx expo install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npx expo install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
```

- As of 8.11: Versions installed:

```bash

#── @babel/core@7.28.0
  #├── @types/react@19.0.14
  #├── expo-status-bar@2.2.3
  #├── expo@53.0.20
  #├── react-native@0.79.5
  #├── react@19.0.0
  #└── typescript@5.8.3
```

### Metro Bundler

"help sbundle JavaScript code and assets. Built and optimizeed for React Native and used for large-scale apps (Facebook / Instagram)." - Expo Docs

- installed the Metro bundler

## Update-2 of list of dev deps +versions:

├── @babel/core@7.28.0
├── @expo/metro-runtime@5.0.4
├── @types/react@19.0.14
├── expo-status-bar@2.2.3
├── expo@53.0.20
├── nativewind@4.1.23
├── prettier-plugin-tailwindcss@0.5.14
├── react-dom@19.0.0
├── react-native-reanimated@3.17.5
├── react-native-safe-area-context@5.4.0
├── react-native-web@0.20.0
├── react-native@0.79.5
├── react@19.0.0
├── tailwindcss@3.4.17
└── typescript@5.8.3

## Update-3 of list of dev deps +versions:

├── @babel/core@7.28.0
├── @expo/metro-runtime@5.0.4
├── @types/react@19.0.14
├── expo-router@5.1.4
├── expo-secure-store@14.2.3
├── expo-sqlite@15.2.14
├── expo-status-bar@2.2.3
├── expo@53.0.20
├── nativewind@4.1.23
├── prettier-plugin-tailwindcss@0.5.14
├── react-dom@19.0.0
├── react-native-reanimated@3.17.5
├── react-native-safe-area-context@5.4.0
├── react-native-web@0.20.0
├── react-native@0.79.5
├── react@19.0.0
├── tailwindcss@3.4.17
└── typescript@5.8.3

## Update-4: Changed to the Expo Router for Entry

- set the entry to the router in package.json
  "main":"expo-router/entry"

## Update-5: Web bundlign failed

- Had to update the tsconfig.json file to include the jsxImportSource settign for NAtiveWind -v4.

- original:

```bash
  {
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
  "strict": true
  }

```

- Changed to:

```bash
{
"extends": "expo/tsconfig.base",
"compilerOptions": {
"strict": true,
"jsx": "react-jsx", // added these
"jsxImportSource": "nativewind" // added these
}

```

## Upadte-6: installing web deps Expo is expecting

- Issue:Web Bundling failed 2925ms node_modules/expo-router/entry.js (925 modules)
  Unable to resolve "../Utilities/Platform" from "node_modules/react-native/Libraries/StyleSheet/processColor.js"

- Installed the react--native-web

```bash
npx expo install react-native-web @expo/metro-runtime
```

- Made sure web uses the Mtro web bundler i app.json

```bash
"web": { "favicon": "./assets/favicon.png", "bundler": "metro" }
```

- Making sure metro.comfig.jus files has:

> > >     config.resolver.extraNodeModules = { ... }

- Adds module aliases so that when web bundling hits React Native internal modules (like react-native/Libraries/...), it uses the react-native-web shims instead.
- Added lines: "react-native/Libraries/Utilities/Platform" → react-native-web/dist/exports/Platform
- Added "react-native/Libraries/StyleSheet/processColor" → react-native-web/dist/exports/StyleSheet/processColor

This is the key bit that fixes the “Unable to resolve ../Utilities/Platform” error on web.

## Update-7: Downgraded npm andd expo versions for compatibility:

```bash

```

--- 

# Resumed / Cleaned Up Version:


## 1. Environment & Initial Setup

**Node.js Version:** 18.20.5  
**Expo CLI Version:** 0.24.20 (installed globally)

```bash
npx expo --version
0.24.20
```

**Initial Dependencies Installed:**

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

---

## 2. NativeWind Installation & Configuration

NativeWind was required for styling as per assignment requirements.

**Installed via:**

```bash
npx expo install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npx expo install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
```

**Initial Versions (as of 8/11):**

```
@babel/core@7.28.0
@types/react@19.0.14
expo-status-bar@2.2.3
expo@53.0.20
react-native@0.79.5
react@19.0.0
typescript@5.8.3
```

---

## 3. Metro Bundler & Web Compatibility

Installed Metro bundler dependencies and configured Expo for web compatibility.

**Command:**

```bash
npx expo install react-native-web @expo/metro-runtime
```

**Configured `app.json`:**

```json
"web": {
  "favicon": "./assets/favicon.png",
  "bundler": "metro"
}
```

**Configured `metro.config.js` to alias RN internals for web:**

```js
config.resolver.extraNodeModules = {
  "react-native/Libraries/Utilities/Platform":
    "react-native-web/dist/exports/Platform",
  "react-native/Libraries/StyleSheet/processColor":
    "react-native-web/dist/exports/StyleSheet/processColor",
};
```

---

## 4. Expo Router Entry Point

Modified `package.json`:

```json
"main": "expo-router/entry"
```

This change was intended to enable Expo Router as the app's entry point.

---

## 5. TypeScript & NativeWind V4 Setup

Updated `tsconfig.json` to include NativeWind JSX import source:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "nativewind"
  }
}
```

---

## 6. Web Bundling Errors

Error encountered:

```
Unable to resolve "../Utilities/Platform" from "node_modules/react-native/Libraries/StyleSheet/processColor.js"
```

**Attempted Fixes:**

- Installed missing `react-native-web`
- Added Metro alias configuration
- Verified Metro bundler set to `metro` in `app.json`
- Cleared cache multiple times:

```bash
npx expo start --clear
```

---

## 7. Additional Troubleshooting Steps Taken Today

- **Downgrade attempts** for Expo, npm, and NativeWind to find a stable combination.
- **Consulted** multiple articles:
  - [Fixing Expo Router for MacOS and React Native Babel Plugins](https://medium.com/@python-javascript-php-html-css/fixing-the-expo-router-for-macos-and-react-native-babel-plugins-property-error-b73b40a885c3)
  - [NativeWind v4 Not Working with React Native, TypeScript, and Expo](https://medium.com/@learnwithgeek/nativewind-v4-not-working-with-reactnative-typescript-and-expo-c3a69644ab74)
- Verified Expo Router + NativeWind compatibility issues with latest versions.
- Attempted `babel.config.js` modifications based on community fixes.
- Attempted removal of NativeWind entirely to test web build — still failed due to Expo Router internal dependency conflicts.
- Considered rebuilding project with **stable, known-good versions**:
  - Expo SDK 51 or 52
  - NativeWind v2
  - Expo Router v2.x

---

## 8. Final Diagnosis

The persistent failure to render on web was traced to **version incompatibility between:**

- Expo SDK 53
- Expo Router v5.x
- NativeWind v4
- React 19 + React Native 0.79

These versions have unresolved breaking changes when combined, especially in web bundling.

---

## 9. Next Steps:

1. **Start fresh** with a new Expo project using a **known-good compatibility matrix**.
2. Bypass NativeWind - style with StyleSheets
3. Workaround for Expo-Router --> react-navigation

---

**Summary:**

Multiple configuration attempts were made to resolve bundling issues between Expo Router, NativeWind, and React Native for web rendering.  
Despite following official docs and community fixes, incompatibility between current versions prevented successful web deployment.  
The solution is to restart with a compatible Expo/NativeWind/Router setup to meet cross-platform requirements.

### Resources: 

- [https://docs.expo.dev/router/reference/troubleshooting/]
- [https://docs.expo.dev/guides/customizing-metro/#web-support]
- [https://docs.expo.dev/guides/typescript/]
- [https://www.typescriptlang.org/docs/handbook/2/everyday-types.html]
- [https://github.com/nativewind/nativewind/issues/610]
- [https://docs.expo.dev/router/reference/troubleshooting/]
- [https://medium.com/@learnwithgeek/nativewind-v4-not-working-with-reactnative-typescript-and-expo-c3a69644ab74]
- [https://medium.com/@python-javascript-php-html-css/fixing-the-expo-router-for-macos-and-react-native-babel-plugins-property-error-b73b40a885c3]


