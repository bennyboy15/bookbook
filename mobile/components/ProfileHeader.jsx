import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import { formatMemberSince } from "../lib/utils";
import { useEffect, useState } from "react";
import { RENDER_API_URL } from "../constants/api";

export default function ProfileHeader() {
  const { user, token } = useAuthStore();
  const [followerCount, setFollowerCount] = useState(0);
  const [followeringCount, setFolloweringCount] = useState(0);

  async function getFollowers() {
    try {
      const response = await fetch(`${RENDER_API_URL}/api/user/followers/${user._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to fetch followers:", data);
        return;
      }
      console.log(data);
      setFollowerCount(data.follower_count);
      setFolloweringCount(data.followering_count);
    } catch (err) {
      console.error("Error fetching followers:", err);
    }
  }

  useEffect(() => {
    if (user) getFollowers()
  },[user]);

  if (!user) return null;

  return (
    
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>🗓️ Joined {user.createdAt ? formatMemberSince(user.createdAt) : "N/A"}</Text>
        <Text style={styles.email}>👥 Followers: {followerCount} 👥 Following: {followeringCount}</Text>
      </View>
    </View>
  );
}