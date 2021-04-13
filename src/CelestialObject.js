import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//github.com/andrmoel/astronomy-bundle-js
//www.npmjs.com/package/astronomy-bundle
import { createTimeOfInterest } from "astronomy-bundle/time";
import { createEarth } from "astronomy-bundle/earth";

class CelestialObject {
  constructor(scene, name, position = new THREE.Vector3(0, 0, 0), rotSpeed = 0.005, tilt = 0.5) {
    this.name = name;
    this.url = `./models/${name}.gltf`;
    this.rotSpeed = rotSpeed;
    this.tilt = tilt;
    this.initialPos = position;
    this.LoadGLTF();
    this.scene = scene;
    this.name == "sun" && this._OnSunLoad(); //run _OnSunLoad() if constructed object is "sun"
  }

  async SetPosition() {
    const date = new Date("2017-12-02 15:30:00");
    const toi = createTimeOfInterest.fromDate(date);
    const earth = createEarth(toi);
    const coords = await earth.getHeliocentricEclipticRectangularDateCoordinates();
    console.log(coords);
    const factor = 250;
    this.transform.position.set(coords.x * factor, coords.z * factor, coords.y * factor); //switch z & y bc. astronomy library uses different axes
    console.log(this.transform.position);
  }

  Rotate(factor = 1) {
    this.transform && (this.transform.rotation.y += this.rotSpeed * factor);
  }

  CreatePointLight(position) {
    const light1 = new THREE.PointLight(0xffffff, 1, 2000, 2);
    light1.position.set(position.x, position.y, position.z);
    this.scene.add(light1);
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
    this.name == "earth" && this.SetPosition();
  }

  _OnSunLoad() {
    const lightdist = 110;
    this.CreatePointLight(new THREE.Vector3(lightdist, 0, 0));
    this.CreatePointLight(new THREE.Vector3(-lightdist, 0, 0));
    this.CreatePointLight(new THREE.Vector3(0, lightdist, 0));
    this.CreatePointLight(new THREE.Vector3(0, -lightdist, 0));
    this.CreatePointLight(new THREE.Vector3(0, 0, lightdist));
    this.CreatePointLight(new THREE.Vector3(0, 0, -lightdist));
  }
}

export default CelestialObject;
