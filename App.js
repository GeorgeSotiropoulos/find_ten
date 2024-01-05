import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Provider from "./app/context/SettingsStore";
import AfterQuestionScreen from "./app/screens/AfterQuestionScreen";
import ConfigureTeamsScreen from "./app/screens/ConfigureTeamsScreen";
import DraftScreen from "./app/screens/DraftScreen";
import EndOfGameScreen from "./app/screens/EndOfGameScreen";
import HomeScreen from "./app/screens/HomeScreen";
import HowToScreen from "./app/screens/HowToScreen";
import IntroduceQuestionScreen from "./app/screens/IntroduceQuestionScreen";
import PlayScreen from "./app/screens/PlayScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="DraftScreen" component={DraftScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="HowToScreen" component={HowToScreen} />
        <Stack.Screen name="ConfigureTeamsScreen" component={ConfigureTeamsScreen} />
        <Stack.Screen name="IntroduceQuestionScreen" component={IntroduceQuestionScreen} />
        <Stack.Screen name="AfterQuestionScreen" component={AfterQuestionScreen} />
        <Stack.Screen name="EndOfGameScreen" component={EndOfGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    // <Provider value={data}>
    <Provider>
      <App />
    </Provider>
  );
};
