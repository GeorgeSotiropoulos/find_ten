import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfirmationPopUp from "../components/ConfirmationPopUp";
const image = { uri: "https://reactjs.org/logo-og.png" };

export default function DraftScreen({ navigation }) {
  console.log("App executed..");
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const modalMessage = [
    <Text key="1" style={styles.text}>
      Game ongoing.
    </Text>,
    <Text key="2" style={styles.text}>
      Are you sure?
    </Text>,
    <Text key="3" style={styles.text}>
      {" "}
    </Text>,
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.buttons_container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <Text style={styles.text}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("HowToScreen")}>
            <Text style={styles.text}> How to Play </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.text}>Back to Menu</Text>
          </TouchableOpacity>
          <ConfirmationPopUp
            modalVisible={modalVisible}
            popUpMessage={modalMessage}
            onClose={closeModal}
            navigation={navigation}
            navigationToScreenName="HomeScreen"
          />
        </View>
      </ImageBackground>
      <View>
        <Text>Something here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
