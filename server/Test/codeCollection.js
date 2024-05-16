// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const readline = require('readline');

// const app = express();
// const port = 3000;

// // Endpoint to read and return the CSV file lines containing "railway station"
// app.get('/data', (req, res) => {
//     const results = [];
//     const csvFilePath = path.join(__dirname, 'train.csv');

//     // Check if the CSV file exists
//     if (!fs.existsSync(csvFilePath)) {
//         console.error('CSV file not found:', csvFilePath);
//         res.status(500).json({ error: 'CSV file not found' });
//         return;
//     }

//     const readStream = fs.createReadStream(csvFilePath);
//     const rl = readline.createInterface({
//         input: readStream,
//         crlfDelay: Infinity
//     });

//     rl.on('line', (line) => {
//         console.log('Line:', line); // Log each line of data
//         if (line.toLowerCase().includes('railway station')) {
//             results.push({ line: line });
//         }
//     });

//     rl.on('close', () => {
//         res.json(results);
//     });

//     readStream.on('error', (error) => {
//         console.error('Error reading CSV file:', error);
//         res.status(500).json({ error: 'Error reading CSV file' });
//     });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const readline = require('readline');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// // Function to get coordinates from Nominatim API
// const getCoordinates = async (address) => {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
//     try {
//         const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
//         if (response.data.length > 0) {
//             const location = response.data[0];
//             return [parseFloat(location.lat), parseFloat(location.lon), address];
//         } else {
//             console.error(`No results found for address: ${address}`);
//             return null;
//         }
//     } catch (error) {
//         console.error(`Error fetching coordinates for address: ${address}`, error);
//         return null;
//     }
// };

// // Endpoint to read, filter, and geocode the CSV file lines
// app.get('/data', async (req, res) => {
//     const results = [];
//     const csvFilePath = path.join(__dirname, 'train.csv');

//     // Check if the CSV file exists
//     if (!fs.existsSync(csvFilePath)) {
//         console.error('CSV file not found:', csvFilePath);
//         res.status(500).json({ error: 'CSV file not found' });
//         return;
//     }

//     const readStream = fs.createReadStream(csvFilePath);
//     const rl = readline.createInterface({
//         input: readStream,
//         crlfDelay: Infinity
//     });

//     for await (const line of rl) {
//         console.log('Line:', line); // Log each line of data
//         if (line.toLowerCase().includes('railway station')) {
//             const coordinates = await getCoordinates(line);
//             if (coordinates) {
//                 results.push(coordinates);
//             }
//         }
//     }

//     res.json(results);

//     readStream.on('error', (error) => {
//         console.error('Error reading CSV file:', error);
//         res.status(500).json({ error: 'Error reading CSV file' });
//     });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// const overpassApiUrl = 'http://overpass-api.de/api/interpreter';
// const overpassQuery = `
// [out:json];
// area["ISO3166-1"="BD"][admin_level=2];
// node["railway"="station"](area);
// out body;
// `;

// // Function to fetch railway station data from Overpass API
// const fetchRailwayStations = async () => {
//     try {
//         const response = await axios.post(overpassApiUrl, `data=${encodeURIComponent(overpassQuery)}`);
//         return response.data.elements.map(element => ({
//             name: element.tags.name,
//             lat: element.lat,
//             lon: element.lon
//         }));
//     } catch (error) {
//         console.error('Error fetching railway stations from Overpass API:', error);
//         return [];
//     }
// };

// // Endpoint to get railway stations data
// app.get('/data', async (req, res) => {
//     const stations = await fetchRailwayStations();
//     res.json(stations);
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
