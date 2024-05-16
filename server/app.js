const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS

const port = 4100;

const overpassApiUrl = "http://overpass-api.de/api/interpreter";
const overpassQuery = `
[out:json];
area["ISO3166-1"="BD"][admin_level=2];
node["railway"="station"](area);
out body;
`;

// Function to fetch railway station data from Overpass API
const fetchRailwayStations = async () => {
  try {
    const response = await axios.post(
      overpassApiUrl,
      `data=${encodeURIComponent(overpassQuery)}`
    );
    return response.data.elements.map((element) => [
      element.lat,
      element.lon,
      element.tags.name,
    ]);
  } catch (error) {
    console.error("Error fetching railway stations from Overpass API:", error);
    return [];
  }
};

// Endpoint to get railway stations data
app.get("/data", async (req, res) => {
  const stations = await fetchRailwayStations();
  res.json(stations);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
