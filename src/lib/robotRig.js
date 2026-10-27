import * as THREE from "three";

const PARTS = {
  head: ["Head"],
  torso: ["Torso", "Pelvis"],
  arms: ["Arm_L", "Arm_R"],
  legs: ["Thigh_L", "Thigh_R"],
};

// Detach complete limbs at their original world transforms. Forearms, hands,
// shins, and feet stay attached to their own limb, preserving the actual model.
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
  root.updateMatrixWorld(true);
  for (const part of parts)
    part.bounds = new THREE.Box3().setFromObject(part.pivot);
  return { root, parts };
}

export function getRobotPose(rig, active, aspect) {
  // Controls brings the whole robot back together: the systems working as one.
  const assembled = !PARTS[active];
  const selected = rig.parts.filter(
    (part) => assembled || part.system === active,
  );
  const bounds = new THREE.Box3();
  for (const part of selected) bounds.union(part.bounds);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(16)) * 8.5;
  const scale = assembled
    ? 1
    : Math.min(
        (viewHeight * 0.7) / size.y,
        (viewHeight * aspect * 0.7) / Math.max(size.x, size.z),
        5,
      );
  return rig.parts.map((part) => {
    const visible = assembled || part.system === active;
    return {
      visible,
      scale: visible ? scale : 0,
      position: visible
        ? part.home
            .clone()
            .sub(assembled ? new THREE.Vector3() : center)
            .multiplyScalar(scale)
        : part.home
            .clone()
            .add(new THREE.Vector3(Math.sign(part.home.x) * 1.2, -1.5, -1)),
    };
  });
}
