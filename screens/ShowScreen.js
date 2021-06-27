import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { commonStyles } from "../styles/commonStyles";
import CreateScreen from "./CreateScreen";
import IndexScreen from "./IndexScreen";
import EditScreen from "./EditScreen";

const BlogStack = createStackNavigator();

export default function ShowScreen({navigation}) {
  return (
<View style={{ flex: 3, alignItems: 'stretch', justifyContent: 'top' }}>
      <Text>Show Screen</Text>
      <Button
        title="Create"
        onPress={() => navigation.push('Create')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({});
