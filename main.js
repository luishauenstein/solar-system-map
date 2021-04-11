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
camera.position.set(500, 0, 0);
camera.lookAt(0, 0, 0);

//orbit controls for camera
const controls = new OrbitControls(camera, renderer.domElement);

//LIGHT EXPERIMENTS
scene.add(new THREE.AmbientLight(0x101010));

const lightdist = 110;
const strength = 3;
const light1 = new THREE.PointLight(0xffffff, strength, 0, 2);
light1.position.set(lightdist, 0, 0);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, strength, 0, 2);
light2.position.set(-lightdist, 0, 0);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, strength, 0, 2);
light3.position.set(0, lightdist, 0);
scene.add(light3);

const light4 = new THREE.PointLight(0xffffff, strength, 0, 2);
light4.position.set(0, -lightdist, 0);
scene.add(light4);

const light5 = new THREE.PointLight(0xffffff, strength, 0, 2);
light5.position.set(0, 0, lightdist);
scene.add(light5);

const light6 = new THREE.PointLight(0xffffff, strength, 0, 2);
light6.position.set(0, 0, -lightdist);
scene.add(light6);

class CelestialObject {
  constructor(name, rotSpeed = 0.005, tilt = 0.5) {
    this.name = name;
    this.url = `./models/${name}.gltf`;
    this.rotSpeed = rotSpeed;
    this.tilt = tilt;
    this.LoadGLTF();
  }

  LoadGLTF() {
    const loader = new GLTFLoader();
    loader.load(this.url, (gltf) => this._OnLoaded(gltf.scene));
  }

  _OnLoaded(obj) {
    this.transform = obj;
    this.transform.position.set(0, 0, 0);
    this.transform.rotation.x = this.tilt;
    scene.add(this.transform);
  }

  rotate(factor = 1) {
    this.transform && (this.transform.rotation.y += this.rotSpeed * factor);
  }
}

const earth = new CelestialObject("earth");
setTimeout(() => earth.transform.position.set(350, 0, 0), 1000);
const sun = new CelestialObject("sun", 0.001);

function animate() {
  requestAnimationFrame(animate);

  sun.rotate();
  earth.rotate();

  renderer.render(scene, camera);
}
animate();
