import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import ClubHeader from "../../../components/ClubHeader";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { RENDER_API_URL } from '../../../constants/api';
import { useAuthStore } from '../../../store/authStore.js';

export default function ClubDetails() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [club, setClub] = useState();

  const { token } = useAuthStore();

  async function getClub() {
    try {
      setIsLoading(true);

      const response = await fetch(`${RENDER_API_URL}/club/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch club");

      setClub(data);

    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch club. Pull down to refresh.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getClub();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10, fontSize: 30 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 0 }}>
      <ClubHeader club={club} />
      <View style={styles.container}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection:"row",
    gap: 12,
    alignContent:"center"
  },
});
