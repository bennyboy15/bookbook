import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

export default function StatCard({iconColor="blue"}) {
  return (
    <View style={styles.card}>
      <Ionicons name="home-outline" size={20} color={iconColor} style={styles.icon} />
      <Text style={{fontWeight: "bold", color:"black", fontSize:25}}>47</Text>
      <Text style={{fontWeight: "semibold", color:"gray", fontSize: 12}}>Books Read</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 10,
        padding: 8,
        alignItems:"center",
        width: "31%"
    },
    icon: {
        backgroundColor: "#d9e6ffff",
        borderRadius: 25,
        padding: 6
    }
})