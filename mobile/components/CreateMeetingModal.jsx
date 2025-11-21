import { Modal, View, TextInput, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useState } from "react";

export default function CreateMeetingModal({ visible, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function clearForm() {
    setTitle("");
    setLocation("");
    setDescription("");
    setNotes("");
    setDate(new Date());
  }

  function handleSubmit() {
    if (!title || !location) {
      alert("Please fill in required fields: Title and Location");
      return;
    }
    onSubmit({ title, date, location, description, notes });
    clearForm();
    onClose();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent presentationStyle="fullScreen">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.backdrop}>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.title}>Create Club Meeting</Text>

            <TextInput
              placeholder="Title*"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Location*"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
            />
            <TextInput
              placeholder="Notes"
              value={notes}
              onChangeText={setNotes}
              style={styles.input}
              multiline
            />

            <Pressable style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                Date: {date.toLocaleDateString()} {date.toLocaleTimeString()}
              </Text>
            </Pressable>

            <View style={styles.buttonRow}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.createButton]} onPress={handleSubmit}>
                <Text style={[styles.buttonText, { color: "white" }]}>Create</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = {
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  dateButton: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
  createButton: {
    backgroundColor: "#059669",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
};
