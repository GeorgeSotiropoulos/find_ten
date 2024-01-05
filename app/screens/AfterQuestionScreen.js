import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ContextMain from "../context/ContextMain";
import { ButtonShades, sharedStyles } from "./SettingsScreen";
import { MakeBarPlotStandings } from "./SharedComponents";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AfterQuestionScreen({ navigation }) {
  console.log("After Question Screen run");
  const { state, setState } = useContext(ContextMain);

  const onExitPress = () => {
    if (state["play_index"] == state["teams_selected"]) {
      setState({
        ...state,
        play_index: "1",
        current_round: "" + (parseInt(state["current_round"]) + 1),
      });
    } else {
      setState({
        ...state,
        play_index: "" + (parseInt(state["play_index"]) + 1),
      });
    }

    navigation.push("IntroduceQuestionScreen");
  };

  useEffect(() => {
    // read_data()
    // todo: if somehow the state is not the correct one, then force initials.
  }, []);

  const teamSelected_temp = state["play_order"];
  const playIndex = parseInt(state["play_index"] - 1);
  const teamSelected = teamSelected_temp[playIndex].split("_").slice(0, 2).join("_");
  const colorOfTeamSelected = state[teamSelected + "_color"];
  const nameOfTeamSelected = state[teamSelected + "_name"];

  let progressWidth = (state["current_round"] / state["rounds_selected"]) * 100;
  progressWidth = "" + progressWidth + "%";
  const points = state["lastPointsEarned"];
  // console.log(state)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        color: "black",
        // margin: 15,
        padding: 15,
        width: windowWidth,
        height: windowHeight,
        // backgroundColor: 'green'
      }}
    >
      <View style={{ alignSelf: "stretch", backgroundColor: "transparent" }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ fontSize: 26 }}>Round {state["current_round"]} </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={([StyleSheet.absoluteFill], { backgroundColor: "green", width: progressWidth })}
          />
        </View>
        <Text>
          {state["current_round"]} out of {state["rounds_selected"]} total rounds.
        </Text>
      </View>

      {/* Message */}
      {state["current_round"] == "1" && state["play_index"] == "1" ? (
        <Text style={{ fontSize: 25 }}>
          Team{" "}
          <Text
            style={{
              color: `${colorOfTeamSelected}`,
              fontSize: 27,
            }}
          >
            {nameOfTeamSelected}{" "}
          </Text>
          good start!!
        </Text>
      ) : (
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          You are awesome! {"\n"}
          <Text
            style={{
              color: `${colorOfTeamSelected}`,
              fontSize: 27,
            }}
          >
            {" "}
            {nameOfTeamSelected}
          </Text>
        </Text>
      )}
      <Text style={{ fontSize: 28, color: `${colorOfTeamSelected}` }}> + {points} points!</Text>

      {/* Standings */}

      {state["current_round"] >= "0" && ( //Just always have it.
        <View style={{ alignSelf: "stretch" }}>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>Standings!</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
          {MakeBarPlotStandings(state)}
        </View>
      )}

      <View
        style={{
          backgroundColor: "transparent",
          padding: 10,
          alignContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 10 }}>
          <LinearGradient
            colors={ButtonShades} //"#F0F0FC"
            style={sharedStyles.buttonStyle}
          >
            <TouchableOpacity
              style={[{ backgroundColor: "transparent" }]}
              onPress={() => {
                onExitPress();
              }}
            >
              <Text style={sharedStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <Button
            title="Continue"
            onPress={() => {
              // save_data(SETTINGS_SELECTED_KEY, state),
              onExitPress();
            }}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
    marginHorizontal: "20%",
  },
  progressBar: {
    height: 20,
    alignSelf: "stretch",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: "row",
  },
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
