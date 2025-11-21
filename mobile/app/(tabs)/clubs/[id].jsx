import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ClubHeader from "../../../components/ClubHeader";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { RENDER_API_URL } from '../../../constants/api';
import { useAuthStore } from '../../../store/authStore.js';
import CreateMeetingModal from '../../../components/CreateMeetingModal.jsx';

export default function ClubDetails() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [club, setClub] = useState();
  const [memberCount, setMemberCount] = useState(0);
  const [meetings, setMeetings] = useState([]);

  const { token } = useAuthStore();

  async function getClub() {
    try {
      setIsLoading(true);

      // CLUB
      let response = await fetch(`${RENDER_API_URL}/club/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch club");
      setClub(data);

      // MEMBER COUNT
      response = await fetch(`${RENDER_API_URL}/club/${id}/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      data = await response.json();
      console.log("COUNT", data);
      if (!response.ok) throw new Error(data.message || "Failed to fetch club member count");
      setMemberCount(data);

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

  async function handleCreateMeeting(meetingData) {
    try {
      const response = await fetch(`${RENDER_API_URL}/club/${club._id}/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(meetingData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create meeting");

      setMeetings(prev => [data, ...prev]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert(error.message || "Failed to create meeting");
    }
  }

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
      <ClubHeader club={club} memberCount={memberCount} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Text>Create meeting</Text>
        </TouchableOpacity>
        <CreateMeetingModal visible={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreateMeeting} />
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
    flexDirection: "row",
    gap: 12,
    alignContent: "center"
  },
  container: {
    padding: 10
  }
});
