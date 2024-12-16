import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { deleteConsignments } from "../api/base";

interface ConsignmentCardProps {
  consignment: {
    _id: string;
    consignmentNumber: string;
    whomeToDeliver: string;
    status: "delivered" | "not-delivered" | "try-to-deliver";
    statusMessage: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function ConsignmentCard({ consignment }: ConsignmentCardProps) {
  const [showOptions, setShowOptions] = useState(false);

  const handlePress = () => {
    setShowOptions((prev) => !prev);
  };

  const getStatusColor = () => {
    switch (consignment.status) {
      case "delivered":
        return "#4CAF50"; // Green
      case "try-to-deliver":
        return "#FFA000"; // Orange
      case "not-delivered":
        return "#F44336"; // Red
      default:
        return "#666"; // Gray as fallback
    }
  };

  const getStatusText = () => {
    switch (consignment.status) {
      case "delivered":
        return "Delivered";
      case "try-to-deliver":
        return "Attempting Delivery";
      case "not-delivered":
        return "Not Delivered";
      default:
        return "Unknown Status";
    }
  };

  const handleEditPress = () => {
    console.log("Edit button pressed for consignment:", consignment);
  };
  const handleDeletePress = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this consignment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteConsignments(consignment._id);
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.consignmentNumber}>
            {consignment.consignmentNumber}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: getStatusColor(),
              },
            ]}
          >
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>

        <Text style={styles.recipient}>To: {consignment.whomeToDeliver}</Text>
        <Text style={styles.message}>{consignment.statusMessage}</Text>
        <Text style={styles.date}>
          {new Date(consignment.createdAt).toLocaleDateString()}
        </Text>
        {showOptions && (
          <View style={styles.options}>
            <TouchableOpacity>
              <Text style={styles.editButton} onPress={handleEditPress}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.deleteButton} onPress={handleDeletePress}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(108, 130, 155, 0.25)",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowRadius: 4,
    // elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  consignmentNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF", // White text for dark mode
  },
  statusBadge: {
    padding: 8,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  recipient: {
    fontSize: 15,
    marginBottom: 4,
    color: "#E0E0E0", // Light gray for recipient
  },
  message: {
    fontSize: 14,
    color: "#CCCCCC", // Slightly lighter gray for message
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#888888", // Darker gray for date
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginHorizontal: 16,
  },
  editButton: {
    fontSize: 14,
    color: "#007AFF", // Blue
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  deleteButton: {
    fontSize: 14,
    color: "#FF0000", // Red
    borderColor: "#FF0000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});

export default ConsignmentCard;
