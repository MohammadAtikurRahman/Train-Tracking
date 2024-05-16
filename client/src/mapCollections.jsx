// import React from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const Map = () => {
//   const latitude = 23.750896;
//   const longitude = 90.384262;

//   return (
//     <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <TileLayer
//         url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//         attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//         minZoom={2}
//         maxZoom={19}
//         tileSize={256}
//       />
//     </MapContainer>
//   );
// };

// export default Map;

// src/Map.js
// import React from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import trainIconUrl from './station.png'; // Import the train icon PNG
// import trainOnIconUrl from './train-on.png'; // Import the train-on icon PNG

// // Create custom icons
// const trainIcon = new L.Icon({
//   iconUrl: trainIconUrl,
//   iconSize: [40, 40], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// const trainOnIcon = new L.Icon({
//   iconUrl: trainOnIconUrl,
//   iconSize: [60, 60], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// const Map = () => {
//   const mapCenter = [23.762273273678503, 90.38347198808196];

//   // Coordinates for train markers
//   const trainCoordinates = [
//     [23.739293088941018, 90.39597289706727],
//     [23.731888238103636, 90.39664911388664],
//     [23.730042344398733, 90.4080259308406],
//     [23.728097726282265, 90.41913246827563],
//     [23.75897616138037, 90.38706836970525],
//     [23.766579582182807, 90.38308354075897],
//     [23.77857028040535, 90.3800615218548],
//     [23.79113680392692, 90.37540520699224],
//     [23.799441823638514, 90.37195052179118],
//     [23.80847268459962, 90.36825980213871],
//     [23.819269628752128, 90.36527718572084],
//     [23.8261203148551, 90.36416138671343],
//     [23.845946476444986, 90.36304854492941],
//     [23.859550145335223, 90.36512135243414],
//     [23.869164580716, 90.36749449069714],
//     [23.751267010083282, 90.39269289507901]

//   ];

//   // Coordinate for the train-on marker
//   const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

//   return (
//     <MapContainer center={mapCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <TileLayer
//         url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//         attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//         minZoom={2}
//         maxZoom={19}
//         tileSize={256}
//       />
//       {trainCoordinates.map((coords, index) => (
//         <Marker key={index} position={coords} icon={trainIcon} />
//       ))}
//       <Marker position={trainOnCoordinate} icon={trainOnIcon} />
//     </MapContainer>
//   );
// };

// export default Map;


// src/Map.js



import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import trainIconUrl from './station.png'; // Import the train icon PNG
import trainOnIconUrl from './train-on.png'; // Import the train-on icon PNG

// Create custom icons
const trainIcon = new L.Icon({
  iconUrl: trainIconUrl,
  iconSize: [40, 40], // size of the icon
  iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
});

const trainOnIcon = new L.Icon({
  iconUrl: trainOnIconUrl,
  iconSize: [60, 60], // size of the icon
  iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
});

// Utility function to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    (1 - Math.cos(dLon)) / 2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

const Map = () => {
  const mapCenter = [23.762273273678503, 90.38347198808196];

  // Coordinates for train markers
  const trainCoordinates = [
    [23.739293088941018, 90.39597289706727],
    [23.731888238103636, 90.39664911388664],
    [23.730042344398733, 90.4080259308406],
    [23.728097726282265, 90.41913246827563],
    [23.75897616138037, 90.38706836970525],
    [23.766579582182807, 90.38308354075897],
    [23.77857028040535, 90.3800615218548],
    [23.79113680392692, 90.37540520699224],
    [23.799441823638514, 90.37195052179118],
    [23.80847268459962, 90.36825980213871],
    [23.819269628752128, 90.36527718572084],
    [23.8261203148551, 90.36416138671343],
    [23.845946476444986, 90.36304854492941],
    [23.859550145335223, 90.36512135243414],
    [23.869164580716, 90.36749449069714],
    [23.751267010083282, 90.39269289507901]
  ];

  // Coordinate for the train-on marker
  const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

  // Calculate the distance to the nearest station
  const distances = trainCoordinates.map(coords =>
    calculateDistance(trainOnCoordinate[0], trainOnCoordinate[1], coords[0], coords[1])
  );
  const minDistance = Math.min(...distances).toFixed(2);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TileLayer
        url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
        attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
        minZoom={2}
        maxZoom={19}
        tileSize={256}
      />
      {trainCoordinates.map((coords, index) => (
        <Marker key={index} position={coords} icon={trainIcon} />
      ))}
      <Marker position={trainOnCoordinate} icon={trainOnIcon}>
        <Popup>
          Nearest station is approximately {minDistance} km away.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import stationIconUrl from './station.png'; // Import the station icon PNG
// import trainOnIconUrl from './train-on.png'; // Import the train-on icon PNG

// // Create custom icons
// const stationIcon = new L.Icon({
//   iconUrl: stationIconUrl,
//   iconSize: [50, 50], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// const trainOnIcon = new L.Icon({
//   iconUrl: trainOnIconUrl,
//   iconSize: [50, 50], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// // Utility function to calculate distance between two coordinates in kilometers
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     0.5 - Math.cos(dLat) / 2 +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//     (1 - Math.cos(dLon)) / 2;

//   return R * 2 * Math.asin(Math.sqrt(a));
// };

// const Map = () => {
//   const mapCenter = [23.762273273678503, 90.38347198808196];

//   // Coordinates for train markers with station names
//   const trainCoordinates = [
//     [23.739293088941018, 90.39597289706727, 'Shahbag'],
//     [23.731888238103636, 90.39664911388664, 'Dhaka University'],
//     [23.730042344398733, 90.4080259308406, 'Bangladesh Secretariat'],
//     [23.728097726282265, 90.41913246827563, 'Motijheel'],
//     [23.75897616138037, 90.38706836970525, 'Farmgate'],
//     [23.766579582182807, 90.38308354075897, 'Bijoy Sarani'],
//     [23.77857028040535, 90.3800615218548, 'Agargaon'],
//     [23.79113680392692, 90.37540520699224, 'Shewrapara'],
//     [23.799441823638514, 90.37195052179118, 'Kazipara'],
//     [23.80847268459962, 90.36825980213871, 'Mirpur 10'],
//     [23.819269628752128, 90.36527718572084, 'Mirpur 11'],
//     [23.8261203148551, 90.36416138671343, 'Pallabi'],
//     [23.845946476444986, 90.36304854492941, 'Uttara South'],
//     [23.859550145335223, 90.36512135243414, 'Uttara Center'],
//     [23.869164580716, 90.36749449069714, 'Uttara North'],
//     [23.751267010083282, 90.39269289507901, 'Karwan Bazar']
//   ];

//   // Coordinate for the train-on marker
//   const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

//   // Calculate the distance to the nearest station
//   const distances = trainCoordinates.map(coords =>
//     calculateDistance(trainOnCoordinate[0], trainOnCoordinate[1], coords[0], coords[1])
//   );
//   const minDistanceIndex = distances.indexOf(Math.min(...distances));
//   const minDistance = distances[minDistanceIndex].toFixed(2);
//   const nearestStationName = trainCoordinates[minDistanceIndex][2];

//   return (
//     <MapContainer center={mapCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <TileLayer
//         url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//         attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//         minZoom={2}
//         maxZoom={19}
//         tileSize={256}
//       />
//       {trainCoordinates.map((coords, index) => (
//         <Marker key={index} position={[coords[0], coords[1]]} icon={stationIcon}>
//           <Popup>
//             <strong>Station Name: {coords[2]}</strong><br />
//             Coordinates: [{coords[0]}, {coords[1]}]
//           </Popup>
//         </Marker>
//       ))}
//       <Marker position={trainOnCoordinate} icon={trainOnIcon}>
//         <Popup>


//           <strong>Train Name: Dhaka Metro</strong><br />
//           Nearest station is <strong>{nearestStationName}</strong>, approximately {minDistance} km away.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;


// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import stationIconUrl from './station.png'; // Import the station icon PNG
// import trainOnIconUrl from './train-on.png'; // Import the train-on icon PNG

// // Create custom icons
// const stationIcon = new L.Icon({
//   iconUrl: stationIconUrl,
//   iconSize: [50, 50], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// const trainOnIcon = new L.Icon({
//   iconUrl: trainOnIconUrl,
//   iconSize: [50, 50], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// // Utility function to calculate distance between two coordinates in kilometers
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     0.5 - Math.cos(dLat) / 2 +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//     (1 - Math.cos(dLon)) / 2;

//   return R * 2 * Math.asin(Math.sqrt(a));
// };

// const Map = () => {
//   const mapCenter = [23.762273273678503, 90.38347198808196];

//   // Coordinates for train markers with station names
//   const trainCoordinates = [
//     [23.739293088941018, 90.39597289706727, 'Shahbag'],
//     [23.731888238103636, 90.39664911388664, 'Dhaka University'],
//     [23.730042344398733, 90.4080259308406, 'Bangladesh Secretariat'],
//     [23.728097726282265, 90.41913246827563, 'Motijheel'],
//     [23.75897616138037, 90.38706836970525, 'Farmgate'],
//     [23.766579582182807, 90.38308354075897, 'Bijoy Sarani'],
//     [23.77857028040535, 90.3800615218548, 'Agargaon'],
//     [23.79113680392692, 90.37540520699224, 'Shewrapara'],
//     [23.799441823638514, 90.37195052179118, 'Kazipara'],
//     [23.80847268459962, 90.36825980213871, 'Mirpur 10'],
//     [23.819269628752128, 90.36527718572084, 'Mirpur 11'],
//     [23.8261203148551, 90.36416138671343, 'Pallabi'],
//     [23.845946476444986, 90.36304854492941, 'Uttara South'],
//     [23.859550145335223, 90.36512135243414, 'Uttara Center'],
//     [23.869164580716, 90.36749449069714, 'Uttara North'],
//     [23.751267010083282, 90.39269289507901, 'Karwan Bazar']
//   ];

//   // Coordinate for the train-on marker
//   const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

//   // Calculate the distance to all stations
//   const distances = trainCoordinates.map(coords =>
//     calculateDistance(trainOnCoordinate[0], trainOnCoordinate[1], coords[0], coords[1])
//   );

//   // Find the nearest and second nearest stations
//   const sortedDistances = [...distances].sort((a, b) => a - b);
//   const minDistanceIndex = distances.indexOf(sortedDistances[0]);
//   const secondMinDistanceIndex = distances.indexOf(sortedDistances[1]);

//   const nearestStationName = trainCoordinates[minDistanceIndex][2];
//   const nearestStationDistance = sortedDistances[0].toFixed(2);

//   const secondNearestStationName = trainCoordinates[secondMinDistanceIndex][2];
//   const secondNearestStationDistance = sortedDistances[1].toFixed(2);

//   return (
//     <MapContainer center={mapCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <TileLayer
//         url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//         attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//         minZoom={2}
//         maxZoom={19}
//         tileSize={256}
//       />
//       {trainCoordinates.map((coords, index) => (
//         <Marker key={index} position={[coords[0], coords[1]]} icon={stationIcon}>
//           <Popup>
//             <strong>Station Name: {coords[2]}</strong><br />
//             Coordinates: [{coords[0]}, {coords[1]}]
//           </Popup>
//         </Marker>
//       ))}
//       <Marker position={trainOnCoordinate} icon={trainOnIcon}>
//         <Popup>
//           <strong>Train Name: Dhaka Metro</strong><br />
//           Nearest station is <strong>{nearestStationName}</strong>, approximately {nearestStationDistance} km away.<br />
//           Second nearest station is <strong>{secondNearestStationName}</strong>, approximately {secondNearestStationDistance} km away.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;


// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import stationIconUrl from './station.png'; // Import the station icon PNG
// import trainOnIconUrl from './train-on.png'; // Import the train-on icon PNG

// // Create custom icons
// const stationIcon = new L.Icon({
//   iconUrl: stationIconUrl,
//   iconSize: [50, 50], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// const trainOnIcon = new L.Icon({
//   iconUrl: trainOnIconUrl,
//   iconSize: [50, 50], // size of the icon
//   iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
// });

// // Utility function to calculate distance between two coordinates in kilometers
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     0.5 - Math.cos(dLat) / 2 +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//     (1 - Math.cos(dLon)) / 2;

//   return R * 2 * Math.asin(Math.sqrt(a));
// };

// const Map = () => {
//   const mapCenter = [23.762273273678503, 90.38347198808196];

//   // Coordinates for train markers with station names
//   const trainCoordinates = [
//     [23.739293088941018, 90.39597289706727, 'Shahbag'],
//     [23.731888238103636, 90.39664911388664, 'Dhaka University'],
//     [23.730042344398733, 90.4080259308406, 'Bangladesh Secretariat'],
//     [23.728097726282265, 90.41913246827563, 'Motijheel'],
//     [23.75897616138037, 90.38706836970525, 'Farmgate'],
//     [23.766579582182807, 90.38308354075897, 'Bijoy Sarani'],
//     [23.77857028040535, 90.3800615218548, 'Agargaon'],
//     [23.79113680392692, 90.37540520699224, 'Shewrapara'],
//     [23.799441823638514, 90.37195052179118, 'Kazipara'],
//     [23.80847268459962, 90.36825980213871, 'Mirpur 10'],
//     [23.819269628752128, 90.36527718572084, 'Mirpur 11'],
//     [23.8261203148551, 90.36416138671343, 'Pallabi'],
//     [23.845946476444986, 90.36304854492941, 'Uttara South'],
//     [23.859550145335223, 90.36512135243414, 'Uttara Center'],
//     [23.869164580716, 90.36749449069714, 'Uttara North'],
//     [23.751267010083282, 90.39269289507901, 'Karwan Bazar']
//   ];

//   // Coordinates for the railway line
//   const railwayLine = [
//     [23.728097726282265, 90.41913246827563],

    
//     [23.730042344398733, 90.4080259308406],
//     [23.731888238103636, 90.39664911388664],
//     [23.739293088941018, 90.39597289706727],
//     [23.751267010083282, 90.39269289507901],
//     [23.75897616138037, 90.38706836970525],
//     [23.766579582182807, 90.38308354075897],
//     [23.77857028040535, 90.3800615218548],
//     [23.79113680392692, 90.37540520699224],
//     [23.799441823638514, 90.37195052179118],
//     [23.80847268459962, 90.36825980213871],
//     [23.819269628752128, 90.36527718572084],
//     [23.8261203148551, 90.36416138671343],
//     [23.845946476444986, 90.36304854492941],
//     [23.859550145335223, 90.36512135243414],
//     [23.869164580716, 90.36749449069714]
//   ];

//   const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
//   const trainOnCoordinate = railwayLine[currentPositionIndex];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPositionIndex(prevIndex => (prevIndex + 1) % railwayLine.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Calculate the distance to all stations
//   const distances = trainCoordinates.map(coords =>
//     calculateDistance(trainOnCoordinate[0], trainOnCoordinate[1], coords[0], coords[1])
//   );

//   // Find the nearest and second nearest stations
//   const sortedDistances = [...distances].sort((a, b) => a - b);
//   const minDistanceIndex = distances.indexOf(sortedDistances[0]);
//   const secondMinDistanceIndex = distances.indexOf(sortedDistances[1]);

//   const nearestStationName = trainCoordinates[minDistanceIndex][2];
//   const nearestStationDistance = sortedDistances[0].toFixed(2);

//   const secondNearestStationName = trainCoordinates[secondMinDistanceIndex][2];
//   const secondNearestStationDistance = sortedDistances[1].toFixed(2);

//   return (
//     <MapContainer center={mapCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <TileLayer
//         url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//         attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//         minZoom={2}
//         maxZoom={19}
//         tileSize={256}
//       />
//       {trainCoordinates.map((coords, index) => (
//         <Marker key={index} position={[coords[0], coords[1]]} icon={stationIcon}>
//           <Popup>
//             <strong>Station Name: {coords[2]}</strong><br />
//             Coordinates: [{coords[0]}, {coords[1]}]
//           </Popup>
//         </Marker>
//       ))}
//       <Marker position={trainOnCoordinate} icon={trainOnIcon}>
//         <Popup>
//           <strong>Train Name: Dhaka Metro</strong><br />
//           Nearest station is <strong>{nearestStationName}</strong>, approximately {nearestStationDistance} km away.<br />
//           Second nearest station is <strong>{secondNearestStationName}</strong>, approximately {secondNearestStationDistance} km away.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;
