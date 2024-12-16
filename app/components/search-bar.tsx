import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, glassmorphism } from "../styles/shared";
import { useState } from "react";
import { router, usePathname } from "expo-router";

export function SearchBar({ initialQuery }: { initialQuery: string }) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(initialQuery || "");

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    if (pathname.startsWith("/search")) router.setParams({ query: searchTerm });
    else router.push(`/search/${searchTerm}`);
  };

  return (
    <View style={[styles.searchContainer, glassmorphism.background]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search consignments..."
        placeholderTextColor={colors.textSecondary}
        selectionColor={colors.primary}
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />
      <Ionicons
        name="search"
        size={20}
        color={colors.textSecondary}
        onPress={handleSearch}
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
