import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

// Particles
//
const particlesGeometry = new THREE.BufferGeometry();
// const m = 1;
const count = 50000;
let points = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  const pi = i * 3;
  points[pi] = (Math.random() - 0.5) * 10;
  points[pi + 1] = (Math.random() - 0.5) * 10;
  points[pi + 2] = (Math.random() - 0.5) * 10;

  colors[pi] = Math.random();
  colors[pi + 1] = Math.random();
  colors[pi + 2] = Math.random();

  // const mr = (Math.random() - 0.5) * 2 * Math.PI;
  // const r = 0.5 + Math.random() * m;
  // points[pi] = Math.sin(mr) * r;
  // points[pi + 1] = Math.cos(mr) * r;
  // points[pi + 2] = (Math.random() - 0.5) * r * 2;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(points, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  // color: "magenta",
  alphaMap: particleTexture,
  transparent: true,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
scene.add(cube);

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

console.log(particles.geometry.attributes.position.array);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //particles.rotation.x = elapsedTime * 0.02;
  //particles.rotation.z = elapsedTime * 2;

  for (let i = 0; i < count; i++) {
    const pi = i * 3;
    const x = particles.geometry.attributes.position.array[pi];
    const z = particles.geometry.attributes.position.array[pi + 2];
    particles.geometry.attributes.position.array[pi + 1] = Math.sin(
      elapsedTime + x - z
    );
  }
  particlesGeometry.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

