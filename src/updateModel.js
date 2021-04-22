const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//ui elements
const datetimeContainer = document.getElementById("datetime");

//updates simulation by datetime
const updateModel = (planetaryObjects, datetime) => {
  //update planet position & rotate them
  for (const planet of planetaryObjects) {
    planet.SetPositionByDate(datetime);
    planet.Rotate();
  }

  //update UI
  datetimeContainer.innerHTML = `${monthNames[datetime.getMonth()]} ${datetime.getYear() + 1900}`;
};

export default updateModel;
