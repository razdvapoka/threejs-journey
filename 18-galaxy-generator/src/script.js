import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 300 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Galaxy

const parameters = {
  count: 50000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 2,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

let starsGeometry = null;
let starsMaterial = null;
let stars = null;

const generateGalaxy = () => {
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);
  for (let i = 0; i < parameters.count; i++) {
    const pi = i * 3;
    const r = Math.random() * parameters.radius;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * 2 * Math.PI;
    const spinAngle = r * parameters.spin;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      parameters.randomness *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      parameters.randomness *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      parameters.randomness *
      (Math.random() < 0.5 ? 1 : -1);
    positions[pi] = Math.cos(branchAngle + spinAngle) * r + randomX;
    positions[pi + 1] = randomY;
    positions[pi + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, Math.pow(r / parameters.radius, 2));

    colors[pi] = mixedColor.r;
    colors[pi + 1] = mixedColor.g;
    colors[pi + 2] = mixedColor.b;
  }
  const positionsBuffer = new THREE.Float32BufferAttribute(positions, 3);
  const colorsBuffer = new THREE.Float32BufferAttribute(colors, 3);
  if (stars) {
    starsGeometry.dispose();
    starsMaterial.dispose();
    scene.remove(stars);
  }
  starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute("position", positionsBuffer);
  starsGeometry.setAttribute("color", colorsBuffer);
  starsMaterial = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });
  stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
};

gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

gui
  .add(parameters, "count", 100, 500000)
  .step(100)
  .onFinishChange(generateGalaxy);

gui
  .add(parameters, "size", 0.001, 0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);

gui
  .add(parameters, "radius", 0.01, 20)
  .step(0.01)
  .onFinishChange(generateGalaxy);

gui.add(parameters, "branches", 2, 20).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, "spin", -5, 5).step(0.01).onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness", 0, 1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower", 1, 10)
  .step(1)
  .onFinishChange(generateGalaxy);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //parameters.spin = Math.sin(elapsedTime / 10) * 5;
  //generateGalaxy();
  //stars.rotation.y = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

