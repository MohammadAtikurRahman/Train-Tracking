// app.js
const express = require("express");
const cors = require("cors");
const dataController = require("./controllers/dataController");
const locationController = require("./controllers/locationController");

const app = express();

app.use(cors()); // Enable CORS

const port = 4100;

// Routes
app.get("/data", dataController.getStations);
app.get("/location", locationController.getNearestStation);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
