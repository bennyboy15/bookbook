import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuthStore } from '../store/authStore.js';
import { Image } from 'expo-image';
import { Bell } from 'lucide-react-native';
import COLORS from '../constants/colors.js';

export default function AccountBar() {

    const { user, token } = useAuthStore();

    return (
        <View style={{display:"flex", justifyContent:'space-between', flexDirection:"row", alignItems:"center" }}>
            <View style={{display:"flex", flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: user.profileImage }} style={accountStyles.profileImage} />
                <Text style={accountStyles.text}>Welcome back, {user.name}!</Text>
            </View>
            <TouchableOpacity style={accountStyles.icon}>
            <Bell size={20} color={"green"} />
            </TouchableOpacity>
        </View>
    )
}

const accountStyles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 40,
        marginRight: 16,
        borderWidth: 3,
        borderColor: "white",
        overflow: "hidden",
        backgroundColor: "#ffffff4e"
    },
    icon: {
        backgroundColor: "#89dbd277",
        padding: 8,
        borderRadius: 20
    },
    text: {
        color: COLORS.textPrimary,
        fontWeight: "bold",
        fontSize: 20
    }
})