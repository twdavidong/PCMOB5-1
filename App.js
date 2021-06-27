import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { ActivityIndicator, Button ,StyleSheet, Text, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AccountScreen from "./screens/AccountScreen";
import ShowScreen from "./screens/ShowScreen";
import CreateScreen from "./screens/CreateScreen";
import EditScreen from "./screens/EditScreen";
import IndexScreen from "./screens/IndexScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style = {styles.container}>
      <ActivityIndicator />
      </View>
  ) : (   
    <NavigationContainer>
      <Stack.Navigator 
        mode="modal" 
        headerMode="none"
        initialRouteName = {signedIn ? "Account" : "SignIn"}
        screenOptions={{
          headerShown: false,
          headerTitle: "Create new blog",
          headerTitleStyle: {
              fontWeight:"bold",
              fontSize:30,
          },
          headerStyle: {
              height: 120,
              backgroundColor:"blue",
              borderBottomColor:"#ccc",
              borderBottomWidth: 1,
          }
        }}
      >
        <Stack.Screen component={AccountScreen} name="Account" />
        <Stack.Screen component={SignInScreen} name="SignIn" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
        <Stack.Screen component={ShowScreen} name="Show" />
        <Stack.Screen component={CreateScreen} name="Create" />
        <Stack.Screen component={EditScreen} name="Edit" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*

      <BlogStack.Navigator>
        <BlogStack.Screen component={CreateScreen} name="Create" 
                      options={{
                        headerTitle: "Create new blog",
                        headerTitleStyle: {
                            fontWeight:"bold",
                            fontSize:30,
                        },
                        headerStyle: {
                            height: 120,
                            backgroundColor:"blue",
                            borderBottomColor:"#ccc",
                            borderBottomWidth: 1,
                        },
                    }}/>
        <BlogStack.Screen component={EditScreen} name="Edit" 
                    options={{
                      headerTitle: "Edit blog",
                      headerTitleStyle: {
                          fontWeight:"bold",
                          fontSize:30,
                      },
                      headerStyle: {
                          height: 120,
                          backgroundColor:"blue",
                          borderBottomColor:"#ccc",
                          borderBottomWidth: 1,
          },
      }}/>
        <BlogStack.Screen component={IndexScreen} name="Index" 
                      options={{
                        headerTitle: "Index",
                        headerTitleStyle: {
                            fontWeight:"bold",
                            fontSize:30,
                        },
                        headerStyle: {
                            height: 120,
                            backgroundColor:"blue",
                            borderBottomColor:"#ccc",
                            borderBottomWidth: 1,
                        },
                    }}
        />
      </BlogStack.Navigator>

      */
       /*   <Stack.Screen component={IndexScreen} name="Index" /> */