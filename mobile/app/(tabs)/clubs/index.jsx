import { Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ProfileHeader from '../../../components/ProfileHeader.jsx';
import styles from '../../../assets/styles/profile.styles.js';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../../constants/colors.js';
import { useEffect, useState } from 'react';
import { RENDER_API_URL } from '../../../constants/api.js';
import { useAuthStore } from '../../../store/authStore.js';
import ClubListItem from '../../../components/ClubCard.jsx';
import { useRouter } from 'expo-router';

export default function Club() {

  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useAuthStore();

  const router = useRouter();

  async function getClubs() {
    try {
      setIsLoading(true);

      const response = await fetch(`${RENDER_API_URL}/club`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch book clubs");

      setClubs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch book clubs. Pull down to refresh.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getClubs();
  }, [user]);

  return (
    <View style={{ flex: 1, padding: 0 }}>
        <ProfileHeader />
      <View style={styles.container}>
        {
          isLoading
            ? <ActivityIndicator />
            : (clubs?.map((club) => (
              <ClubListItem key={club._id} club={club} onPress={() => router.push(`/clubs/${club._id}`)} />
            )))
        }
      </View>
    </View>
  )
}