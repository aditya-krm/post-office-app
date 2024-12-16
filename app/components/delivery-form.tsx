import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "./radio-button";
import { colors, glassmorphism } from "../styles/shared";
import { addConsignments } from "../api/base";

const DELIVERY_STATUSES = [
  { id: "not-delivered", label: "Not Delivered" },
  { id: "try-to-deliver", label: "Try to Deliver" },
  { id: "delivered", label: "Delivered" },
];

export function DeliveryForm() {
  const [form, setForm] = useState({
    consignmentNumber: "",
    toWhom: "",
    status: "",
    statusMessage: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const getDetailsPlaceholder = () => {
    if (!form.status) return "Add additional details";
    const status = DELIVERY_STATUSES.find((s) => s.id === form.status);
    return `Add additional details for ${status?.label}`;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    if (
      !form.consignmentNumber ||
      !form.toWhom ||
      !form.status ||
      !form.statusMessage
    ) {
      alert("Please fill all the fields");
      setSubmitting(false);
      return;
    }

    const consignmentForm = {
      consignmentNumber: form.consignmentNumber,
      whomeToDeliver: form.toWhom,
      status: form.status,
      statusMessage: form.statusMessage,
    };
    console.log("consignmentForm", consignmentForm);

    await addConsignments(consignmentForm);
    setSubmitting(false);
    setForm({
      consignmentNumber: "",
      toWhom: "",
      status: "",
      statusMessage: "",
    });
    setNotification("Delivery details submitted successfully!");
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <View style={[styles.container, glassmorphism.background]}>
      <Text style={styles.title}>Delivery Details</Text>

      {notification && <Text style={styles.notification}>{notification}</Text>}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Consignment Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter consignment number"
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.primary}
          value={form.consignmentNumber}
          onChangeText={(text) => setForm({ ...form, consignmentNumber: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>To Whom</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient name"
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.primary}
          value={form.toWhom}
          onChangeText={(text) => setForm({ ...form, toWhom: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Delivery Status</Text>
        <View style={styles.radioGroup}>
          {DELIVERY_STATUSES.map((status) => (
            <RadioButton
              key={status.id}
              label={status.label}
              selected={form.status === status.id}
              onSelect={() => setForm({ ...form, status: status.id })}
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
          value={form.statusMessage}
          onChangeText={(text) => setForm({ ...form, statusMessage: text })}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text style={styles.saveButtonText}>
          {submitting ? "Saving..." : "Submit"}
        </Text>
      </TouchableOpacity>
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
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  saveButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  notification: {
    fontSize: 16,
    color: colors.success,
    marginTop: 16,
  },
});
