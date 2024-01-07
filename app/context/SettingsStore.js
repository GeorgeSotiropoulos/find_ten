import React, { useState } from "react";
import PackageContext from "./ContextMain";

export const SETTINGS_SELECTED_KEY = "save_settings_selected";

export const initial_state = {
  rounds_selected: "10",
  secs_selected: "60",
  teams_selected: "4",
  difficulty_easy_selected: "true",
  difficulty_medium_selected: "true",
  difficulty_hard_selected: "true",
  team_1: {
    name: "Team 1",
    color: "red",
    points: "0",
  },
  team_2: {
    name: "Team 2",
    color: "blue",
    points: "0",
  },
  team_3: {
    name: "Team 3",
    color: "purple",
    points: "0",
  },
  team_1: {
    name: "Team 4",
    color: "green",
    points: "0",
  },
  team_1_name: "Team 1",
  team_2_name: "Team 2",
  team_3_name: "Team 3",
  team_4_name: "Team 4",
  team_1_color: "red",
  team_2_color: "blue",
  team_3_color: "purple",
  team_4_color: "green",
  current_round: "3",
  team_1_points: "10",
  team_2_points: "22",
  team_3_points: "33",
  team_4_points: "566",
  play_order: ["team_1", "team_2", "team_3", "team_4"],
  play_index: "1",
};

const Provider = (props) => {
  const [state, setState] = useState(initial_state);

  return (
    <PackageContext.Provider value={{ state, setState }}>{props.children}</PackageContext.Provider>
  );
};

export default Provider;
