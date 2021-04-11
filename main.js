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
camera.position.set(250, 250, 0);
camera.lookAt(0, 0, 0);

//orbit controls for camera
const controls = new OrbitControls(camera, renderer.domElement);

//const light = new THREE.AmbientLight(0xffffff); // soft white light
const light = new THREE.PointLight();
light.position.set(100, 50, 50);
scene.add(light);

// class CelestialObject {
//   constructor(scene, name) {
//     //super();
//     this.name = name;
//     this.url = `./models/${name}.gltf`;
//     this.object = null;

//     let obj;
//     const loader = new GLTFLoader();
//     loader.load(
//       this.url,
//       function (gltf) {
//         obj = gltf.scene;
//         obj.position.set(0, 0, 0);
//         obj.rotation.x = 120;
//         scene.add(obj);
//         this.object = obj;
//         console.log(this.object);
//       },
//       undefined,
//       function (error) {
//         console.error(error);
//       }
//     );
//   }

//   rotate() {
//     this.object.rotation.y += 0.05;
//   }
// }

// const sun = new CelestialObject(scene, "sun");

const loader = new GLTFLoader();
let obj;
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

const rotate = (obj) => {
  obj && (obj.rotation.y += 0.005);
};

function animate() {
  requestAnimationFrame(animate);

  rotate(obj);

  renderer.render(scene, camera);
}
animate();
