import { StyleSheet } from "react-native";

export const colors = {
  primary: "#8B5CF6",
  secondary: "#EC4899",
  background: "#0F172A",
  glass: "rgba(255, 255, 255, 0.08)",
  glassLight: "rgba(255, 255, 255, 0.05)",
  glassDark: "rgba(0, 0, 0, 0.3)",
  text: "#F1F5F9",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  border: "rgba(255, 255, 255, 0.1)",
  cardBackground: "rgba(30, 41, 59, 0.7)",
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FFC107",
  info: "#2196F3",
};

export const glassmorphism = StyleSheet.create({
  background: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    backdropFilter: "blur(20px)",
    overflow: "hidden",
  },
});
