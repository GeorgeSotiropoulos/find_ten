import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ButtonShades, sharedStyles } from "../screens/SettingsScreen";

const ConfirmationPopUp = ({
  modalVisible,
  popUpMessage,
  onClose,
  navigation,
  navigationToScreenName,
}) => {
  console.log("Confirmation pop up..");
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      {/* Modal content */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0)",
          margin: 50,
          borderRadius: 10,
          padding: 20,
        }}
      >
        {/* Confirmation message */}
        {popUpMessage}

        {/* Buttons for Yes and No */}
        <View style={{ flexDirection: "row" }}>
          <LinearGradient
            colors={ButtonShades} //"#F0F0FC"
            style={sharedStyles.buttonStyle}
          >
            <TouchableOpacity onPress={onClose}>
              <Text style={sharedStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={ButtonShades} //"#F0F0FC"
            style={sharedStyles.buttonStyle}
          >
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                {
                  onClose;
                }
                // Navigate to the home screen
                navigation.navigate(navigationToScreenName);
              }}
            >
              <Text style={sharedStyles.buttonText}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationPopUp;
