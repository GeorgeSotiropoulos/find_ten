import MaskedView from "@react-native-community/masked-view";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DraftScreen({ navigation }) {
  console.log("App executed..");

  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        borderRadius: 20,
        height: 300,
        overflow: "hidden",
        padding: 20,
        // backgroundColor: "yellow",
      }}
    >
      {/* // Progress bar support */}
      <View style={{ flex: 1, backgroundColor: "gray", alignSelf: "center" }} />
      {/* // Progress bar, I play with "width" to indicate percentage */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { width: "20%", backgroundColor: "green", alignSelf: "center" },
        ]}
      />
      <MaskedView
        style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}
        maskElement={
          // I define text which will be masked
          <View style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}>
            <Text style={{ marginHorizontal: 15, fontSize: 13 }} numberOfLines={1}>
              Text color change
            </Text>
          </View>
        }
      >
        {/* // I define a default mask that I apply to the text so that it is 'black' when it is not ON
        the progress bar. */}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "red" }]} />
        {/* // I define the mask that takes the size of the progress bar and that I apply over the
        default mask (to overwrite it) so that the text under the mask becomes white. */}
        <View style={[StyleSheet.absoluteFill, { width: "18%", backgroundColor: "purple" }]} />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: "row",
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
