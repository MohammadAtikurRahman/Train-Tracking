import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import stationIconUrl from "./station.png"; // Import the station icon PNG
import trainOnIconUrl from "./train-on.png"; // Import the train-on icon PNG

// Create custom icons
const stationIcon = new L.Icon({
  iconUrl: stationIconUrl,
  iconSize: [50, 50], // size of the icon
  iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
});

const trainOnIcon = new L.Icon({
  iconUrl: trainOnIconUrl,
  iconSize: [50, 50], // size of the icon
  iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
});

// Utility function to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      (1 - Math.cos(dLon))) /
      2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

const Map = () => {
  const mapCenter = [23.762273273678503, 90.38347198808196];

  // Coordinates for train markers with station names
  const trainCoordinates = [
    [23.739293088941018, 90.39597289706727, "Shahbag"],
    [23.731888238103636, 90.39664911388664, "Dhaka University"],
    [23.730042344398733, 90.4080259308406, "Bangladesh Secretariat"],
    [23.728097726282265, 90.41913246827563, "Motijheel"],
    [23.75897616138037, 90.38706836970525, "Farmgate"],
    [23.766579582182807, 90.38308354075897, "Bijoy Sarani"],
    [23.77857028040535, 90.3800615218548, "Agargaon"],
    [23.79113680392692, 90.37540520699224, "Shewrapara"],
    [23.799441823638514, 90.37195052179118, "Kazipara"],
    [23.80847268459962, 90.36825980213871, "Mirpur 10"],
    [23.819269628752128, 90.36527718572084, "Mirpur 11"],
    [23.8261203148551, 90.36416138671343, "Pallabi"],
    [23.845946476444986, 90.36304854492941, "Uttara South"],
    [23.859550145335223, 90.36512135243414, "Uttara Center"],
    [23.869164580716, 90.36749449069714, "Uttara North"],
    [23.751267010083282, 90.39269289507901, "Karwan Bazar"],
  ];

  // Coordinates for the railway line
  const railwayLine = [
    [23.728097726282265, 90.41913246827563],
    [23.729197721342988, 90.41710596515625],
    [23.73026753313446, 90.41510974206446],
    [23.730042344398733, 90.4080259308406],
    [23.730025460289834, 90.40607495086773],

    [23.72970134271643, 90.40530247467053],
    [23.72835084415336, 90.40369314931354],

    [23.728176814459154, 90.40185725974115],

    [23.728262071715235, 90.4004424375751],
    [23.72868243295199, 90.39968984006299],
    [23.731888238103636, 90.39664911388664], //dhaka uni

    [23.732769996867674, 90.39582406042247], //d1

    [23.733862597117287, 90.3955319816391], //central libaray

    [23.739293088941018, 90.39597289706727], //shabag

    [23.74075309039789, 90.39610714215083], //unicef

    [23.74399859322987, 90.39534705215466], // new iskaton

    [23.74585047559883, 90.39472454520293], // bangla motor

    [23.751267010083282, 90.39269289507901], // karwon bazar

    [23.753980167200716, 90.39175295815414], //k2

    [23.75707588656904, 90.39054305154872], //k3

    [23.75824364620884, 90.39000718161275], //k4
    [23.758757457144007, 90.38951277777669], //k5

    [23.759049394261854, 90.38880785365251], //k6

    [23.75897616138037, 90.38706836970525], // framegate

    [23.758973490675466, 90.38537892393033], //f2

    [23.758961813196525, 90.38462934397927],
    [23.75921882093117, 90.3838950221573],
    [23.759709796579532, 90.38331030056906],
    [23.76003874921952, 90.3831520502434],
    [23.760701561732123, 90.38295893120196],
    [23.7610943379234, 90.38299648212725],

    [23.762432222922005, 90.3833263938255],

    [23.766579582182807, 90.38308354075897],

    [23.77072206807132, 90.38244175635184],

    [23.776698295476486, 90.38068686360172],

    [23.77857028040535, 90.3800615218548],  // agargoan

    [23.780905397221304, 90.3793819971852],
    [23.78344625414639, 90.37869921822028],
    [23.78682704414532, 90.37731090101187],
    



    [23.79113680392692, 90.37540520699224], // shawrapara



    [23.792299292956162, 90.37493971817415],


    [23.794145769757513, 90.37413555629242],
    [23.797777110801107, 90.37259079484254],

    [23.79888772983118, 90.37204457170725],




    [23.799441823638514, 90.37195052179118],// kazipara


[23.801011762332532, 90.37130110129424],

[23.80288587983677, 90.37040590221882],
[23.805815001822978, 90.36897965292114],


    [23.80847268459962, 90.36825980213871], // mirpur 10

[23.80886899242863, 90.36805410810763],

[23.811298251755584, 90.36740167491827],
[23.815150269922395, 90.36633957430966],
[23.817808442790948, 90.36561127679178],

    [23.819269628752128, 90.36527718572084], // mirpur 11



    [23.821028715073933, 90.36473125059224],

    [23.82271516200761, 90.36436710181609],

[23.824588966201716, 90.36423054601948],


    [23.8261203148551, 90.36416138671343],   // pallabi 


    [23.82789234772207, 90.36407881736515],

    [23.829432971654885, 90.36376777363535],

    [23.831598141982994, 90.36369190930418],
    [23.83454697756061, 90.36372984146668],

    [23.837113455668124, 90.36348625179288],
    [23.83740621758964, 90.36360957414848],


    [23.839689220531746, 90.3640951058359],

    [23.841000714691965, 90.36392061787446],
[23.842555060925683, 90.36340474046891],

[23.84369999161348, 90.36323783892861],

    [23.845946476444986, 90.36304854492941],  // uttara north

[23.848182471225023, 90.36329094395354],

[23.849972644244044, 90.36360957412117],

[23.85376800677301, 90.36420131587012],
[23.85777834220594, 90.3648234033286],


    [23.859550145335223, 90.36512135243414],  // center


    [23.862059134216025, 90.36549100940896],

    [23.86555581877403, 90.36605999184954],
[23.866325909285653, 90.36641655422842],


[23.867567757218485, 90.36717519747188],


    [23.869164580716, 90.36749449069714],     // south
  ];

  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const trainOnCoordinate = railwayLine[currentPositionIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPositionIndex(
        (prevIndex) => (prevIndex + 1) % railwayLine.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Determine the direction of the train based on the current position and the next position
  const nextPositionIndex = (currentPositionIndex + 1) % railwayLine.length;
  const currentCoordinate = railwayLine[currentPositionIndex];
  const nextCoordinate = railwayLine[nextPositionIndex];
  const directionLat = nextCoordinate[0] - currentCoordinate[0];
  const directionLon = nextCoordinate[1] - currentCoordinate[1];

  // Determine if the direction is north, south, east, or west
  const direction =
    Math.abs(directionLat) > Math.abs(directionLon)
      ? directionLat > 0
        ? "north"
        : "south"
      : directionLon > 0
      ? "east"
      : "west";

  // Calculate the distance to all stations in the direction of travel
  const distances = trainCoordinates.map((coords) =>
    calculateDistance(
      trainOnCoordinate[0],
      trainOnCoordinate[1],
      coords[0],
      coords[1]
    )
  );

  // Find the nearest and second nearest stations in the direction of travel
  const sortedDistances = distances
    .map((distance, index) => ({ distance, index }))
    .filter(({ index }) => {
      const stationCoordinate = trainCoordinates[index];
      const stationDirectionLat = stationCoordinate[0] - currentCoordinate[0];
      const stationDirectionLon = stationCoordinate[1] - currentCoordinate[1];
      const stationDirection =
        Math.abs(stationDirectionLat) > Math.abs(stationDirectionLon)
          ? stationDirectionLat > 0
            ? "north"
            : "south"
          : stationDirectionLon > 0
          ? "east"
          : "west";
      return stationDirection === direction;
    })
    .sort((a, b) => a.distance - b.distance);

  const nearestStation = sortedDistances[0]
    ? trainCoordinates[sortedDistances[0].index]
    : null;
  const secondNearestStation = sortedDistances[1]
    ? trainCoordinates[sortedDistances[1].index]
    : null;

  // Determine if the train is currently at a station
  const currentStation = trainCoordinates.find(
    (coords) =>
      coords[0] === trainOnCoordinate[0] && coords[1] === trainOnCoordinate[1]
  );

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
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
        <Marker
          key={index}
          position={[coords[0], coords[1]]}
          icon={stationIcon}
        >
          <Popup>
            <strong>Station Name: {coords[2]}</strong>
            <br />
            Coordinates: [{coords[0]}, {coords[1]}]
          </Popup>
        </Marker>
      ))}
      <Marker position={trainOnCoordinate} icon={trainOnIcon}>
        <Popup>
          Train Name: <strong>Dhaka Metro</strong>
          <br />
          {currentStation ? (
            <>
              Station: <strong>{currentStation[2]}</strong>.<br />
            </>
          ) : (
            <>
              Not at any station.
              <br />
            </>
          )}
          {nearestStation && (
            <>
              Next station: <strong>{nearestStation[2]}</strong>,{" "}
              {sortedDistances[0].distance.toFixed(2)} km away.
              <br />
            </>
          )}
          {secondNearestStation && (
            <>
              2nd next station: <strong>{secondNearestStation[2]}</strong>,{" "}
              {sortedDistances[1].distance.toFixed(2)} km away.
            </>
          )}
        </Popup>
      </Marker>
      <Polyline positions={railwayLine} color="blue" />
    </MapContainer>
  );
};

export default Map;

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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
//     }, 15000); // Update every 15 seconds

//     return () => clearInterval(interval);
//   }, []);

//   // Calculate the distance to all stations
//   const distances = trainCoordinates.map(coords =>
//     calculateDistance(trainOnCoordinate[0], trainOnCoordinate[1], coords[0], coords[1])
//   );

//   // Find the nearest and second nearest stations
//   const sortedDistances = distances
//     .map((distance, index) => ({ distance, index }))
//     .sort((a, b) => a.distance - b.distance);

//   const nearestStation = sortedDistances[0] ? trainCoordinates[sortedDistances[0].index] : null;
//   const secondNearestStation = sortedDistances[1] ? trainCoordinates[sortedDistances[1].index] : null;

//   // Determine if the train is currently at a station
//   const currentStation = trainCoordinates.find(
//     coords => coords[0] === trainOnCoordinate[0] && coords[1] === trainOnCoordinate[1]
//   );

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
//           Train Name: <strong>Dhaka Metro</strong><br />
//           {currentStation ? (
//             <>
//               Currently at station <strong>{currentStation[2]}</strong>.<br />
//             </>
//           ) : (
//             <>
//               Not at any station.<br />
//             </>
//           )}
//           {nearestStation && (
//             <>
//               Nearest station: <strong>{nearestStation[2]}</strong>, {sortedDistances[0].distance.toFixed(2)} km away.<br />
//             </>
//           )}
//           {secondNearestStation && (
//             <>
//               2nd nearest station: <strong>{secondNearestStation[2]}</strong>, {sortedDistances[1].distance.toFixed(2)} km away.
//             </>
//           )}
//         </Popup>
//       </Marker>
//       <Polyline positions={railwayLine} color="blue" />
//     </MapContainer>
//   );
// };

// export default Map;
