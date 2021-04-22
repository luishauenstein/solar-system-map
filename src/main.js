import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./style.css";

import CelestialObject from "./CelestialObject.js";
import updateModel from "./updateModel.js";

//init webgl renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 500, 0);
camera.lookAt(0, 0, 0);

//orbit controls for camera
const controls = new OrbitControls(camera, renderer.domElement);

//LIGHT EXPERIMENTS
scene.add(new THREE.AmbientLight(0x101010));
//scene.add(new THREE.AmbientLight(0xffffff));

const sun = new CelestialObject(scene, "sun", 250, 0.001);
const mercury = new CelestialObject(scene, "mercury", 300);
const venus = new CelestialObject(scene, "venus");
const earth = new CelestialObject(scene, "earth");
const mars = new CelestialObject(scene, "mars");
const jupiter = new CelestialObject(scene, "jupiter", 90);
const saturn = new CelestialObject(scene, "saturn", 70);
const uranus = new CelestialObject(scene, "uranus", 55);
const neptune = new CelestialObject(scene, "neptune", 50);
//array given to updateModel() function:
const updatePositionArray = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

const date = new Date();

function animate() {
  requestAnimationFrame(animate);

  date.setDate(date.getDate() + 1);

  //earth.transform && (earth.transform.rotation.y = 6.3);

  updateModel(updatePositionArray, date);

  renderer.render(scene, camera);
}
animate();
