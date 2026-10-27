import * as THREE from "three";

// Original procedural models recovered from the owner’s public Base44 bundle.
// Geometry, materials, and proportions are preserved; only Three.js aliases
// and exported function names have been expanded.
function createPlanningModel({ jointMat: e, accentMat: t, glowMat: n }) {
  let r = new THREE.Group(),
    i = new THREE.MeshStandardMaterial({
      color: 10332088,
      metalness: 0.7,
      roughness: 0.35,
    });
  for (let e of [-1, 1]) {
    let a = new THREE.SphereGeometry(0.62, 64, 48),
      o = a.attributes.position,
      s = new THREE.Vector3();
    for (let e = 0; e < o.count; e++) {
      s.fromBufferAttribute(o, e);
      let t = Math.atan2(s.z, s.x),
        n = Math.acos(THREE.MathUtils.clamp(s.y / 0.62, -1, 1)),
        r = (0.5 + 0.5 * Math.sin(t * 9 + Math.sin(n * 5) * 1.8)) ** 5;
      (s.multiplyScalar(
        1 - 0.13 * r * Math.sin(n) + 0.04 * Math.cos(n * 11 + t * 3),
      ),
        o.setXYZ(e, s.x, s.y, s.z));
    }
    a.computeVertexNormals();
    let c = new THREE.Mesh(a, i);
    (c.scale.set(0.7, 1, 1.12), (c.position.x = e * 0.4), r.add(c));
    for (let i = 0; i < 3; i++) {
      let a = Array.from({ length: 12 }, (t, n) => {
          let r = -0.45 + i * 0.45 + 0.09 * Math.sin(n * 0.8 + i),
            a = -0.72 + n * 0.13;
          return new THREE.Vector3(
            e * 0.4 + r * 0.434,
            a * 0.62,
            0.694 * Math.sqrt(Math.max(0, 1 - r * r - a * a)) + 0.09,
          );
        }),
        o = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(a),
          48,
          0.014,
          8,
          !1,
        );
      r.add(new THREE.Mesh(o, t));
      let s = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), n);
      (s.position.copy(a[a.length - 1]), r.add(s));
    }
  }
  let a = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.35, 16), e);
  ((a.position.y = -0.72), r.add(a));
  let o = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.14), e);
  o.position.set(0, -0.28, 0.67);
  let s = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, 0.025), n);
  return ((s.position.z = 0.085), o.add(s), r.add(o), r);
}
function createPerceptionModel({
  bodyMat: e,
  accentMat: t,
  glowMat: n,
  jointMat: r,
  darkMat: i,
}) {
  let a = new THREE.Group(),
    o = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 0.35), e);
  a.add(o);
  for (let r of [-1, 1]) {
    let o = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.36, 24), e);
    ((o.rotation.x = Math.PI / 2), o.position.set(r * 0.45, 0, 0.18), a.add(o));
    let s = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), i);
    (s.position.set(r * 0.45, 0, 0.37), a.add(s));
    let c = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.16, 24), t);
    (c.position.set(r * 0.45, 0, 0.37), a.add(c));
    let l = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), n);
    (l.position.set(r * 0.45, 0, 0.38), a.add(l));
  }
  let s = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.12), r);
  (s.position.set(0, 0, 0.2), a.add(s));
  let c = new Float32Array(600),
    l = new Float32Array(600);
  for (let e = 0; e < 200; e++) {
    let t = e % 20,
      n = Math.floor(e / 20),
      r = (t - 20 / 2) * 0.12 + (Math.random() - 0.5) * 0.03,
      i = (n - 10 / 2) * 0.12 + (Math.random() - 0.5) * 0.03,
      a = 0.6 + Math.sin(r * 2) * Math.cos(i * 2) * 0.4 + Math.random() * 0.15;
    ((c[e * 3] = r), (c[e * 3 + 1] = i), (c[e * 3 + 2] = a));
    let o = 0.3 + (a - 0.2) * 0.7;
    ((l[e * 3] = 0.77 * o),
      (l[e * 3 + 1] = 0.02 * o),
      (l[e * 3 + 2] = 0.05 * o));
  }
  let u = new THREE.BufferGeometry();
  (u.setAttribute(`position`, new THREE.BufferAttribute(c, 3)),
    u.setAttribute(`color`, new THREE.BufferAttribute(l, 3)));
  let d = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: !0,
    transparent: !0,
    opacity: 0.85,
    sizeAttenuation: !0,
  });
  a.add(new THREE.Points(u, d));
  let f = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 1.8, 12, 9),
    new THREE.MeshBasicMaterial({
      color: 12911884,
      wireframe: !0,
      transparent: !0,
      opacity: 0.18,
    }),
  );
  ((f.position.z = 0.9), a.add(f));
  let p = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0.5, 0.5, 0.5)),
    new THREE.LineBasicMaterial({
      color: 12911884,
      transparent: !0,
      opacity: 0.7,
    }),
  );
  (p.position.set(0.35, -0.15, 1.3), a.add(p));
  for (let [e, n] of [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ]) {
    let r = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.03), t);
    (r.position.set(0.35 + e * 0.26, -0.15 + n * 0.26, 1.46), a.add(r));
  }
  return a;
}
function createControlsModel() {
  let e = new THREE.Group(),
    t = new THREE.MeshStandardMaterial({
      color: 1710618,
      metalness: 0.1,
      roughness: 0.85,
    }),
    n = new THREE.MeshStandardMaterial({
      color: 13935988,
      metalness: 0,
      roughness: 0.7,
    }),
    r = new THREE.MeshStandardMaterial({
      color: 2039583,
      metalness: 0.85,
      roughness: 0.15,
    }),
    i = new THREE.MeshStandardMaterial({
      color: 1118481,
      metalness: 0,
      roughness: 0.9,
    }),
    a = new THREE.MeshStandardMaterial({
      color: 2763306,
      metalness: 0.6,
      roughness: 0.3,
    }),
    o = new THREE.MeshStandardMaterial({
      color: 12911884,
      emissive: 12911884,
      emissiveIntensity: 0.6,
      roughness: 0.4,
    }),
    s = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.42, 4, 12), t);
  ((s.position.y = 0.75), e.add(s));
  let c = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.1, 4, 10), t);
  ((c.position.y = 0.28), e.add(c));
  let l = new THREE.CylinderGeometry(0.075, 0.06, 0.55, 8),
    u = new THREE.Mesh(l, t);
  (u.position.set(-0.12, -0.02, 0), e.add(u));
  let d = new THREE.Mesh(l, t);
  (d.position.set(0.12, -0.02, 0), e.add(d));
  let f = new THREE.BoxGeometry(0.1, 0.05, 0.18),
    p = new THREE.Mesh(f, t);
  (p.position.set(-0.12, -0.32, 0.04), e.add(p));
  let m = new THREE.Mesh(f, t);
  (m.position.set(0.12, -0.32, 0.04), e.add(m));
  let h = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.08, 8), n);
  ((h.position.y = 1.18), e.add(h));
  let g = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), n);
  ((g.position.y = 1.35), e.add(g));
  let _ = new THREE.MeshStandardMaterial({
    color: 2759178,
    metalness: 0,
    roughness: 0.95,
  });
  for (let [t, n, r] of [
    [0, 1.5, 0],
    [0.08, 1.49, 0.02],
    [-0.08, 1.49, 0.02],
    [0.05, 1.49, -0.06],
    [-0.05, 1.49, -0.06],
    [0, 1.52, 0.04],
    [0.1, 1.48, -0.02],
    [-0.1, 1.48, -0.02],
    [0, 1.51, -0.08],
  ]) {
    let i = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), _);
    (i.position.set(t, n, r), e.add(i));
  }
  let v = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.13, 0.15), r);
  (v.position.set(0, 1.36, 0.1), e.add(v));
  let y = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.06), o);
  (y.position.set(0, 1.36, 0.181), e.add(y));
  let b = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.022, 6, 16, Math.PI),
    i,
  );
  (b.position.set(0, 1.36, 0), (b.rotation.y = Math.PI / 2), e.add(b));
  let x = new THREE.Group();
  (x.position.set(-0.21, 1, 0), e.add(x));
  let S = new THREE.Group();
  (S.position.set(0.21, 1, 0), e.add(S));
  let C = new THREE.CylinderGeometry(0.065, 0.055, 0.35, 8),
    w = new THREE.Mesh(C, t);
  ((w.position.y = -0.17), x.add(w));
  let T = new THREE.Mesh(C, t);
  ((T.position.y = -0.17), S.add(T));
  let E = new THREE.CylinderGeometry(0.05, 0.04, 0.32, 8),
    D = new THREE.Mesh(E, n);
  ((D.position.y = -0.5), x.add(D));
  let O = new THREE.Mesh(E, n);
  ((O.position.y = -0.5), S.add(O));
  let k = new THREE.SphereGeometry(0.06, 8, 6),
    A = new THREE.Mesh(k, n);
  ((A.position.y = -0.68), x.add(A));
  let j = new THREE.Mesh(k, n);
  ((j.position.y = -0.68), S.add(j));
  let M = new THREE.BoxGeometry(0.05, 0.09, 0.05),
    N = new THREE.Mesh(M, a);
  (N.position.set(0, -0.76, 0.04), x.add(N));
  let P = new THREE.Mesh(M, a);
  (P.position.set(0, -0.76, 0.04), S.add(P));
  let F = new THREE.TorusGeometry(0.028, 0.008, 6, 12),
    I = new THREE.Mesh(F, o);
  (I.position.set(0, -0.8, 0.04), x.add(I));
  let ee = new THREE.Mesh(F, o);
  return (
    ee.position.set(0, -0.8, 0.04),
    S.add(ee),
    { group: e, arms: { left: x, right: S } }
  );
}
function createOperationsModel() {
  let e = new THREE.Group(),
    t = new THREE.MeshStandardMaterial({
      color: 16777215,
      roughness: 0.6,
      metalness: 0.05,
    }),
    n = new THREE.MeshStandardMaterial({
      color: 13751771,
      roughness: 0.4,
      metalness: 0.3,
    }),
    r = new THREE.MeshStandardMaterial({
      color: 2042167,
      roughness: 0.5,
      metalness: 0.2,
    }),
    i = new THREE.MeshStandardMaterial({
      color: 12911884,
      emissive: 12911884,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      metalness: 0.2,
    }),
    a = new THREE.MeshStandardMaterial({
      color: 13938487,
      metalness: 0.95,
      roughness: 0.2,
    }),
    o = new THREE.Group(),
    s = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.03, 1.6), t);
  o.add(s);
  let c = 2.5 / 7,
    l = 1.5 / 5,
    u = -1.25,
    d = -0.75;
  for (let e = 0; e <= 7; e++) {
    let t = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.02, 1.5), n);
    (t.position.set(u + e * c, 0.025, 0), o.add(t));
  }
  for (let e = 0; e <= 5; e++) {
    let t = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.02, 0.015), n);
    (t.position.set(0, 0.025, d + e * l), o.add(t));
  }
  for (let e = 0; e < 7; e++) {
    let t = new THREE.Mesh(
      new THREE.BoxGeometry(0.33714285714285713, 0.015, 0.27999999999999997),
      r,
    );
    (t.position.set(u + e * c + c / 2, 0.03, -0.6), o.add(t));
  }
  for (let [e, t] of [
    [2, 3],
    [4, 2],
    [5, 4],
  ]) {
    let n = new THREE.Mesh(
      new THREE.BoxGeometry(0.33714285714285713, 0.015, 0.27999999999999997),
      i,
    );
    (n.position.set(u + e * c + c / 2, 0.035, d + t * l + l / 2), o.add(n));
  }
  ((o.rotation.x = Math.PI / 2.3), e.add(o));
  let f = new THREE.Group();
  for (let e = 0; e < 5; e++) {
    let t = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), a);
    ((t.position.y = e * 0.05), f.add(t));
  }
  (f.position.set(1.2, 0, 0.3), e.add(f));
  let p = new THREE.Group();
  for (let e = 0; e < 3; e++) {
    let t = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.04, 24), a);
    ((t.position.y = e * 0.05), p.add(t));
  }
  (p.position.set(-1.3, 0, -0.2), e.add(p));
  let m = new THREE.Box3().setFromObject(e).getCenter(new THREE.Vector3());
  return (e.position.sub(m), e);
}
export function createOriginalTeamModels() {
  const materials = {
    jointMat: new THREE.MeshStandardMaterial({
      color: 1914199,
      metalness: 0.85,
      roughness: 0.25,
    }),
    accentMat: new THREE.MeshStandardMaterial({
      color: 15087942,
      metalness: 0.35,
      roughness: 0.45,
    }),
    glowMat: new THREE.MeshStandardMaterial({
      color: 15087942,
      emissive: 15087942,
      emissiveIntensity: 1.1,
      roughness: 0.4,
    }),
    bodyMat: new THREE.MeshStandardMaterial({
      color: 15858414,
      metalness: 0.15,
      roughness: 0.55,
    }),
    darkMat: new THREE.MeshStandardMaterial({
      color: 1914199,
      metalness: 0.7,
      roughness: 0.3,
    }),
  };
  const controls = createControlsModel();
  return {
    planning: createPlanningModel(materials),
    perception: createPerceptionModel(materials),
    teleoperator: controls.group,
    operations: createOperationsModel(),
    operatorArms: controls.arms,
  };
}
