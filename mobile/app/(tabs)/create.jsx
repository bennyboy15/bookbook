import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {useAuthStore} from "../../store/authStore.js"

export default function Create() {

  const {logout} = useAuthStore();

  return (
    <View>
      <Text>Create</Text>
      <TouchableOpacity onPress={logout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}