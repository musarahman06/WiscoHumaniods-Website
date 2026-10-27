import React from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function RobotViewer({ active = "assembled" }) {
  const host = useRef(null),
    activeRef = useRef(active);
  const [status, setStatus] = useState("loading");
  activeRef.current = active;
  useEffect(() => {
    const el = host.current;
    let renderer,
      model,
      frame,
      disposed = false,
      observer;
    const materials = [],
      geometries = new Set();
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0.1, 8.5);
      camera.lookAt(0, 0, 0);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x777163, 2.3));
      const key = new THREE.DirectionalLight(0xfff8e8, 3);
      key.position.set(3, 5, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 2);
      rim.position.set(-4, 3, -2);
      scene.add(rim);
      const resize = () => {
        const w = el.clientWidth,
          h = el.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      observer = new ResizeObserver(resize);
      observer.observe(el);
      resize();
      const names = {
        head: ["Head"],
        torso: ["Torso", "Pelvis"],
        arms: ["Arm_L", "Arm_R", "Forearm_L", "Forearm_R", "Hand_L", "Hand_R"],
        legs: ["Thigh_L", "Thigh_R", "Shin_L", "Shin_R", "Foot_L", "Foot_R"],
      };
      const partNames = new Set(Object.values(names).flat());
      const reduced = matchMedia("(prefers-reduced-motion: reduce)");
      new GLTFLoader().load(
        "/assets/robot.glb",
        (gltf) => {
          if (disposed) {
            gltf.scene.traverse((o) => {
              o.geometry?.dispose();
              if (o.material) [o.material].flat().forEach((m) => m.dispose());
            });
            return;
          }
          model = gltf.scene;
          const bounds = new THREE.Box3().setFromObject(model),
            scale = 3.9 / bounds.getSize(new THREE.Vector3()).y;
          const center = bounds.getCenter(new THREE.Vector3());
          model.scale.setScalar(scale);
          model.position.copy(center.multiplyScalar(-scale));
          const group = new THREE.Group();
          group.add(model);
          scene.add(group);
          model = group;
          model.traverse((o) => {
            if (o.isMesh) {
              geometries.add(o.geometry);
              o.material = o.material.clone();
              let owner = o;
              while (owner.parent && !partNames.has(owner.name))
                owner = owner.parent;
              materials.push({
                part: owner.name,
                material: o.material,
                color: o.material.color.clone(),
                emissive: o.material.emissive?.clone(),
              });
            }
          });
          setStatus("ready");
        },
        undefined,
        () => !disposed && setStatus("error"),
      );
      const render = () => {
        if (disposed) return;
        frame = requestAnimationFrame(render);
        if (model) {
          const selected =
            names[activeRef.current] ||
            (activeRef.current === "perception"
              ? names.head
              : activeRef.current === "controls"
                ? [...names.arms, ...names.legs]
                : []);
          materials.forEach(({ part, material, color, emissive }) => {
            const focus = selected.includes(part);
            material.color.lerp(
              focus ? new THREE.Color("#c5050c") : color,
              reduced.matches ? 1 : 0.12,
            );
            if (emissive)
              material.emissive.copy(
                focus ? new THREE.Color("#390000") : emissive,
              );
          });
          const target = activeRef.current === "assembled" ? -0.25 : 0.12;
          model.rotation.y = reduced.matches
            ? target
            : THREE.MathUtils.lerp(model.rotation.y, target, 0.055);
          renderer.render(scene, camera);
        }
      };
      render();
    } catch {
      setStatus("error");
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      materials.forEach(({ material }) => material.dispose());
      geometries.forEach((g) => g.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);
  return (
    <div
      className="robot-view"
      role="img"
      aria-label={`Original WiscoHumanoids robot, ${active === "assembled" ? "assembled view" : active + " systems highlighted"}`}
    >
      <div ref={host} className="canvas-host" />
      {status === "loading" && (
        <p className="model-status" role="status">
          Loading original robot model…
        </p>
      )}
      {status === "error" && (
        <div className="model-fallback">
          <img
            src="/assets/outreach-1.jpg"
            alt="The club’s custom robotic hand"
          />
          <p>3D view unavailable. Explore each system below.</p>
          <a href="/assets/robot.glb" download>
            Download the original model ↓
          </a>
        </div>
      )}
    </div>
  );
}
