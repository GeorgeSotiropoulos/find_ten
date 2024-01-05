import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonShades, sharedStyles } from "./SettingsScreen";

function HowToScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", color: "black" }}>
        <Text style={styles.textTitle}> Rules of the game.</Text>
      </View>
      <View style={{ alignItems: "center", color: "black" }}>
        <Text style={styles.textSubTitle}> Goal </Text>
        <Text style={styles.textParagraph}>
          Get as much points as possible by finding the answers for each question/card.
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <Text style={styles.textSubTitle}> How to play </Text>
        <Text style={styles.textParagraph}>
          Divide the players into two or more teams. {"\n\n"} Team A starts first. A player of the
          other team holds the phone and asks out loud the question.{"\n"} After that, he presses
          the 'Start' buttom and the count down starts. {"\n"}
          {"\n"}
          Team A has to say correctly as many answers as possible within the time limit. If they
          correctly say an answer, then the person who is holding the phone presses on the answer ,
          and selects it by highlighting it. (Note: Answers, can't be exact so not be strict. E.G.
          If the correct answer is "Eat well" and the player said "Eat Healthy", then that's
          correct){("\n", "\n")}
          When time is over both Team A and the person who is holding the phone revise the answers
          and make adjustments if necessary. (e.g. Maybe she forgot to enter one).{"\n"} The correct
          answers give points to the team and the next screen shows the withstanding.
          {"\n"}
          {"\n"} Next, the phone goes to the hands of a player of Team A and it is Team's B turn to
          answer the next question. {("\n", "\n")}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <Text style={styles.textSubTitle}> The winner! </Text>
        <Text style={styles.textParagraph}>
          The winner is the Team that gathered the most points at the end of the game.
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <Text style={styles.textSubTitle}> The looser... </Text>
        <Text style={styles.textParagraph}>
          The team that lost will have to do something silly. {"\n"}
          {"\n"}
        </Text>
      </View>
      <LinearGradient
        colors={ButtonShades} //"#F0F0FC"
        style={sharedStyles.buttonStyle}
      >
        <TouchableOpacity
          style={[{ backgroundColor: "transparent" }]}
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <Text style={sharedStyles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default HowToScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
    marginHorizontal: "10%",
    marginVertical: "10%",
    padding: 5,
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
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  textParagraph: {
    color: "black",
    textAlign: "center",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
