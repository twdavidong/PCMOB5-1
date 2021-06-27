import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Touchable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { useAuth } from "../hooks/useAPI.js";

const API = "https://repairaman.pythonanywhere.com";
const API_LOGIN = "/auth";


export default function SignUpScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    console.log("---Login --- David OngTW-signup--");
    Keyboard.dismiss();

    try {
      setLoading(true)
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Log in successfully!");
      // console.log(response);
      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);
      navigation.navigate("Account");
      } 
      
    catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error.response);
      setErrorText(error.response.data.description);
    }
  }

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View style = {styles.container}>
          <Text style = {styles.title}>Register a new account</Text>
          <Text style = {styles.fieldTitle}>Username</Text>
                <TextInput 
                          style = {styles.input}
                          autoCapitalize="none"
                          value={username}
                          onChangeText={(input) => setUsername(input)}
                />
          
          <Text style = {styles.fieldTitle}>Password</Text>
                <TextInput 
                          style = {styles.input}
                          autoCapitalize="none"
                          value={password}
                          onChangeText={(input) => setPassword(input)}
                />
              
          <View style = {{flexDirection: "row"}}>
              <TouchableOpacity onPress = {login} 
                                  style = {styles.loginButton}>
                            <Text style = {styles.buttonText}>Registration</Text>
              </TouchableOpacity>
                  {loading ? (
                      <ActivityIndicator style = {{marginLeft: 20, marginBottom: 20}}/>
                            ): null}
          </View>
              
              <TouchableOpacity onPress = {() => {navigation.navigate("SignIn");}}
                                  style = {styles.switchButton}>
                            <Text style = {styles.switchText}>Sign in</Text>
              </TouchableOpacity>
                  
                            <Text style = {styles.errorText}>{errorText}</Text>
                            <View style = {{height: 20, alignItems: "left"}}></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  switchText: {
    color: "blue",
  },
  errorText: {
    color: "red",
    height: 40,
  },
});