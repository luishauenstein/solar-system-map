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

class Planet {
  constructor(scene, name) {
    this.name = name;
    this.url = `./models/${name}.gltf`;

    let obj;
    const loader = new GLTFLoader();
    loader.load(
      this.url,
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

    this.object = obj;
    console.log(this.object);
  }

  rotate() {
    this.object.rotation.y += 0.05;
  }
}

const sun = new Planet(scene, "sun");

// const InstantiatePlanet = () => {
//   let obj;
//   const loader = new GLTFLoader();
//   loader.load(
//     "./models/sun.gltf",
//     function (gltf) {
//       obj = gltf.scene;
//       obj.position.set(0, 0, 0);
//       obj.rotation.x = 120;
//       scene.add(obj);
//     },
//     undefined,
//     function (error) {
//       console.error(error);
//     }
//   );
//   return obj;
// };

// const obj = InstantiatePlanet();

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
  //obj && (obj.rotation.x += 0.005);

  sun.rotate();
  //cube && cube.rotateOnWorldAxis(rotationVector, 0.01);

  renderer.render(scene, camera);
}
animate();
