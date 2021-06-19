import React, {useState, useEffect} from "react";
import { Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://repairaman.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");

  async function getUsername () {
    console.log("----Getting Username -----");
    const token = await AsyncStorage.getItem("token");  // first await....
    console.log('Token is ${token}');
    try {
      const response = await axios.get(API + API_WHOAMI, {     // second await....
        headers: { Authorization: 'JWT ${token}' },
      });
      console.log("Got the username!");
        setUsername(response.data.username);
      console.log(response);
    } catch (error) {
      console.log("Error getting user name!");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401 ) {
          signOut();
        }
      } else {
        console.log(error);
      }
      // to go back log in screen?
     }
  }

  useEffect (() => {
    console.log("Setting up Nav Listener");

    const removeListener = navigation.addListener("focus", () => {

      console.log("Running nav listener");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();

    return removeListener;
  },[]);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});
