import * as THREE from "./three/build/three.module.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";

console.log("run");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

/*
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const loader = new GLTFLoader();
let sun;
loader.load(
  "./lowpolyplanets/sun/model.gltf",
  function (gltf) {
    sun = gltf.scene;
    sun.position.x = 0;
    sun.position.y = 0;
    sun.position.z = 0;
    scene.add(sun);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
*/

const rotationVector = new THREE.Vector3(1, -4, 0).normalize();

//sample cube:
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
cube.lookAt(rotationVector);
scene.add(cube);

camera.position.z = 10;
camera.position.x = 10;
camera.position.y = 10;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  //sun && (sun.rotation.y += 0.005);
  cube && cube.rotateOnWorldAxis(rotationVector, 0.01);

  renderer.render(scene, camera);
}
animate();
