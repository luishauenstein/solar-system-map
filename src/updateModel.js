//updates model fitting to datetime

const updateModel = (planetaryObjects, datetime) => {
  for (const planet of planetaryObjects) {
    planet.SetPositionByDate(datetime);
    planet.Rotate();
  }
};

export default updateModel;
