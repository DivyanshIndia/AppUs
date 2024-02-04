import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const CustomDatePicker = ({ isVisible, onConfirm, onCancel, selectedDate }) => {
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth() + 1);
  const [day, setDay] = useState(selectedDate.getDate());

  const generateArray = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // Ensure the year array starts with the current year and goes backwards
  const currentYear = new Date().getFullYear();
  const years = generateArray(1900, currentYear).reverse();
  const months = generateArray(1, 12);
  const days = generateArray(1, 31); // Maximum 31 days

  const PickerItem = ({ value, onSelect, currentValue }) => (
    <TouchableOpacity onPress={() => onSelect(value)} style={styles.pickerItem}>
      <Text
        style={[
          styles.pickerItemText,
          currentValue === value && styles.selectedItem,
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Year</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {years.map((yearValue) => (
              <PickerItem
                key={yearValue}
                value={yearValue}
                onSelect={setYear}
                currentValue={year}
              />
            ))}
          </ScrollView>
          <Text style={styles.label}>Month</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {months.map((monthValue) => (
              <PickerItem
                key={monthValue}
                value={monthValue}
                onSelect={setMonth}
                currentValue={month}
              />
            ))}
          </ScrollView>
          <Text style={styles.label}>Day</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((dayValue) => (
              <PickerItem
                key={dayValue}
                value={dayValue}
                onSelect={setDay}
                currentValue={day}
              />
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onConfirm(new Date(year, month - 1, day))}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  pickerItem: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerItemText: {
    fontSize: 16,
    color: "black",
  },
  selectedItem: {
    color: "blue",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: "grey",
  },
  confirmButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomDatePicker;
