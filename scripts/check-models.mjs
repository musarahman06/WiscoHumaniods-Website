import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import {
  createRobotRig,
  getRobotPose,
  animateTeamModels,
} from "../src/lib/robotRig.js";
import { teams } from "../src/data.js";
import { landingSystems, teamModel } from "../src/landingSystems.js";
const bytes = readFileSync(
  new URL("../public/assets/robot.glb", import.meta.url),
);
const gltf = await new GLTFLoader().parseAsync(
  bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  "",
);
let original = 0;
gltf.scene.traverse((o) => {
  if (o.isMesh) original++;
});
const rig = createRobotRig(gltf.scene);
const views = ["assembled", ...landingSystems.map((s) => s.id)];
assert.equal(teams.length, 8);
for (const team of teams) {
  assert.ok(teamModel[team.id]);
  assert.ok(landingSystems.some((s) => s.teamId === team.id));
}
for (const aspect of [0.75, 1, 1.4])
  for (const active of views) {
    const pose = getRobotPose(rig, active, aspect);
    assert.equal(
      pose.filter((p) => p.visible).length,
      {
        assembled: 7,
        head: 1,
        torso: 2,
        arms: 2,
        legs: 2,
        manipulation: 2,
        perception: 1,
        planning: 1,
        controls: 8,
        operations: 1,
      }[active],
    );
    rig.parts.forEach((p, i) => {
      p.pivot.position.copy(pose[i].position);
      p.pivot.scale.setScalar(pose[i].scale);
      p.pivot.visible = pose[i].visible;
    });
    rig.root.updateMatrixWorld(true);
    const bounds = new THREE.Box3();
    rig.parts.forEach((p, i) => {
      if (pose[i].visible)
        bounds.union(new THREE.Box3().setFromObject(p.pivot));
    });
    const size = bounds.getSize(new THREE.Vector3());
    assert.ok(
      size.y < 4.7 && size.x < 4.9 * aspect,
      `${active} fits ${aspect}: ${size.toArray()}`,
    );
    animateTeamModels(rig, active, 1, false);
  }
let hardwareMeshes = 0;
rig.parts
  .filter((p) => ["head", "torso", "arms", "legs"].includes(p.system))
  .forEach((p) =>
    p.pivot.traverse((o) => {
      if (o.isMesh) hardwareMeshes++;
    }),
  );
assert.equal(hardwareMeshes, original);
const restored = getRobotPose(rig, "assembled", 1);
rig.parts.forEach((part, i) => {
  if (restored[i].visible) {
    assert.equal(restored[i].scale, 1);
    assert.ok(restored[i].position.distanceTo(part.home) < 1e-6);
  }
});
console.log(
  "Passed: all eight teams have landing sections and model views; ten poses fit three viewport ratios; original robot geometry and assembly preserved; recovered scenes construct and animate.",
);
