import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
interface PlatformButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}
export default function PlatformButton({
  title,
  onPress,
  variant = "primary",
}: PlatformButtonProps) {
  const ButtonComponent = Platform.OS === "web" ? Pressable : TouchableOpacity;

  return (
    <ButtonComponent
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      // "Web" specific props
      {...(Platform.OS === "web" && {
        onHoverIn: () => console.log("Button hovered"),
        onHoverOut: () => console.log("Button unhovered"),
      })}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{title}</Text>
    </ButtonComponent>
  );
}
const styles = StyleSheet.create({
  button: {
    // autoamtcally adjsut padding (godo practice) ---
    padding: Platform.OS === "web" ? 12 : 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44, // touch target / radius arodn btns
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryText: {
    color: "white",
  },
  secondaryText: {
    color: "#007AFF",
  },
});
