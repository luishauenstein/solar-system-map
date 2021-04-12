import * as THREE from "./three/build/three.module.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";

class CelestialObject {
  constructor(scene, name, position = new THREE.Vector3(0, 0, 0), rotSpeed = 0.005, tilt = 0.5) {
    this.name = name;
    this.url = `./models/${name}.gltf`;
    this.rotSpeed = rotSpeed;
    this.tilt = tilt;
    this.initialPos = position;
    this.LoadGLTF();
    this.scene = scene;
  }

  LoadGLTF() {
    const loader = new GLTFLoader();
    loader.load(this.url, (gltf) => this._OnLoaded(gltf.scene));
  }

  _OnLoaded(obj) {
    this.transform = obj;
    this.transform.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
    this.transform.rotation.x = this.tilt;
    this.scene.add(this.transform);
  }

  rotate(factor = 1) {
    this.transform && (this.transform.rotation.y += this.rotSpeed * factor);
  }
}

export default CelestialObject;
