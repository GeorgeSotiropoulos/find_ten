import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
// import { NavigationEvents } from 'react-navigation';
import ConfirmationPopUp from "../components/ConfirmationPopUp";
import ContextMain from "../context/ContextMain";
import { listItemPressedStore, questionsData, questionsUsed } from "../stores/dataStore";
import { ButtonShades, sharedStyles } from "./SettingsScreen";
const QUESTIONS_USED_KEY = "usedQuestions";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const setFontSize = (string_item) => {
  if (string_item.length > 50) {
    return 12;
  } else if (string_item.length > 40) {
    return 14;
  } else {
    return 16;
  }
};

const ListItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View
      style={{
        padding: 4,
        marginVertical: 4,
        justifyContent: "space-between",
        flexDirection: "row",
        maxHeight: windowHeight / 20,
      }}
    >
      <Text style={{ fontSize: setFontSize(item.title), flexWrap: "wrap", flexShrink: 1 }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 18 }}>{item.points}</Text>
    </View>
  </TouchableOpacity>
);

const innerTimer = (remainingTime, elapsedTime, animatedColor, playSound) => {
  if (Math.abs(remainingTime * 1000 - elapsedTime) <= 30) {
    playSound();
  }

  return (
    <View style={{ alignItems: "center" }}>
      {remainingTime > 30 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}> Remaining </Text>
          <Text style={{ fontSize: 16 }}> Time </Text>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 12 }}>Last Seconds</Text>
          <Text style={{ fontSize: 12 }}>Hurry Up </Text>
        </View>
      )}
      <Animated.Text style={{ ...styles.remainingTime, color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
      <Text style={{ fontSize: 18 }}> Secs </Text>
    </View>
  );
};

const Timer = ({ timer, setTimeLeft, playSound }) => {
  const [play_button, set_play_button] = useState(true);
  return (
    <TouchableOpacity
      onPress={() => {
        play_button ? set_play_button(false) : set_play_button(true);
      }}
    >
      <CountdownCircleTimer
        isPlaying={play_button}
        duration={timer}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[timer, timer * 0.7, timer * 0.3, 0]}
        onComplete={() => {
          {
            setTimeLeft(0);
          }
          return [false, 1];
        }}
      >
        {({ remainingTime, elapsedTime, animatedColor }) =>
          innerTimer(remainingTime, elapsedTime, animatedColor, playSound)
        }
      </CountdownCircleTimer>
    </TouchableOpacity>
  );
};

const calculatePoints = (listItemPressed, data) => {
  let totalPoints = 0;
  for (let index = 0; index < 10; index++) {
    if (listItemPressed[index + 1] == true) {
      totalPoints += data[index].points;
    }
  }
  return totalPoints;
};

const save_data = async () => {
  try {
    // console.log("save data");
    await AsyncStorage.setItem(QUESTIONS_USED_KEY, JSON.stringify(questionsUsed));
    // console.log('Settings saved', JSON.stringify(state)) // this is ok
  } catch (e) {
    console.log("Used question is not saved", e);
  }
};

const read_data = async () => {
  // console.log("read_data");
  try {
    const usedQuestions_str = AsyncStorage.getItem(QUESTIONS_USED_KEY);
    const questionsUsed = JSON.parse(usedQuestions_str);
    if (questionsUsed !== undefined && questionsUsed !== null) {
      console.log("Used Questions read");
    } else {
      let questionsUsed = [];
      console.log("Reset Used questions");
    }
  } catch (e) {
    let questionsUsed = [];
    // console.log(e);
  }
};

export default function PlayScreen({ route, navigation }) {
  const { state, setState } = useContext(ContextMain);
  const [modalVisible, setModalVisible] = useState(false);

  // Confirmation pop up relative components. start
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const modalMessage = [
    <Text style={sharedStyles.textMenu} key="1">
      Game ongoing.
    </Text>,
    <Text style={sharedStyles.textMenu} key="2">
      Are you sure?
    </Text>,
    <Text key="3"> </Text>,
  ];
  // Confirmation pop up relative components. end

  const [listItemPressed, setlistItemPressed] = useState(listItemPressedStore);
  const questionKey = route.params["questionkey"];

  const question = questionsData[route.params["questionkey"]];
  // console.log(question);
  const question_difficulty = question["difficulty"];
  const question_category = question["category"];
  //   console.log(question['difficulty']);

  const [timeLeft, setTimeLeft] = useState(10);

  // console.log(question_key);
  const [sound, setSound] = React.useState();

  async function playSound() {
    //    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(require("../assets/threebells.mp3"));
    setSound(sound);

    //    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    read_data();
    return sound
      ? () => {
          // console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [questionKey]);

  const onExitPress = () => {
    if (
      state["current_round"] == state["rounds_selected"] &&
      state["play_index"] == state["teams_selected"]
    ) {
      navigation.navigate("EndOfGameScreen");
    } else {
      const totalPoints = calculatePoints(listItemPressed, question.data);
      const pointsOfTeamSelected = state[teamSelected + "_points"];
      const newPoints = "" + (parseInt(pointsOfTeamSelected) + totalPoints);
      setState({
        ...state,
        [teamSelected + "_points"]: newPoints,
        lastPointsEarned: totalPoints,
      });
      questionsUsed.push(questionKey);
      save_data();

      navigation.navigate("AfterQuestionScreen");
    }
  };

  const onPressListItem = (item) => {
    if (listItemPressed[item.id] == false) {
      setlistItemPressed({ ...listItemPressed, [`${item.id}`]: true });
    } else {
      setlistItemPressed({ ...listItemPressed, [`${item.id}`]: false });
    }
  };

  const renderListItem = ({ item }) => {
    const backgroundColor = listItemPressed[item.id] ? colorOfTeamSelected : "#f9c2ff";
    return (
      <ListItem item={item} onPress={() => onPressListItem(item)} style={{ backgroundColor }} />
    );
  };

  console.log("Run play screen");
  // # todo: tech depth. use object or array for team properties. const person = { name: "Alice" };person.name = "Bob";
  const timer_secs = parseInt(state.secs_selected);
  const _teamSelected = state["play_order"];
  const playIndex = parseInt(state["play_index"] - 1);
  let teamSelected = "team_1";
  if (_teamSelected[playIndex] !== undefined && _teamSelected[playIndex] !== null) {
    teamSelected = _teamSelected[playIndex].split("_").slice(0, 2).join("_");
  } else {
    console.log("something went wrong", state);
  }

  const colorOfTeamSelected = state[teamSelected + "_color"];
  const nameOfTeamSelected = state[teamSelected + "_name"];
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Text style={{ fontSize: 26, color: colorOfTeamSelected }}>{nameOfTeamSelected} </Text>
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
      </View>
      {/* // Timer block */}
      <View
        style={{
          alignSelf: "stretch",
          maxWidth: windowWidth,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            fontSize: 24,
            alignSelf: "stretch",
            marginRight: 10,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0.7,
            backgroundColor: "transparent",
            maxwidth: windowWidth * 0.8,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              alignSelf: "center",
              marginRight: 10,
              flexWrap: "wrap",
              textAlign: "center",
            }}
          >
            {question.question}
          </Text>
        </View>
        <View style={{ backgroundColor: "transparent" }}>
          <Timer timer={timer_secs} setTimeLeft={setTimeLeft} playSound={playSound} />
        </View>
      </View>
      {timeLeft == 0 && (
        <View>
          <Text>Time is up! You can now review the answers.</Text>
        </View>
      )}

      {/* List of Items block */}
      <View
        style={{
          backgroundColor: "transparent",
          padding: 10,
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "stretch",
        }}
      >
        <FlatList
          data={question.data}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          // extraData={listItemPressed}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
        <Text style={{ fontSize: 7, color: colorOfTeamSelected }}>
          Category: {question_category} {"\n"}Difficulty: {question_difficulty}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "transparent",
          margin: 10,
          alignContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "stretch",
        }}
      >
        <LinearGradient
          colors={ButtonShades} //"#F0F0FC"
          style={sharedStyles.buttonStyle}
        >
          <TouchableOpacity style={[{ backgroundColor: "transparent" }]} onPress={openModal}>
            <Text style={sharedStyles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* Render ConfirmationPopUp only when modalVisible is true */}
        {modalVisible && (
          <ConfirmationPopUp
            modalVisible={modalVisible}
            popUpMessage={modalMessage}
            onClose={closeModal}
            navigation={navigation}
            navigationToScreenName="HomeScreen"
          />
        )}
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
            <Text style={sharedStyles.buttonText}>OK</Text>
          </TouchableOpacity>
        </LinearGradient>
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
  remainingTime: {
    fontSize: 46,
  },

  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  textTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textSubTitle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  textParagraph: {
    color: "black",
    textAlign: "center",
    fontSize: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});

{
  /*
  todo: have a bank of messages, that can be randomly picked up on occasions.
      e.g. When you answered all the questions, select a random from "awesome feedback"
           When you answered almost non of the questions, select a randoms from the "mocking feedback"
  todo: add a question mark at the top right of the screen that says that explains what can you do. 
        Check how it works at focus app
  todo: check why sounds does not play. 
*/
}
