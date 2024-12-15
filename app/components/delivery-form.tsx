import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { RadioButton } from "./radio-button";
import { colors, glassmorphism } from "../styles/shared";

const DELIVERY_STATUSES = [
  { id: "not_delivered", label: "Not Delivered" },
  { id: "try_deliver", label: "Try to Deliver" },
  { id: "delivered", label: "Delivered" },
];

export function DeliveryForm() {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const getDetailsPlaceholder = () => {
    if (!selectedStatus) return "Add additional details";
    const status = DELIVERY_STATUSES.find((s) => s.id === selectedStatus);
    return `Add additional details for ${status?.label}`;
  };

  return (
    <View style={[styles.container, glassmorphism.background]}>
      <Text style={styles.title}>Delivery Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Consignment Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter consignment number"
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.primary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>To Whom</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient name"
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.primary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Delivery Status</Text>
        <View style={styles.radioGroup}>
          {DELIVERY_STATUSES.map((status) => (
            <RadioButton
              key={status.id}
              label={status.label}
              selected={selectedStatus === status.id}
              onSelect={() => setSelectedStatus(status.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Additional Details</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={getDetailsPlaceholder()}
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          selectionColor={colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 24,
    borderRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: colors.glassLight,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  radioGroup: {
    marginTop: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
