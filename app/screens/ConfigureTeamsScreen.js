import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ContextMain from "../context/ContextMain";
import { SETTINGS_SELECTED_KEY, initial_state } from "../context/SettingsStore";
import { BACKGROUNDcolor, ButtonShades, sharedStyles } from "./SettingsScreen";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ColorSelectButton = (props) => {
  let _teams = ["team_1_color", "team_2_color", "team_3_color", "team_4_color"];

  const checkIfColorIsAlreadyUsed = () => {
    for (let i = 0; i < parseInt(props.state["teams_selected"]); i++) {
      let team_sel = _teams[i];

      if (team_sel == props.team_color) {
        continue;
      } else {
        if (props.state[team_sel] == props.color) {
          return true;
        }
      }
    }
    return false;
  };
  let buttonIsUsed = checkIfColorIsAlreadyUsed();
  return (
    <TouchableOpacity
      disabled={buttonIsUsed}
      style={
        buttonIsUsed
          ? styles.usedColorButtomStyle
          : props.state[props.team_color] == props.color
          ? styles.selectedColorButtomStyle
          : styles.nonSelectedColorButtomStyle
      }
      onPress={() => props.setState({ ...props.state, [props.team_color]: props.color })}
    >
      {props.colorIcon}
    </TouchableOpacity>
  );
};

export default function ConfigureTeamsScreen({ navigation }) {
  console.log("ConfigureTeamsScreen run");
  const { state, setState } = useContext(ContextMain);

  const redColorIcon = <Ionicons name="radio-button-on" size={30} color="red" />;
  const blueColorIcon = <Ionicons name="radio-button-on" size={30} color="blue" />;
  const yellowColorIcon = <Ionicons name="radio-button-on" size={30} color="yellow" />;
  const greenColorIcon = <Ionicons name="radio-button-on" size={30} color="green" />;
  const orangeColorIcon = <Ionicons name="radio-button-on" size={30} color="orange" />;
  const purpleColorIcon = <Ionicons name="radio-button-on" size={30} color="purple" />;
  const pinkColorIcon = <Ionicons name="radio-button-on" size={30} color="pink" />;

  const RowOfColorSelectButtons = ({ team_color }) => {
    // console.log(state);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          alignContent: "space-around",
          width: 220,
        }}
      >
        <ColorSelectButton
          color="red"
          team_color={team_color}
          colorIcon={redColorIcon}
          state={state}
          setState={setState}
        />
        <ColorSelectButton
          color="blue"
          team_color={team_color}
          colorIcon={blueColorIcon}
          state={state}
          setState={setState}
        />
        <ColorSelectButton
          color="yellow"
          team_color={team_color}
          colorIcon={yellowColorIcon}
          state={state}
          setState={setState}
        />
        <ColorSelectButton
          color="green"
          team_color={team_color}
          colorIcon={greenColorIcon}
          state={state}
          setState={setState}
        />
        <ColorSelectButton
          color="orange"
          team_color={team_color}
          colorIcon={orangeColorIcon}
          state={state}
          setState={setState}
        />
        <ColorSelectButton
          color="purple"
          team_color={team_color}
          colorIcon={purpleColorIcon}
          state={state}
          setState={setState}
        />
        <ColorSelectButton
          color="pink"
          team_color={team_color}
          colorIcon={pinkColorIcon}
          state={state}
          setState={setState}
        />
      </View>
    );
  };

  const SetOrderOfTeams = () => {
    let availableTeams = ["team_1_name", "team_2_name"];
    if (state["teams_selected"] == "3") {
      availableTeams.push("team_3_name");
    }
    if (state["teams_selected"] == "4") {
      availableTeams.push("team_3_name");
      availableTeams.push("team_4_name");
    }
    let orderedTeams = availableTeams
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    // console.log(orderedTeams)
    setState({
      ...state,
      team_1_points: "0",
      team_2_points: "0",
      team_3_points: "0",
      team_4_points: "0",
      play_order: orderedTeams,
      play_index: "1",
      current_round: "1",
    });
    // console.log("Initialize game state", state['team_1_points'])
  };

  const onExitPress = () => {
    // console.log(state)
    SetOrderOfTeams();
    save_data(SETTINGS_SELECTED_KEY, state);
    navigation.navigate("IntroduceQuestionScreen");
  };

  const save_data = async () => {
    try {
      // save the teams names first  at the state

      await AsyncStorage.setItem(SETTINGS_SELECTED_KEY, JSON.stringify(state));
      // console.log('Settings saved', state) // this is ok
    } catch (e) {
      console.log("Settings selection is not saved", e);
    }
  };
  const read_data = async () => {
    // console.log('read_data')
    try {
      const state_str = await AsyncStorage.getItem(SETTINGS_SELECTED_KEY);
      // console.log('state_str', state_str) // this is also ok
      const state = JSON.parse(state_str);
      // console.log('Settings read', state)
      if (state !== undefined && state !== null) {
        // console.log('State read')
        setState({ ...state });
        // setState(initial_state)
      } else {
        console.log("Default state");
        setState(initial_state);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // this will run at the very beggining of rendering the screen
  useEffect(() => {
    read_data();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around",
        backgroundColor: BACKGROUNDcolor,
        padding: 15,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            color: "black",
            backgroundColor: "tranparent",
            paddingVertical: 10,
          }}
        >
          <Text> </Text>
          <Text style={sharedStyles.textTitle}>Configure the teams.</Text>
        </View>
        <View key="empty_line" style={{ height: 10 }}></View>

        <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
          Name for the Team 1
        </Text>
        <TextInput
          textAlign={"center"}
          style={[styles.textInputStyle, { color: `${state.team_1_color}` }]}
          onChangeText={(text) => setState({ ...state, team_1_name: text })}
          defaultValue={state["team_1_name"]}
        />
        <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
          Select color for team
          <Text style={[sharedStyles.selectionText, { color: `${state.team_1_color}` }]}>
            {" "}
            {state["team_1_name"]}
          </Text>
        </Text>
        <RowOfColorSelectButtons team_color="team_1_color" />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
          Name for the Team 2
        </Text>
        <TextInput
          style={[styles.textInputStyle, { color: `${state.team_2_color}` }]}
          onChangeText={(text) => setState({ ...state, team_2_name: text })}
          defaultValue={state["team_2_name"]}
        />
        <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
          Select color for team
          <Text style={[sharedStyles.selectionText, { color: `${state.team_2_color}` }]}>
            {" "}
            {state["team_2_name"]}
          </Text>
        </Text>
        <RowOfColorSelectButtons team_color="team_2_color" />
      </View>
      {parseInt(state["teams_selected"]) > 2 && (
        <View style={{ alignItems: "center" }}>
          <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
            Name for the Team 3
          </Text>
          <TextInput
            style={[styles.textInputStyle, { color: `${state.team_3_color}` }]}
            onChangeText={(text) => setState({ ...state, team_3_name: text })}
            defaultValue={state["team_3_name"]}
          />
          <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
            Select color for team
            <Text style={[sharedStyles.selectionText, { color: `${state.team_3_color}` }]}>
              {" "}
              {state["team_3_name"]}
            </Text>
          </Text>
          <RowOfColorSelectButtons team_color="team_3_color" />
        </View>
      )}

      {parseInt(state["teams_selected"]) > 3 && (
        <View style={{ alignItems: "center" }}>
          <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
            Name for the Team 4
          </Text>
          <TextInput
            style={[styles.textInputStyle, { color: `${state.team_4_color}` }]}
            onChangeText={(text) => setState({ ...state, team_4_name: text })}
            defaultValue={state["team_4_name"]}
          />
          <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>
            Select color for team
            <Text style={[sharedStyles.selectionText, { color: `${state.team_4_color}` }]}>
              {" "}
              {state["team_4_name"]}
            </Text>
          </Text>
          <RowOfColorSelectButtons team_color="team_4_color" />
        </View>
      )}

      <View
        style={{
          backgroundColor: "transparent",
          padding: 5,
          alignContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: windowWidth * 0.9,
          alignSelf: "stretch",
        }}
      >
        <View>
          <View style={{ padding: 5 }}>
            <LinearGradient colors={ButtonShades} style={sharedStyles.buttonStyle}>
              <TouchableOpacity
                style={[{ backgroundColor: "transparent" }]}
                onPress={() => {
                  save_data(), navigation.navigate("HomeScreen");
                }}
              >
                <Text style={sharedStyles.buttonText}>Go to Home</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={{ padding: 5 }}>
            <LinearGradient
              colors={ButtonShades} //"#F0F0FC"
              style={sharedStyles.buttonStyle}
            >
              <TouchableOpacity
                style={[{ backgroundColor: "transparent" }]}
                onPress={() => {
                  save_data(SETTINGS_SELECTED_KEY, state), navigation.navigate("SettingsScreen");
                }}
              >
                <Text style={[sharedStyles.buttonText, { textAlign: "center" }]}>
                  Go back to Settings
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        <View style={{ padding: 5 }}>
          <LinearGradient
            colors={ButtonShades} //"#F0F0FC"
            style={sharedStyles.buttonStyle}
          >
            <TouchableOpacity
              style={[{ backgroundColor: "transparent" }]}
              onPress={() => onExitPress()}
            >
              <Text style={sharedStyles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: "gray",
    margin: 10,
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
    justifyContent: "center",
  },
  selectedColorButtomStyle: {
    opacity: 1,
    shadowOpacity: 1,
    backgroundColor: "transparent",
  },
  nonSelectedColorButtomStyle: {
    opacity: 0.3,
    shadowOpacity: 0.5,
    backgroundColor: "transparent",
  },
  usedColorButtomStyle: {
    opacity: 0,
    shadowOpacity: 0,
    backgroundColor: "transparent",
  },
});

{
  /*
    todo: initialize the points of each team and the current_round_no
    
*/
}
