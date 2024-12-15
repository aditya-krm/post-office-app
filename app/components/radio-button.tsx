import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { colors } from "../styles/shared";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function RadioButton({ label, selected, onSelect }: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.radioWrapper}>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.selected} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  radioWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  selected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 16,
    color: colors.text,
  },
});
