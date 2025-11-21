import { StyleSheet, View } from "react-native"
import AccountBar from "../../components/AccountBar"
import COLORS from "../../constants/colors"

export default function HomeScreen() {

  return (
    <View style={homeStyles.container}>
      <AccountBar />
    </View>
  )

}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10
  }
})