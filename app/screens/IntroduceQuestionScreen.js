import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ContextMain from "../context/ContextMain";
import { questionsData, questionsUsed } from "../stores/dataStore";
import { ButtonShades, sharedStyles } from "./SettingsScreen";
import { MakeBarPlotStandings } from "./SharedComponents";

const QUESTIONS_USED_KEY = "usedQuestions";
const getArandomQuestion = (obj) => {
  var keys = Object.keys(obj);
  var key_selected = keys[(keys.length * Math.random()) << 0];
  return [key_selected, obj[key_selected]];
};
const filter_questionsData = (state, questionsUsed) => {
  return Object.keys(questionsData).reduce(function (filtered, key) {
    let difficulty_levels = ["Easy", "Medium", "Hard"];

    if (state["difficulty_easy_selected"] == "false") {
      difficulty_levels[0] = "false";
    }
    if (state["difficulty_medium_selected"] == "false") {
      difficulty_levels[1] = "false";
    }
    if (state["difficulty_hard_selected"] == "false") {
      difficulty_levels[2] = "false";
    }

    // if no difficulty is selected then select everything. todo: maybe dont allow no selection of difficulty
    if (
      state["difficulty_easy_selected"] == "false" &&
      state["difficulty_medium_selected"] == "false" &&
      state["difficulty_hard_selected"] == "false"
    ) {
      difficulty_levels = ["Easy", "Medium", "Hard"];
    }

    if (
      (questionsData[key]["difficulty"] == difficulty_levels[0] ||
        questionsData[key]["difficulty"] == difficulty_levels[1] ||
        questionsData[key]["difficulty"] == difficulty_levels[2]) &&
      !questionsUsed.includes(key)
    ) {
      filtered[key] = questionsData[key];
    }
    // console.log(filtered);
    return filtered;
  }, {});
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const read_data = async () => {
  // console.log("read_data");
  try {
    const usedQuestions_str = AsyncStorage.getItem(QUESTIONS_USED_KEY);
    const questionsUsed = JSON.parse(usedQuestions_str);
    if (questionsUsed !== undefined && questionsUsed !== null) {
      console.log("Used Questions read");
    } else {
      let questionsUsed = ["fdsds"];
      console.log("Reset Used questions");
    }
  } catch (e) {
    let questionsUsed = ["fdsds"];
    // console.log(e);
  }
  return questionsUsed;
};

export default function IntroduceQuestionScreen({ navigation }) {
  console.log("Introduce Question Screen run");
  const { state, setState } = useContext(ContextMain);
  // console.log(questionsUsed);

  const [questionKey, question] = useMemo(
    () => getArandomQuestion(filter_questionsData(state, questionsUsed)),
    [questionsData]
  );

  useEffect(() => {
    read_data();
  }, [teamSelected_temp]);

  const teamSelected_temp = state["play_order"];
  const playIndex = parseInt(state["play_index"] - 1);
  const teamSelected = teamSelected_temp[playIndex].split("_").slice(0, 2).join("_");
  const colorOfTeamSelected = state[teamSelected + "_color"];
  const nameOfTeamSelected = state[teamSelected + "_name"];

  let progressWidth = (state["current_round"] / state["rounds_selected"]) * 100;
  progressWidth = "" + progressWidth + "%";

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
        maxWidth: 600,
        alignSelf: "center",
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
          starts first.
        </Text>
      ) : (
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          It is the turn of
          <Text
            style={{
              color: `${colorOfTeamSelected}`,
              fontSize: 27,
            }}
          >
            {" "}
            {nameOfTeamSelected}{" "}
          </Text>
          to show what they can do.
        </Text>
      )}
      <Text style={{ fontSize: 28, color: `${colorOfTeamSelected}` }}>Get ready!</Text>

      {state["current_round"] == "1" && (
        <Text style={{ fontSize: 10 }}>
          Note: The phone should be held by someone who is not in team {nameOfTeamSelected}.
        </Text>
      )}
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
                navigation.push("PlayScreen", {
                  questionkey: questionKey,
                });
              }}
            >
              <Text style={sharedStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
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
