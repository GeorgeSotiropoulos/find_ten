import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ContextMain from "../context/ContextMain";
import { SETTINGS_SELECTED_KEY, initial_state } from "../context/SettingsStore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const BACKGROUNDcolor = "#f5f5ff";
export const ButtonShades = ["#BBBBE4", "#C3C3F2", "#CECEF0", "#C3C3F2", "#BBBBE4"];
// create a reusable component Morph

export default function SettingsScreen({ navigation }) {
  const { state, setState } = useContext(ContextMain);
  const save_data = async () => {
    try {
      // console.log('save data')
      await AsyncStorage.setItem(SETTINGS_SELECTED_KEY, JSON.stringify(state));
      // console.log('Settings saved', JSON.stringify(state)) // this is ok
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
        // console.log('Reading data')
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

  useEffect(() => {
    read_data();
  }, []);

  //get the icons
  const teamsIcon = <AntDesign name="team" size={38} color="black" />;
  const timerIcon = <MaterialIcons name="timer" size={38} color="black" />;
  const roundsIcon = <MaterialIcons name="rounded-corner" size={38} color="black" />;

  // configuration for the teams buttons
  const touch4teams = {
    style:
      state.teams_selected === "4"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => {
      setState({ ...state, teams_selected: "4" });
    },
  };
  const touch2teams = {
    style:
      state.teams_selected === "2"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, teams_selected: "2" }),
  };
  const touch3teams = {
    style:
      state.teams_selected === "3"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, teams_selected: "3" }),
  };

  // end

  // Configuration of the Secs buttons
  const touchsecs60 = {
    style:
      state.secs_selected == "60"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, secs_selected: "60" }),
  };
  const touchsecs45 = {
    style:
      state.secs_selected == "45"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, secs_selected: "45" }),
  };
  const touchsecs90 = {
    style:
      state.secs_selected == "90"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, secs_selected: "90" }),
  };
  const touchsecs120 = {
    style:
      state.secs_selected == "120"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, secs_selected: "120" }),
  };

  // end

  const touchrounds5 = {
    style:
      state.rounds_selected === "5"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, rounds_selected: "5" }),
  };
  const touchrounds10 = {
    style:
      state.rounds_selected === "10"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, rounds_selected: "10" }),
  };
  const touchrounds15 = {
    style:
      state.rounds_selected === "15"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, rounds_selected: "15" }),
  };
  const touchrounds20 = {
    style:
      state.rounds_selected === "20"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () => setState({ ...state, rounds_selected: "20" }),
  };

  // end

  // create the Switch Selectors for difficulty.

  const touchDifficultyEasy = {
    // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style:
      state.difficulty_easy_selected === "true"
        ? {
            ...styles.touchOpacityStyleSelected,
          }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () =>
      state.difficulty_easy_selected === "true"
        ? setState({ ...state, difficulty_easy_selected: "false" })
        : setState({ ...state, difficulty_easy_selected: "true" }),
  };

  const touchDifficultyMedium = {
    // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style:
      state.difficulty_medium_selected === "true"
        ? { ...styles.touchOpacityStyleSelected }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () =>
      state.difficulty_medium_selected === "true"
        ? setState({ ...state, difficulty_medium_selected: "false" })
        : setState({ ...state, difficulty_medium_selected: "true" }),
  };

  const touchDifficultyHard = {
    // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style:
      state.difficulty_hard_selected === "true"
        ? { ...styles.touchOpacityStyleSelected }
        : { ...styles.touchOpacityStyleNotSelected },
    onPress: () =>
      state.difficulty_hard_selected === "true"
        ? setState({ ...state, difficulty_hard_selected: "false" })
        : setState({ ...state, difficulty_hard_selected: "true" }),
  };
  // END

  const innerTextStyle = (state_key, value) => {
    return state[state_key] === value
      ? { ...styles.settingsTextSelected }
      : { ...styles.settingsText };
  };

  console.log("Settings Screen run");
  // console.log(state);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: BACKGROUNDcolor }]}>
      <View style={{ alignItems: "center", color: "black", backgroundColor: "tranparent" }}>
        <Text> </Text>
        <Text style={sharedStyles.textTitle}> Settings.</Text>
        <Text style={styles.textSubTitle}>General settings for setting up the game.</Text>
      </View>

      {/* Teams slider */}
      <View style={[styles.sliderStyle, { backgroundColor: "tranparent" }]}>
        <Text style={sharedStyles.selectionText}>Select the number of teams</Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "tranparent",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "80%",
              justifyContent: "space-between",
              alignContent: "center",
              backgroundColor: "tranparent",
            }}
          >
            <TouchableOpacity {...touch2teams}>
              <Text style={innerTextStyle("teams_selected", "2")}>2</Text>
              <Text style={innerTextStyle("teams_selected", "2")}>Teams</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touch3teams}>
              <Text style={innerTextStyle("teams_selected", "3")}>3</Text>
              <Text style={innerTextStyle("teams_selected", "3")}>Teams</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touch4teams}>
              <Text style={innerTextStyle("teams_selected", "4")}>4</Text>
              <Text style={innerTextStyle("teams_selected", "4")}>Teams</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconStyle]}>{teamsIcon}</View>
        </View>
      </View>

      {/* Time select Slider */}
      <View style={[styles.sliderStyle, { backgroundColor: "tranparent" }]}>
        <Text style={sharedStyles.selectionText}>Select the time of each round (secs)</Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "tranparent",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "80%",
              justifyContent: "space-between",
              alignContent: "center",
              backgroundColor: "tranparent",
            }}
          >
            <TouchableOpacity {...touchsecs45}>
              <Text style={innerTextStyle("secs_selected", "45")}>Secs</Text>
              <Text style={innerTextStyle("secs_selected", "45")}>45</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touchsecs60}>
              <Text style={innerTextStyle("secs_selected", "60")}>60</Text>
              <Text style={innerTextStyle("secs_selected", "60")}>Secs</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touchsecs90}>
              <Text style={innerTextStyle("secs_selected", "90")}>90</Text>
              <Text style={innerTextStyle("secs_selected", "90")}>Secs</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touchsecs120}>
              <Text style={innerTextStyle("secs_selected", "120")}>120</Text>
              <Text style={innerTextStyle("secs_selected", "120")}>Secs</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconStyle]}>{timerIcon}</View>
        </View>
      </View>

      {/* Number Of Rounds slider */}
      <View style={[styles.sliderStyle, { backgroundColor: "tranparent" }]}>
        <Text style={sharedStyles.selectionText}>Select the time of each round (secs)</Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "tranparent",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "80%",
              justifyContent: "space-between",
              alignContent: "center",
              backgroundColor: "tranparent",
            }}
          >
            <TouchableOpacity {...touchrounds5}>
              <Text style={innerTextStyle("rounds_selected", "5")}>5</Text>
              <Text style={innerTextStyle("rounds_selected", "5")}>rounds</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touchrounds10}>
              <Text style={innerTextStyle("rounds_selected", "10")}>10</Text>
              <Text style={innerTextStyle("rounds_selected", "10")}>rounds</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touchrounds15}>
              <Text style={innerTextStyle("rounds_selected", "15")}>15</Text>
              <Text style={innerTextStyle("rounds_selected", "15")}>rounds</Text>
            </TouchableOpacity>
            <TouchableOpacity {...touchrounds20}>
              <Text style={innerTextStyle("rounds_selected", "20")}>20</Text>
              <Text style={innerTextStyle("rounds_selected", "20")}>rounds</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconStyle]}>{roundsIcon}</View>
        </View>
      </View>
      <View className="switch-button" style={styles.sliderStyle}>
        <Text style={[sharedStyles.selectionText, { alignSelf: "center" }]}>Difficulty</Text>
        <View style={{ flexDirection: "row", height: 60, minWidth: 300 }}>
          <TouchableOpacity {...touchDifficultyEasy}>
            <Text style={innerTextStyle("difficulty_easy_selected", "true")}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity {...touchDifficultyMedium}>
            <Text style={innerTextStyle("difficulty_medium_selected", "true")}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity {...touchDifficultyHard}>
            <Text style={innerTextStyle("difficulty_hard_selected", "true")}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ alignItems: "center", color: "black" }}></Text>
      <View
        style={{
          backgroundColor: "transparent",
          padding: 10,
          alignContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          elevation: 1,
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
                save_data(), navigation.navigate("HomeScreen");
              }}
            >
              <Text style={sharedStyles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{ padding: 10 }}>
          <LinearGradient colors={ButtonShades} style={sharedStyles.buttonStyle}>
            <TouchableOpacity
              style={[sharedStyles.touchabilityStyle, { backgroundColor: "transparent" }]}
              onPress={() => {
                save_data(), navigation.navigate("ConfigureTeamsScreen");
              }}
            >
              <Text style={sharedStyles.buttonText}>Start Game</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

export const sharedStyles = StyleSheet.create({
  textTitle: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  selectionText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  buttonStyle: {
    elevation: 6,
    width: 130,
    height: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    backgroundColor: "#C3C3F2",
    borderColor: "gray",
    borderWidth: 1,
  },
  touchabilityStyle: {
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 3,
    textShadowColor: "#A6A6DB",
  },
  textMenu: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    color: "black",
    width: windowWidth,
    height: windowHeight,
    maxWidth: 600,
    alignSelf: "center",
  },

  sliderStyle: {
    alignItems: "center",
    width: "70%",
  },
  iconStyle: { left: 0, bottom: 0, position: "absolute", elevation: 4 },
  opacityStyle: {},

  textSubTitle: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  textParagraph: {
    color: "black",
    textAlign: "center",
    fontSize: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  touchOpacityStyleNotSelected: {
    width: "30%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    backgroundColor: "transparent",
    borderRadius: 20,
    borderColor: "transparent",
  },
  touchOpacityStyleSelected: {
    width: "30%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    backgroundColor: "#7ED67E",
    borderRadius: 20,
    borderColor: "#77CD77",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 3, //IOS
    elevation: 3, // Android
  },

  settingsText: {
    color: "black",
    fontSize: 14,
    fontStyle: "italic",
    fontFamily: "notoserif",
    elevation: 5,
  },
  settingsTextSelected: {
    color: "white",
    fontSize: 14,
    fontStyle: "italic",
    fontFamily: "notoserif",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 3,
    textShadowColor: "gray",
  },
});
