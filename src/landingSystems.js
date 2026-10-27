import { teams } from "./data.js";

export const teamModel = {
  "hands-arms": "arms",
  manipulation: "manipulation",
  "legs-locomotion": "legs",
  torso: "torso",
  controls: "controls",
  "planning-autonomy": "planning",
  "perception-vision": "perception",
  operations: "operations",
};
const section = (id, number, teamId, title) => {
  const team = teams.find((team) => team.id === teamId);
  return {
    id,
    name: title,
    label: `${number} / ${team.name}`,
    body: team.description,
    team: team.name,
    tags: team.skills,
    teamId,
  };
};

// The original landing page includes Head & Sensing in addition to its eight
// directory teams. Keep that system, and include every actual directory team.
export const landingSystems = [
  {
    id: "head",
    name: "A way to see.",
    label: "01 / Head & sensing",
    body: "Stereo cameras, an IMU array, and a custom mounting chassis give the humanoid perception of the world and its own orientation.",
    team: "Head & Sensing",
    tags: ["Sensors", "Stereo cameras", "Orientation"],
  },
  section("torso", "02", "torso", "A place to connect."),
  section("arms", "03", "hands-arms", "Built to reach."),
  section("legs", "04", "legs-locomotion", "Finding our footing."),
  section("manipulation", "05", "manipulation", "From reach to grasp."),
  section(
    "perception",
    "06",
    "perception-vision",
    "Making sense of the world.",
  ),
  section("planning", "07", "planning-autonomy", "Turning goals into action."),
  section("controls", "08", "controls", "Making it all move."),
  section("operations", "09", "operations", "The people behind the build."),
];
