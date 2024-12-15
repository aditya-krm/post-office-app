import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, glassmorphism } from "../styles/shared";

export function SearchBar() {
  return (
    <View style={[styles.searchContainer, glassmorphism.background]}>
      <Ionicons name="search" size={20} color={colors.textSecondary} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search consignments..."
        placeholderTextColor={colors.textSecondary}
        selectionColor={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
    letterSpacing: 0.3,
  },
});
