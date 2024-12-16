import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { colors } from "./styles/shared";
import { getConsignments } from "./api/base";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import ConsignmentCard from "./components/consignment-card";
import Loading from "./components/loading";

interface ConsignmentData {
  _id: string;
  consignmentNumber: string;
  whomeToDeliver: string;
  status: "delivered" | "not-delivered";
  statusMessage: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [consignments, setConsignments] = useState<ConsignmentData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchConsignments = async () => {
    try {
      setLoading(true);
      const response = await getConsignments();
      setConsignments(response || []);
    } catch (error) {
      console.error("Failed to fetch consignments:", error);
      setConsignments([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchConsignments();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchConsignments();
  }, []);

  const onHandleDelete = async (id: string) => {
    setConsignments((prevConsignments) =>
      prevConsignments.filter((consignment) => consignment._id !== id)
    );
  };

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
                <Text style={styles.searchText}>Dashboard</Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No consignments found.</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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

export default Dashboard;
