export const DISCORD = "https://discord.gg/u6P5wu8ywc";
export const EMAIL = "wiscohumanoids@gmail.com";
export const ORG_ID = "35538";
export const teams = [
  {
    id: "hands-arms",
    number: "01",
    name: "Hands & Arms",
    category: "HARDWARE",
    description:
      "Designs and builds the manipulators \u2014 from 7-DOF arms to custom five-fingered hands. Machining, 3D printing, and tendon routing.",
    skills: ["CAD", "Machining", "3D Printing", "Kinematics"],
    lead: "Open",
  },
  {
    id: "manipulation",
    number: "02",
    name: "Manipulation",
    category: "SOFTWARE",
    description:
      "Grasping, in-hand reorientation, contact planning. Bridges the hardware hands with intelligent control to pick up and use objects.",
    skills: ["ROS2", "Grasp Planning", "Python", "Control"],
    lead: "Open",
  },
  {
    id: "legs-locomotion",
    number: "03",
    name: "Legs & Locomotion",
    category: "HARDWARE",
    description:
      "Bipedal walking. Designs leg actuators, runs dynamics simulations, and tunes the gaits that keep the robot balanced and upright.",
    skills: ["Dynamics", "CAD", "Simulation", "Gait Design"],
    lead: "Open",
  },
  {
    id: "torso",
    number: "04",
    name: "Torso",
    category: "HARDWARE",
    description:
      "The central chassis. Machines the frame, integrates compute and battery, and routes power and data through the internal spine.",
    skills: ["Structural Design", "Power Systems", "Machining", "Integration"],
    lead: "Open",
  },
  {
    id: "controls",
    number: "05",
    name: "Controls",
    category: "SOFTWARE",
    description:
      "Closed-loop reflexes. Inverse kinematics, torque control, and balance feedback running at 1kHz to keep every joint stable.",
    skills: ["Control Theory", "C++", "Real-Time", "ZMP/WBC"],
    lead: "Open",
  },
  {
    id: "planning-autonomy",
    number: "06",
    name: "Planning & Autonomy",
    category: "SOFTWARE",
    description:
      "The brain. Motion planners, task schedulers, and behavior trees that turn perception and goals into a sequence of actions.",
    skills: ["Motion Planning", "Behavior Trees", "Python", "RRT/OMP"],
    lead: "Open",
  },
  {
    id: "perception-vision",
    number: "07",
    name: "Perception & Vision",
    category: "SOFTWARE",
    description:
      "The eyes. Depth estimation, object detection, and scene understanding \u2014 turning raw camera frames into a world model.",
    skills: ["Computer Vision", "PyTorch", "Stereo", "ROS2"],
    lead: "Open",
  },
  {
    id: "operations",
    number: "08",
    name: "Operations",
    category: "SUPPORT",
    description:
      "Keeps the team running. Sponsorship, outreach, logistics, documentation, and the Discord community. Non-engineering welcome.",
    skills: ["Outreach", "Sponsorship", "Logistics", "Comms"],
    lead: "Open",
  },
];
export const roadmap = [
  {
    phase: "Phase 01",
    months: "Months 1\u20134",
    period: "Oct 2025 \u2014 Jan 2026",
    title: "Foundation & Learning Systems",
    milestones: [
      "Robot learning rig setup to start implementing VLA models for pick and place",
      "Design and prototype custom actuators for humanoid joints",
      "6 degrees of freedom humanoid arm prototyped and tested",
      "Initial perception and control infrastructure established",
    ],
  },
  {
    phase: "Phase 02",
    months: "Months 5\u20138",
    period: "Feb 2026 \u2014 May 2026",
    title: "Advanced Manipulation",
    milestones: [
      "Dexterous robotic hands with 16+ degrees of freedom prototyped",
      "Integration testing with 6-DOF arms and dexterous hands",
      "Vision-language-action model training on manipulation tasks",
      "Custom actuator manufacturing and testing pipeline",
    ],
  },
  {
    phase: "Phase 03",
    months: "Months 9\u201312",
    period: "Jun 2026 \u2014 Sep 2026",
    title: "Mobile Platform & Autonomy",
    milestones: [
      "Wheeled robot with dual SO-100 arms deployed",
      "Autonomous navigation to traverse areas and complete tasks",
      "Demonstration of pick and place, food delivery, laundry folding",
      "Automatic space cleanup and household task execution",
      "Year 2 bipedal humanoid planning and design kickoff",
    ],
  },
];
export const sponsors = [
  {
    name: "College of Engineering",
    sub: "UNIVERSITY OF WISCONSIN-MADISON",
    crest: true,
  },
  {
    name: "Department of Electrical and Computer Engineering",
    sub: "UNIVERSITY OF WISCONSIN-MADISON",
    crest: true,
  },
  {
    name: "Department of Mechanical Engineering",
    sub: "UNIVERSITY OF WISCONSIN-MADISON",
    crest: true,
  },
  { name: "OpenAI", sub: "", crest: false },
];
