import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useAuthStore} from "../store/authStore.js"
import { useEffect } from "react";

export default function Index() {

  const {user, token, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {user?.username} </Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <Link href="/(auth)/signup">Signup Page</Link>
      <Link href="/(auth)">Login Page</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center",
  },
  text: {
    color: "red"
  }
});