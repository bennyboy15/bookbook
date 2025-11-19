import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useAuthStore } from "../store/authStore.js";
import styles from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function LogoutButton() {
  const { logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };

  return (
    <TouchableOpacity style={logoutStyles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={"#ef4444"} />
      <Text style={logoutStyles.text}>  Logout</Text>
    </TouchableOpacity>
  );
}

const logoutStyles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#ffdadaff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: "#ef4444",
    fontWeight: "bold",
  }
})