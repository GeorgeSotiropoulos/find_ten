import React from "react";
import { Text, View } from "react-native";

export const MakeBarPlotStandings = (state) => {
  const oneTeamBarPlot = (teamPoints, teamColor, teamName, lessTurn, key, divisor) => {
    return (
      <View>
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
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              alignSelf: "stretch",
              flexDirection: "row",
              alignItems: "center", //view 2
            }}
          >
            <Text style={{ width: 35 }}>{teamPoints}</Text>

            <View
              style={{
                height: 15,
                alignSelf: "center",
                width: "" + (teamPoints / divisor) * 100 + "%",
                borderColor: "#000",
                borderWidth: 2,
                borderRadius: 5,
                flexDirection: "row",
                backgroundColor: teamColor,
              }}
            ></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              backgroundColor: "transparent",
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <Text
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              {" "}
              {teamName}{" "}
            </Text>
            {lessTurn && [<Text>*</Text>]}
          </View>
        </View>
        {lessTurn && [
          <Text
            style={{
              fontSize: 12,
              fontStyle: "italic",
              flexDirection: "row",
              alignSelf: "center",
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
    barplots.push(
      oneTeamBarPlot(teamPoints, colorOfTeamSelected, nameOfTeamSelected, lessTurn, "" + i, divider)
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
