import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Newspaper } from "lucide-react-native";

export default function _layout() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const insets = useSafeAreaInsets();

    return (
        <Tabs screenOptions={{
            headerShown: false, 
            tabBarActiveTintColor: COLORS.primary,
            headerTitleStyle: {
                color: COLORS.textPrimary,
                fontWeight: "600"
            },
            headerShadowVisible: false,
            tabBarStyle: {
                backgroundColor: COLORS.cardBackground,
                borderTopWidth: 1,
                borderTopColor: COLORS.border,
                paddingTop: 5,
                paddingBottom: insets.bottom,
                height: 60 + insets.bottom,
            }
            }}>

            <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({color,size}) => (<Ionicons name="home-outline" size={size} color={color} />)}}/>
            <Tabs.Screen name="feed" options={{title: "Feed", tabBarIcon: ({color,size}) => (<Newspaper size={size} color={color} />)}}/>
            <Tabs.Screen name="create" options={{title: "Create", tabBarIcon: ({color,size}) => (<Ionicons name="add-circle-outline" size={size} color={color}/>)}}/>
            <Tabs.Screen name="clubs/index" options={{title: "Club", tabBarIcon: ({color,size}) => (<Ionicons name="planet-outline" size={size} color={color}/>)}}/>
            <Tabs.Screen name="profile" options={{title: "Profile", tabBarIcon: ({color,size}) => (<Ionicons name="person-outline" size={size} color={color}/>)}}/>

            <Tabs.Screen name="clubs/[id]" options={{ href:null }}/>
        </Tabs>
    )
}