import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { SearchBar } from "../components/search-bar";
import { getConsignmentsByQuery } from "../api/base";
import { ConsignmentCard } from "../components/consignment-card";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/shared";
import Loading from "../components/loading";

interface ConsignmentData {
  _id: string;
  consignmentNumber: string;
  whomeToDeliver: string;
  status: "delivered" | "not-delivered";
  statusMessage: string;
  createdAt: string;
  updatedAt: string;
}

const Search = () => {
  const { query } = useLocalSearchParams();
  const [consignments, setConsignments] = useState<ConsignmentData[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(query);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getConsignmentsByQuery(query as string);
        setConsignments(response.data || []);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch consignments:", error);
        setConsignments([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  return (
    <LinearGradient
      colors={["#0F172A", "#1E293B", "#0F172A"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={consignments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ConsignmentCard consignment={item} />}
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <Text style={styles.searchText}>
                  Search results for "{query}"
                </Text>
                <View style={styles.searchBarContainer}>
                  <SearchBar initialQuery={query as string} />
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No consignments found</Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    padding: 16,
  },
  searchText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.text,
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

export default Search;
