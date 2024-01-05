import React, { useContext, useEffect } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ContextMain from "../context/ContextMain";
import { FindWinnerAndLoosingTeam, MakeBarPlotStandings } from "./SharedComponents";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function EndOfGameScreen({ navigation }) {
  console.log("EndOfGameScreen run");
  const { state, setState } = useContext(ContextMain);
  // console.log(state)

  const onExitPress = () => {
    navigation.push("HomeScreen");
  };

  const winner_looser = FindWinnerAndLoosingTeam(state);

  useEffect(() => {
    // read_data()
    // todo: if somehow the state is not the correct one, then force initials.
  }, []);

  let progressWidth = (state["current_round"] / state["rounds_selected"]) * 100;
  progressWidth = "" + progressWidth + "%";
  const points = state["lastPointsEarned"];
  // console.log(winner_looser.winningTeam);

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
      <Text style={{ fontSize: 25 }}>
        Team{" "}
        <Text
          style={{
            color: `${state[winner_looser.winningTeam + "_color"]}`,
            fontSize: 27,
          }}
        >
          {state[winner_looser.winningTeam + "_name"]}{" "}
        </Text>
        is the winner!!! You are the bestestest guys! Congrats!
      </Text>

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
          <Button
            title="Go Home"
            onPress={() => {
              // save_data(SETTINGS_SELECTED_KEY, state),
              onExitPress();
            }}
          />
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
