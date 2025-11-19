import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../constants/colors.js'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Camera } from "lucide-react-native";


export default function ClubHeader() {
  
  const gradientOptions = {
    colors: ['#14b8a6', '#059669'],
    startPoint: { x: 0, y: 1 },
    endPoint: { x: 1, y: 0 }
  }

  const router = useRouter();

  return (
    <View style={{backgroundColor: COLORS.background,}}>
    <View style={headerStyles.gradient}>

      {/* CONTENT */}
      <View style={headerStyles.content}>
        <View style={headerStyles.details}>
          <TouchableOpacity onPress={() => router.replace("/(tabs)/clubs")}>
          <Ionicons name="exit-outline" size={25} color={"white"} style={headerStyles.editButton} />
          </TouchableOpacity>
          <View>
            <Text style={headerStyles.name}>Club Name</Text>
            <Text style={headerStyles.desc}>@Description</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Text style={{ color: "white" }}>
                <Text style={{ fontWeight: "bold" }}>14</Text> Members |
              </Text>
              <Text style={{ color: "white" }}>
                Active since <Text style={{ fontWeight: "bold" }}>2022</Text> 
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    </View>
  )
}

const headerStyles = StyleSheet.create({
  gradient: {
    display: "flex",
    flexDirection: "column",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    maxHeight: 200,
    height: 150,
    backgroundColor: "#14b8a6"
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
  desc: {
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