import React, {useState, useEffect} from "react";
import { Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://repairaman.pythonanywhere.com";
const API_WHOAMI = "/whoami";

const Tab = createBottomTabNavigator();

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");

  async function getUsername () {
    console.log("----Getting Username -----");
    const token = await AsyncStorage.getItem("token");  // first await....
    console.log(`Token is ${token}`);
    
    try {
      const response = await axios.get(API + API_WHOAMI, {     // second await....
        headers: { Authorization: `JWT ${token}` },
      });
          console.log("Got the username!");
          console.log(response);
          navigation.navigate("Chat");
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
    console.log("Setting up nav Listener");
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
            setUsername(<ActivityIndicator/>);
            getUsername();
    });
       getUsername();
      return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  return (
    <View style={{ flex: 3, alignItems: 'stretch', justifyContent: 'top' }}>
      <Button title="Go to Home" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Account Screen </Text>
      <Button title="Sign out" onPress={signOut} style={commonStyles.container } />
    </View>
  );
}

const styles = StyleSheet.create({
  // Container ==================================
container: {
flex: 1,
justifyContent: 'space-around',
padding: 24,
},
  // Header ==================================
textHeader: {
marginBottom:10,
fontSize: 30,
fontWeight: 'bold',
color: '#4050D7',
},
  // Title ==================================
title: {            
marginBottom: 10,
fontSize: 60,
fontWeight: "bold",
color: '#D79940',
},
fieldTitle: {            
marginBottom: 10,
fontSize: 60,
fontWeight: "normal",
color: '#D79940',
},
titleContainer: {
backgroundColor: "orange",
padding: 10,
margin: 10,
flex: 0.5,
justifyContent: "center",
borderRadius: 20,
},
  // Filler ==========================
fillerContainer:{
padding: 10,
backgroundColor: "blue",
flex: 0.25,
width: "50%",
},                    
  // Input ==========================
arrivalTime: {      
marginBottom: 10,
fontSize: 30,
color: '#D79940',
},
input: {      
marginBottom: 10,
fontSize: 30,
color: '#D79940',
},
  // Button ==============================
button: {             
marginBottom: 20,
borderRadius: 15,
backgroundColor: '#D740D0',
paddingVertical: 20,
paddingHorizontal: 80,
},
loginButton: {             
marginBottom: 20,
borderRadius: 15,
backgroundColor: '#D740D0',
paddingVertical: 20,
paddingHorizontal: 80,
},
textButton:{
fontSize: 30,
color: '#9ED740'
},
// Error =====================================
errorText: {
color: "red",
marginTop: 20,
marginLeft: 20,
MarginRight: 20,
height: 40,
},
});
