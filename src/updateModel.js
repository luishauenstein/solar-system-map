import CelestialObject from "./CelestialObject.js";

const updateModel = (planetaryObjects, datetime) => {
  planetaryObjects.forEach((obj) => {
    obj.transform && obj.setPositionByDate(datetime);
  });
};

export default updateModel;
