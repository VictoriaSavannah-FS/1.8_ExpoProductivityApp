// utils/webSpecificFeatures.ts
import { Platform } from "react-native";
import { router } from "expo-router";
import config from "../constants/config";

export const runWebOnlyFeatures = () => {
  if (Platform.OS !== "web" || typeof document === "undefined") return;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "n") {
      e.preventDefault();
      router.push("/add-task");
    }
  };

  document.addEventListener("keydown", onKeyDown);

  if ((config as any).webAnalyticsId) {
    console.log("Analytics init:", (config as any).webAnalyticsId);
  }

  return () => document.removeEventListener("keydown", onKeyDown);
};
