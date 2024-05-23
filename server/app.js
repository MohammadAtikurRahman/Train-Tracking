// app.js
const express = require("express");
const cors = require("cors");
const stationController = require("./controllers/stationController");
const locationController = require("./controllers/locationController");
const trainController = require("./controllers/trainController");
const reverseController = require("./controllers/reverseController");


const app = express();

app.use(cors()); // Enable CORS

const port = 4100;

// Routes
app.get("/station", stationController.getStations);
app.get("/location", locationController.getStations);
app.get("/train", trainController.getStaticTrainData);
app.get("/sp-location", reverseController.getNearestLocationHandler);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
