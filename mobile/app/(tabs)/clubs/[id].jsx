import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

export default function ClubDetails() {

  const router = useRouter();

  return (
    <View>
      <Text>ClubDetails</Text>
      <TouchableOpacity onPress={() => router.replace("/(tabs)/clubs")}>
        <Text>GOI BACK</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})