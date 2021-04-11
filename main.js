import * as THREE from "./three/build/three.module.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";

//init webgl renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//init camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(250, 0, 0);
camera.lookAt(0, 0, 0);

//orbit controls for camera
const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.PointLight();
light.position.set(100, 50, 50);
scene.add(light);

/*
let obj;
let x = 5;
async function load() {
  const loader = new GLTFLoader();
  await loader
    .load("./models/earth.gltf", function (gltf) {
      obj = gltf.scene;
      obj.position.set(0, 0, 0);
      obj.rotation.x = 120;
      scene.add(obj);
      console.log(obj);
    })
    .resolve((i) => console.log(i));
}
load();
setTimeout(() => console.log(obj), 1000);
*/

class CelestialObject {
  constructor(name) {
    this.name = name;
    this.url = `./models/${name}.gltf`;
    this.LoadGLTF();
  }

  LoadGLTF() {
    const loader = new GLTFLoader();
    loader.load(this.url, (gltf) => this._OnLoaded(gltf.scene));
  }

  _OnLoaded(obj) {
    this.transform = obj;
    this.transform.position.set(0, 0, 0);
    this.transform.rotation.x = 120;
    scene.add(this.transform);
  }
}

const earth = new CelestialObject("earth");

const rotate = (co) => {
  co.transform && (co.transform.rotation.y += 0.005);
};

function animate() {
  requestAnimationFrame(animate);

  rotate(earth);

  renderer.render(scene, camera);
}
animate();
