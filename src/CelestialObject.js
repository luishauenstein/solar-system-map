import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//github.com/andrmoel/astronomy-bundle-js
//www.npmjs.com/package/astronomy-bundle
import { createTimeOfInterest } from "astronomy-bundle/time";
import { createEarth } from "astronomy-bundle/earth";
import {
  createMercury,
  createVenus,
  createMars,
  createJupiter,
  createSaturn,
  createUranus,
  createNeptune,
} from "astronomy-bundle/planets";

class CelestialObject {
  constructor(scene, name, position = new THREE.Vector3(0, 0, 0), rangeFactor = 250, rotSpeed = 0.005, tilt = 0.5) {
    this.scene = scene;
    this.name = name;
    this.url = `./models/${name}.gltf`;
    this.initialPos = position;
    this.rangeFactor = rangeFactor;
    this.rotSpeed = rotSpeed;
    this.tilt = tilt;
    this._LoadGLTF();
    this._AssignAstronomyObj(); //method get correct create[Planet] function from astronomy library
  }

  async SetPosition() {
    const date = new Date("2021-04-13 15:30:00");
    const toi = createTimeOfInterest.fromDate(date);
    const astronomyObject = this.astronomy(toi);
    const coords = await astronomyObject.getHeliocentricEclipticRectangularDateCoordinates();
    this.transform.position.set(coords.x * this.rangeFactor, coords.z * this.rangeFactor, coords.y * this.rangeFactor); //switch z & y bc. astronomy library uses different axes
    console.log(
      `${this.name} pos: x${this.transform.position.x} y${this.transform.position.y} z${this.transform.position.z}`
    );
  }

  Rotate(factor = 1) {
    this.transform && (this.transform.rotation.y += this.rotSpeed * factor);
  }

  _CreatePointLight(position) {
    const light1 = new THREE.PointLight(0xffffff, 1, 2000, 2);
    light1.position.set(position.x, position.y, position.z);
    this.scene.add(light1);
  }

  _LoadGLTF() {
    const loader = new GLTFLoader();
    loader.load(this.url, (gltf) => this._OnLoaded(gltf.scene));
  }

  _OnLoaded(obj) {
    this.transform = obj;
    this.transform.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
    this.transform.rotation.x = this.tilt;
    this.scene.add(this.transform);
    this.name != "sun" && this.SetPosition();
  }

  _OnSunLoad() {
    const lightdist = 110;
    this._CreatePointLight(new THREE.Vector3(lightdist, 0, 0));
    this._CreatePointLight(new THREE.Vector3(-lightdist, 0, 0));
    this._CreatePointLight(new THREE.Vector3(0, lightdist, 0));
    this._CreatePointLight(new THREE.Vector3(0, -lightdist, 0));
    this._CreatePointLight(new THREE.Vector3(0, 0, lightdist));
    this._CreatePointLight(new THREE.Vector3(0, 0, -lightdist));
  }

  _AssignAstronomyObj() {
    switch (this.name) {
      case "sun":
        this._OnSunLoad();
        break;
      case "mercury":
        this.astronomy = (i) => createMercury(i);
        break;
      case "venus":
        this.astronomy = (i) => createVenus(i);
        break;
      case "earth":
        this.astronomy = (i) => createEarth(i);
        break;
      case "mars":
        this.astronomy = (i) => createMars(i);
        break;
      case "jupiter":
        this.astronomy = (i) => createJupiter(i);
        break;
      case "saturn":
        this.astronomy = (i) => createSaturn(i);
        break;
      case "uranus":
        this.astronomy = (i) => createUranus(i);
        break;
      case "neptune":
        this.astronomy = (i) => createNeptune(i);
        break;
    }
  }
}

export default CelestialObject;
