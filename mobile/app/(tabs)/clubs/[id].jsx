import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router';
import ClubHeader from "../../../components/ClubHeader"

export default function ClubDetails() {

  return (
    <View style={{ flex: 1, padding: 0 }}>
      <ClubHeader />
      <View style={styles.container}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})