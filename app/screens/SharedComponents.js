import MaskedView from "@react-native-community/masked-view";
import React from "react";
import { Text, View } from "react-native";

export const MakeBarPlotStandings = (state) => {
  const oneTeamBarPlot = (teamPoints, teamColor, teamName, lessTurn, key, divisor) => {
    const teamNameText = () => {
      if (lessTurn) {
        return teamName + " *";
      } else {
        return teamName;
      }
    };

    return (
      <View key={key}>
        <View
          key={key}
          style={{
            alignSelf: "stretch",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between", //view 1
          }}
        >
          <Text
            style={{
              width: 35,
              color: "black",
              alignSelf: "center",
              backgroundColor: "transparent",
            }}
          >
            {teamPoints}
          </Text>
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              alignSelf: "stretch",
              flexDirection: "row",
              alignItems: "center", //view 2
              // justifyContent: "center",
            }}
          >
            {/* // Progress bar, I play with "width" to indicate percentage */}
            <View
              style={[
                {
                  height: 15,
                  width: "" + (teamPoints / divisor) * 100 + "%",
                  borderColor: "#000",
                  backgroundColor: teamColor,
                  borderWidth: 2,
                  borderRadius: 5,
                  flexDirection: "row", //progressbar,
                  alignSelf: "center",
                  // alignItems: "center", //view 2
                  // paddingVertical: "2",
                },
              ]}
            ></View>
          </View>

          <MaskedView
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              flexDirection: "row",
              alignSelf: "flex-end",
              backgroundColor: "transparent",
              position: "absolute",
              right: 0,
              top: 0,
            }}
            maskElement={
              // I define text which will be masked
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  backgroundColor: "transparent",
                  position: "absolute",
                }}
              >
                <Text
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                  }}
                  numberOfLines={1}
                >
                  {teamNameText()}
                </Text>
              </View>
            }
          >
            {/* // I define a default mask that I apply to the text so that it is 'black' when it is not ON
        the progress bar. */}
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: teamColor,
                alignSelf: "center",
              }}
            />
            {/* // I define the mask that takes the size of the progress bar and that I apply over the
        default mask (to overwrite it) so that the text under the mask becomes white. */}
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: "" + (5 + (teamPoints / divisor) * 100) + "%",
                backgroundColor: "white",
                alignSelf: "center",
              }}
            />
          </MaskedView>
        </View>
        {lessTurnText && [
          <Text
            key={key}
            style={{
              fontSize: 12,
              fontStyle: "italic",
              flexDirection: "row",
              alignSelf: "flex-end",
            }}
          >
            * = One turn less
          </Text>,
        ]}
      </View>
    );
  };

  const _find_scale = (state) => {
    let allpoints = [
      parseInt(state["team_1_points"]),
      parseInt(state["team_2_points"]),
      parseInt(state["team_3_points"]),
      parseInt(state["team_4_points"]),
    ];
    let max = Math.max.apply(Math, allpoints);
    divider = (Math.floor(max / 100) + 1) * 100;
    return divider;
  };
  let divider = _find_scale(state);
  // let divisor_se = 100

  let barplots = [];
  let lessTurnText = false;
  // for each team
  for (let i = 0; i < state["teams_selected"]; i++) {
    let teamSel = state["play_order"][i];
    teamSel = teamSel.split("_").slice(0, 2).join("_");
    let colorOfTeamSelected = state[teamSel + "_color"];
    let nameOfTeamSelected = state[teamSel + "_name"];
    let teamPoints = state[teamSel + "_points"];
    let lessTurn = false;
    // console.log(i, parseInt(state['play_index']))
    if (i + 1 >= parseInt(state["play_index"]) && parseInt(state["play_index"]) != 1) {
      lessTurn = true;
    }
    if (lessTurn == true && i + 1 == parseInt(state["teams_selected"])) {
      lessTurnText = true;
    }

    barplots.push(
      oneTeamBarPlot(
        teamPoints,
        colorOfTeamSelected,
        nameOfTeamSelected,
        lessTurn,
        "" + i,
        divider,
        lessTurnText
      )
    );
  }
  return barplots;
};

export const FindWinnerAndLoosingTeam = (state) => {
  let allpoints = [
    parseInt(state["team_1_points"]),
    parseInt(state["team_2_points"]),
    parseInt(state["team_3_points"]),
    parseInt(state["team_4_points"]),
  ];
  let i = allpoints.indexOf(Math.max(...allpoints)) + 1;
  let winningTeam = "team_" + i;
  i = allpoints.indexOf(Math.min(...allpoints.slice(0, parseInt(state["teams_selected"])))) + 1;
  let loosingTeam = "team_" + i;

  return { winningTeam: winningTeam, loosingTeam: loosingTeam };
};
