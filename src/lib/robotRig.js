import * as THREE from "three";
import { createOriginalTeamModels } from "./originalTeamModels.js";

const PARTS = {
  head: ["Head"],
  torso: ["Torso", "Pelvis"],
  arms: ["Arm_L", "Arm_R"],
  legs: ["Thigh_L", "Thigh_R"],
};
const HARDWARE = new Set(Object.keys(PARTS));
const SOFTWARE = new Set(["planning", "perception", "operations"]);

// Detach complete limbs without changing any of their world transforms.
export function createRobotRig(source) {
  const root = new THREE.Group();
  const bounds = new THREE.Box3().setFromObject(source);
  const scale = 3.9 / bounds.getSize(new THREE.Vector3()).y;
  source.scale.multiplyScalar(scale);
  source.position.sub(
    bounds.getCenter(new THREE.Vector3()).multiplyScalar(scale),
  );
  root.add(source);
  root.updateMatrixWorld(true);
  const nodes = Object.entries(PARTS).flatMap(([system, names]) =>
    names.map((name) => ({ system, node: source.getObjectByName(name) })),
  );
  if (nodes.some(({ node }) => !node)) throw new Error("Robot part missing");
  const parts = nodes.map(({ system, node }) => {
    const pivot = new THREE.Group();
    pivot.position.copy(node.getWorldPosition(new THREE.Vector3()));
    root.add(pivot);
    pivot.attach(node);
    return { system, pivot, home: pivot.position.clone() };
  });
  root.remove(source);
  const originals = createOriginalTeamModels();
  for (const system of [...SOFTWARE, "teleoperator"]) {
    const node = originals[system];
    const center = new THREE.Box3()
      .setFromObject(node)
      .getCenter(new THREE.Vector3());
    const pivot = new THREE.Group();
    pivot.add(node);
    node.position.sub(center);
    root.add(pivot);
    parts.push({ system, pivot, home: new THREE.Vector3() });
  }
  root.updateMatrixWorld(true);
  for (const part of parts)
    part.bounds = new THREE.Box3().setFromObject(part.pivot);
  return { root, parts, operatorArms: originals.operatorArms };
}

export function getRobotPose(rig, active, aspect) {
  const assembled = active === "assembled";
  const controls = active === "controls";
  // Manipulation uses the actual hands and arms: the original had no separate
  // manipulation model, so it shares the original hardware rather than a stand-in.
  const system = active === "manipulation" ? "arms" : active;
  const base = rig.parts.map((part) => {
    const hardware = HARDWARE.has(part.system);
    const visible = assembled
      ? hardware
      : controls
        ? hardware || part.system === "teleoperator"
        : part.system === system;
    const position = part.home.clone();
    let scale = 1;
    if (controls) {
      if (hardware) position.x += 1;
      else if (part.system === "teleoperator") {
        position.x = -1.2;
        scale = 1.8;
      }
    }
    return { visible, position, scale };
  });
  const bounds = new THREE.Box3();
  rig.parts.forEach((part, i) => {
    const target = base[i];
    if (!target.visible) return;
    const offset = target.position
      .clone()
      .sub(part.home.clone().multiplyScalar(target.scale));
    const box = part.bounds.clone();
    box.min.multiplyScalar(target.scale).add(offset);
    box.max.multiplyScalar(target.scale).add(offset);
    bounds.union(box);
  });
  const center = assembled
    ? new THREE.Vector3()
    : bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(16)) * 8.5;
  const scale = assembled
    ? 1
    : Math.min(
        (viewHeight * 0.7) / size.y,
        (viewHeight * aspect * 0.7) / Math.max(size.x, size.z),
        5,
      );
  return base.map((part, i) => ({
    visible: part.visible,
    scale: part.visible ? part.scale * scale : 0,
    position: part.visible
      ? part.position.sub(center).multiplyScalar(scale)
      : rig.parts[i].home
          .clone()
          .add(
            new THREE.Vector3(Math.sign(rig.parts[i].home.x) * 1.2, -1.5, -1),
          ),
  }));
}

export function animateTeamModels(rig, active, time, reduced) {
  const movement = reduced ? 0 : Math.sin(time * 2.2) * 0.25;
  rig.operatorArms.left.rotation.set(-0.4 + movement, 0, 0.25);
  rig.operatorArms.right.rotation.set(-0.4 - movement, 0, -0.25);
}
