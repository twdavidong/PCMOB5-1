import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function EditScreen({ navigation }) {
  return (
    <View style={{ flex: 3, alignItems: 'stretch', justifyContent: 'top' }}>
      <Text>Show Screen</Text>
      <Button
        title="Edit"
        onPress={() => navigation.push('Create')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({});
