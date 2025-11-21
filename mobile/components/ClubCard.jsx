import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ClubListItem({ club, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(club)}>
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={styles.name}>{club.name}</Text>

          {club.description ? (
            <Text style={styles.description}>{club.description}</Text>
          ) : (
            <Text style={styles.descriptionMuted}>No description</Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textBlock: {
    flexShrink: 1,
    paddingRight: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  description: {
    color: "#555",
    fontSize: 14,
  },

  descriptionMuted: {
    color: "#AAA",
    fontSize: 14,
    fontStyle: "italic",
  },
});
