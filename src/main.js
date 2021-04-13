import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import CelestialObject from "./CelestialObject.js";

//init webgl renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(500, 0, 0);
camera.lookAt(0, 0, 0);

//orbit controls for camera
const controls = new OrbitControls(camera, renderer.domElement);

//LIGHT EXPERIMENTS
scene.add(new THREE.AmbientLight(0x101010));

const sun = new CelestialObject(scene, "sun", new THREE.Vector3(0, 0, 0), 0.001);
const mercury = new CelestialObject(scene, "mercury", new THREE.Vector3(100, 0, 50));
const venus = new CelestialObject(scene, "venus", new THREE.Vector3(150, 0, -10));
const earth = new CelestialObject(scene, "earth", new THREE.Vector3(250, 0, 0));
const mars = new CelestialObject(scene, "mars", new THREE.Vector3(350, 0, 60));
const saturn = new CelestialObject(scene, "saturn", new THREE.Vector3(550, 0, -100));
const jupiter = new CelestialObject(scene, "jupiter", new THREE.Vector3(800, 0, -20));
const uranus = new CelestialObject(scene, "uranus", new THREE.Vector3(950, 0, -0));
const neptune = new CelestialObject(scene, "neptune", new THREE.Vector3(1100, 0, -0));
const pluto = new CelestialObject(scene, "pluto", new THREE.Vector3(1200, 0, -0));

function animate() {
  requestAnimationFrame(animate);

  sun.rotate();
  earth.rotate();

  renderer.render(scene, camera);
}
animate();
