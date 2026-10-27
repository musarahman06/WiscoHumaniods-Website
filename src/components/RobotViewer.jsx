import React from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  createRobotRig,
  getRobotPose,
  animateTeamModels,
} from "../lib/robotRig";

export default function RobotViewer({ active = "assembled" }) {
  const host = useRef(null),
    activeRef = useRef(active);
  const [status, setStatus] = useState("loading");
  activeRef.current = active;
  useEffect(() => {
    const el = host.current;
    let renderer,
      model,
      rig,
      pose,
      previousActive,
      visible = true,
      visibilityObserver,
      cleanupListeners,
      frame,
      disposed = false,
      observer;
    const materials = new Set(),
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
        if (rig) pose = getRobotPose(rig, activeRef.current, camera.aspect);
      };
      observer = new ResizeObserver(resize);
      observer.observe(el);
      resize();
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
          rig = createRobotRig(gltf.scene);
          model = rig.root;
          scene.add(model);
          model.traverse((o) => {
            if (o.geometry) {
              geometries.add(o.geometry);
              for (const material of [o.material].flat())
                materials.add(material);
            }
          });
          pose = getRobotPose(rig, activeRef.current, camera.aspect);
          rig.parts.forEach((part, i) => {
            part.pivot.position.copy(pose[i].position);
            part.pivot.scale.setScalar(pose[i].scale);
            part.pivot.visible = pose[i].visible;
          });
          setStatus("ready");
        },
        undefined,
        () => !disposed && setStatus("error"),
      );
      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event) => {
        const rect = el.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      };
      const onPointerLeave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerleave", onPointerLeave);
      visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      visibilityObserver.observe(el);
      const clock = new THREE.Clock();
      const render = () => {
        if (disposed) return;
        frame = requestAnimationFrame(render);
        const delta = Math.min(clock.getDelta(), 0.05);
        if (model && visible && !document.hidden) {
          if (previousActive !== activeRef.current) {
            previousActive = activeRef.current;
            pose = getRobotPose(rig, previousActive, camera.aspect);
          }
          const blend = reduced.matches ? 1 : 1 - Math.exp(-delta * 8);
          rig.parts.forEach((part, i) => {
            const target = pose[i];
            part.pivot.position.lerp(target.position, blend);
            const scale = THREE.MathUtils.lerp(
              part.pivot.scale.x,
              target.scale,
              blend,
            );
            part.pivot.scale.setScalar(scale);
            part.pivot.visible = target.visible || scale > 0.015;
          });
          const assembled = ["assembled", "controls"].includes(
            activeRef.current,
          );
          const yaw = reduced.matches
            ? -0.12
            : (assembled ? -0.18 : 0) +
              Math.sin(clock.elapsedTime * 0.55) * (assembled ? 0.28 : 0.35) +
              pointer.x * 0.16;
          model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, yaw, blend);
          model.rotation.x = THREE.MathUtils.lerp(
            model.rotation.x,
            reduced.matches ? 0 : -pointer.y * 0.07,
            blend,
          );
          animateTeamModels(
            rig,
            activeRef.current,
            clock.elapsedTime,
            reduced.matches,
          );
          renderer.render(scene, camera);
        }
      };
      render();
      // Keep event cleanup with the viewer lifetime.
      cleanupListeners = () => {
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerleave", onPointerLeave);
      };
    } catch {
      setStatus("error");
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      visibilityObserver?.disconnect();
      cleanupListeners?.();
      materials.forEach((material) => material.dispose());
      geometries.forEach((g) => g.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);
  return (
    <div
      className="robot-view"
      role="img"
      aria-label={`Original WiscoHumanoids 3D scene, ${active === "assembled" ? "assembled robot" : active === "controls" ? "VR operator and humanoid controls" : active + " system"}`}
    >
      <div ref={host} className="canvas-host" />
      {status === "loading" && (
        <p className="model-status" role="status">
          Loading original 3D models…
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
