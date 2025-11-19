import { View, Text, StyleSheet } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { RENDER_API_URL } from "../constants/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors.js";

export default function ProfileHeader() {
  const { user, token } = useAuthStore();
  const [followerCount, setFollowerCount] = useState(0);
  const [followeringCount, setFolloweringCount] = useState(0);

  async function getFollowers() {
    try {
      // use RENDER_API_URL (already contains '/api') — remove the extra '/api'
      const response = await fetch(`${RENDER_API_URL}/user/followers/${user._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Read raw text first so we don't crash if server returns HTML
      const text = await response.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse JSON from followers response", text);
        // stop if response isn't JSON
        return;
      }

      if (!response.ok) {
        console.error("Failed to fetch followers:", data);
        return;
      }
      setFollowerCount(data.follower_count);
      setFolloweringCount(data.followering_count);
    } catch (err) {
      console.error("Error fetching followers:", err);
    }
  }

  useEffect(() => {
    if (user && token) getFollowers();
  }, [user, token]);

  if (!user) return null;

  const gradientOptions = {
    colors: ['#14b8a6', '#059669'],
    startPoint: { x: 0, y: 1 },
    endPoint: { x: 1, y: 0 }
  }

  return (
    <View style={{backgroundColor: COLORS.background,}}>
    <LinearGradient colors={gradientOptions.colors} start={gradientOptions.startPoint} end={gradientOptions.endPoint} style={headerStyles.gradient}>

      {/* CONTENT */}
      <View style={headerStyles.content}>
        {/* TITLE + EDIT BUTTON */}
        <View style={headerStyles.title}>
          <Text style={headerStyles.text}>My Profile</Text>
          <Ionicons name="pencil-outline" size={25} color={"white"} style={headerStyles.editButton} />
        </View>

        <View style={headerStyles.details}>
          <Image source={{ uri: user.profileImage }} style={headerStyles.profileImage} />
          <View>
            <Text style={headerStyles.name}>{user.name}</Text>
            <Text style={headerStyles.username}>@{user.username}</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Text style={{ color: "white" }}>
                <Text style={{ fontWeight: "bold" }}>{followerCount}</Text> followers
              </Text>
              <Text style={{ color: "white" }}>
                <Text style={{ fontWeight: "bold" }}>{followeringCount}</Text> following
              </Text>
            </View>

          </View>
        </View>
      </View>
    </LinearGradient>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  gradient: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    maxHeight: 200,
  },
  content: {
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  editButton: {
    borderRadius: 25,
    padding: 8,
    backgroundColor: "#ffffff26"
  },
  details: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 10
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  username: {
    color: "#dededeff",
    fontWeight: "semibold",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: "white",
    overflow: "hidden",
    backgroundColor: "#ffffff4e"
  },
})