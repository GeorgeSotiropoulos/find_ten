import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function HomeScreen({ navigation }) {
  console.log("App executed..");

  return (
    <View style={HomeScreenStyles.container}>
      <ImageBackground source={image} style={HomeScreenStyles.image}>
        <View style={HomeScreenStyles.buttons_container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <Text style={HomeScreenStyles.text}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <Text style={HomeScreenStyles.text}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("HowToScreen")}>
            <Text style={HomeScreenStyles.text}> How to Play </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View>
        <Text>Something here</Text>
      </View>
    </View>
  );
}

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttons_container: {
    width: "35%",
    color: "rgba(1,1,1, 0)",
    alignItems: "center",
    // backgroundColor: 'rgba(52, 42, 52, 0.01)',
    // opacity: 0.1
  },
  button_main: {
    // backgroundColor: "rgba(52, 42, 52, 0.0)",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
