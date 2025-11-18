import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ClubListItem({ club, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(club)}>
            <View style={{display: "flex", justifyContent:"space-between", flexDirection: "row", alignItems:"center"}}>
                <View style={styles.header}>
                    <Text style={styles.name}>{club.name}</Text>
                    {club.description ? (
                        <Text style={styles.description}>{club.description}</Text>
                    ) : (
                        <Text style={styles.descriptionMuted}>No description</Text>
                    )}
                </View>
                <Ionicons name="chevron-forward" size={20} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    header: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
    },
    description: {
        color: "#555",
        marginTop: 6,
    },
    descriptionMuted: {
        color: "#999",
        marginTop: 6,
        fontStyle: "italic",
    },
    roleTag: {
        marginTop: 10,
        alignSelf: "flex-start",
        backgroundColor: "#eef",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    roleText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#334",
    },
});
