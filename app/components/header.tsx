import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, glassmorphism } from "../styles/shared";

export function Header() {
  return (
    <View style={[styles.header]}>
      <View style={styles.logoContainer}>
        <Ionicons name="cube-outline" size={28} color={colors.primary} />
        <Text style={styles.logoText}>Logistics</Text>
      </View>
      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => {
          /* Handle dashboard navigation */
        }}
      >
        <Ionicons name="grid-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 8,
  },
  dashboardButton: {
    padding: 8,
  },
});
