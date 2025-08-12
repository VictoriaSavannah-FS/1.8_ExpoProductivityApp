// import React from "react";
// import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
// import { styled } from "nativewind";
// const StyledTouchableOpacity = styled(TouchableOpacity);
// const StyledText = styled(Text);
// interface ButtonProps {
//   title: string;
//   onPress: () => void;
//   variant?: "primary" | "secondary" | "outline";
//   size?: "sm" | "md" | "lg";
//   loading?: boolean;
//   disabled?: boolean;
//   fullWidth?: boolean;
// }
// export default function Button({
//   title,
//   onPress,
//   variant = "primary",
//   size = "md",
//   loading = false,
//   disabled = false,
//   fullWidth = false,
// }: ButtonProps) {
//   const getVariantClasses = () => {
//     switch (variant) {
//       case "primary":
//         return "bg-blue-500 active:bg-blue-600";
//       case "secondary":
//         return "bg-gray-500 active:bg-gray-600";
//       case "outline":
//         return "bg-transparent border-2 border-blue-500 active:bg-blue-50";
//       default:
//         return "bg-blue-500 active:bg-blue-600";
//     }
//   };
//   const getSizeClasses = () => {
//     switch (size) {
//       case "sm":
//         return "px-3 py-2";
//       case "md":
//         return "px-4 py-3";
//       case "lg":
//         return "px-6 py-4";
//       default:
//         return "px-4 py-3";
//     }
//   };
//   const getTextClasses = () => {
//     const sizeClass =
//       size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";
//     const colorClass = variant === "outline" ? "text-blue-500" : "text-white";
//     return `${sizeClass} ${colorClass} font-semibold text-center`;
//   };
//   const buttonClasses = [
//     "rounded-lg items-center justify-center",
//     getVariantClasses(),
//     getSizeClasses(),
//     fullWidth && "w-full",
//     (disabled || loading) && "opacity-50",
//   ]
//     .filter(Boolean)
//     .join(" ");
//   return (
//     <StyledTouchableOpacity
//       className={buttonClasses}
//       onPress={onPress}
//       disabled={disabled || loading}
//     >
//       {loading ? (
//         <ActivityIndicator
//           color={variant === "outline" ? "#3b82f6" : "white"}
//         />
//       ) : (
//         <StyledText className={getTextClasses()}>{title}</StyledText>
//       )}
//     </StyledTouchableOpacity>
//   );
// }
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
      // Web-specific props
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
    padding: Platform.OS === "web" ? 12 : 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44, // Accessibility: minimum touch target
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
