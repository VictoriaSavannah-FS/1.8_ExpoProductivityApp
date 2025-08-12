const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// allws bundlign .db for data --> send to SQLite
config.resolver.assetExts.push("db");

module.exports = withNativeWind(config, { input: "./global.css" });
