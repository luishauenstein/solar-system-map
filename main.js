import * as THREE from "./three/build/three.module.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";

console.log("run");

const scene = new THREE.Scene();

//init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50, 50, -50);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//const light = new THREE.AmbientLight(0xffffff); // soft white light
const light = new THREE.PointLight();
light.position.set(100, 50, 50);
scene.add(light);

let obj;
const loader = new GLTFLoader();
loader.load(
  "./models/earth.gltf",
  function (gltf) {
    obj = gltf.scene;
    obj.position.set(0, 0, 0);
    obj.rotation.x = 120;
    scene.add(obj);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

/*
//sample cube:
const rotationVector = new THREE.Vector3(1, -4, 0).normalize();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(geometry, material);
cube.lookAt(rotationVector);
cube.scale.set(2, 2, 2);
scene.add(cube);
*/

function animate() {
  requestAnimationFrame(animate);

  obj && (obj.rotation.y += 0.005);
  //obj.rotateOnAxis(rotationVector, 0.005);
  //cube && cube.rotateOnWorldAxis(rotationVector, 0.01);

  renderer.render(scene, camera);
}
animate();
