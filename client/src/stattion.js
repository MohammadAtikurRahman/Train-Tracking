

// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import stationIconUrl from "./ASSETS/station.png";
// import trainIconUrl from "./ASSETS/train-on.png";
// import "./CSS/station.css";
// import logo from "./ASSETS/logo.png";
// import Timeline from "./timeline";
// const trainIcon = new L.Icon({
//   iconUrl: stationIconUrl,
//   iconSize: [40, 40],
//   iconAnchor: [12, 25],
//   popupAnchor: [0, -25],
// });

// const stationIcon = new L.Icon({
//   iconUrl: trainIconUrl,
//   iconSize: [30, 30],
//   iconAnchor: [12, 25],
//   popupAnchor: [0, -25],
// });

// const Station = () => {
//   const [trainCoordinates, setTrainCoordinates] = useState([]);
//   const [routes, setRoutes] = useState([]);

//   const mapCenter = [23.762273273678503, 90.38347198808196];

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       try {
//         const response = await axios.get("http://localhost:4100/station");
//         setTrainCoordinates(response.data);
//       } catch (error) {
//         console.error("Error fetching train coordinates:", error);
//       }
//     };

//     fetchCoordinates();
//   }, []);

//   useEffect(() => {
//     const trainData = {
//       data: {
//         days: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"],
//         routes: [
//           { city: "Chattogram", departure_time: "03:00 pm BST" },
//           {
//             city: "Feni",
//             arrival_time: "04:20 pm BST",
//             departure_time: "04:22 pm BST",
//             halt: "02",
//             duration: "01:20",
//           },
//           {
//             city: "Gunabati",
//             arrival_time: "04:36 pm BST",
//             departure_time: "04:38 pm BST",
//             halt: "02",
//             duration: "00:14",
//           },
//           {
//             city: "Laksam",
//             arrival_time: "05:04 pm BST",
//             departure_time: "05:06 pm BST",
//             halt: "02",
//             duration: "00:26",
//           },
//           {
//             city: "Cumilla",
//             arrival_time: "05:27 pm BST",
//             departure_time: "05:29 pm BST",
//             halt: "02",
//             duration: "00:21",
//           },
//           {
//             city: "Akhaura",
//             arrival_time: "06:20 pm BST",
//             departure_time: "06:23 pm BST",
//             halt: "03",
//             duration: "00:51",
//           },
//           {
//             city: "Brahmanbaria",
//             arrival_time: "06:41 pm BST",
//             departure_time: "06:45 pm BST",
//             halt: "04",
//             duration: "00:18",
//           },
//           {
//             city: "Bhairab_Bazar",
//             arrival_time: "07:04 pm BST",
//             departure_time: "07:07 pm BST",
//             halt: "03",
//             duration: "00:19",
//           },
//           { city: "Dhaka", arrival_time: "08:55 pm BST", duration: "01:48" },
//         ],
//         total_duration: "05:55",
//         train_name: "MAHANAGAR GODHULI (703)",
//       },
//       extra: { hash: "F58103F5D9107D0D1D58DA046A0F3BFB" },
//     };

//     setRoutes(trainData.data.routes);
//   }, []);

//   const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

//   return (
//     <div className="station-container p-3">
//       <div className="sidebar" style={{ marginRight: "20px" }}>
//         <img
//           src={logo}
//           alt="Sidebar Description"
//           className="p-3 center-image"
//           style={{ width: "100%" }}
//         />
//         <button className="btn btn-primary w-100 btn-default mb-3">
//           <i className="fa-solid fa-train mx-1"></i>
//           Live Train Tracking
//         </button>

//         <button className="btn btn-danger w-100 btn-default mb-3">
//           <i className="fa-solid fa-location mx-1"></i>
//           Share Your Location
//         </button>

//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control btn-default-input rounded mx-1"
//             placeholder="Train Name"
//             aria-label="Recipient's username"
//             aria-describedby="basic-addon2"
//           />
//           <div className="input-group-append">
//             <button
//               className="btn btn-outline-primary btn-default"
//               type="button"
//             >
//               Find
//             </button>
//           </div>
//         </div>
//         <br></br>
//         {/* <hr></hr> */}

//         <Timeline routes={routes} />
//       </div>
//       <div className="map-container map-border">
//         <MapContainer
//           center={mapCenter}
//           zoom={13}
//           style={{ height: "880px", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <TileLayer
//             url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//             attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//             minZoom={2}
//             maxZoom={19}
//             tileSize={256}
//           />
//           {trainCoordinates.map((coords, index) => (
//             <Marker
//               key={index}
//               position={[coords[0], coords[1]]}
//               icon={trainIcon}
//             >
//               <Popup>
//                 <div>
//                   <strong>{coords[2]}</strong>
//                   <br />
//                   Latitude: {coords[0]}
//                   <br />
//                   Longitude: {coords[1]}
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//           <Marker position={trainOnCoordinate} icon={stationIcon}>
//             <Popup>
//               <div>
//                 <strong>Train On</strong>
//                 <br />
//                 Latitude: {trainOnCoordinate[0]}
//                 <br />
//                 Longitude: {trainOnCoordinate[1]}
//               </div>
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Station;


// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import stationIconUrl from "./ASSETS/station.png";
// import trainIconUrl from "./ASSETS/train-on.png";
// import "./CSS/station.css";
// import logo from "./ASSETS/logo.png";
// import Timeline from "./timeline";

// const trainIcon = new L.Icon({
//   iconUrl: stationIconUrl,
//   iconSize: [40, 40],
//   iconAnchor: [12, 25],
//   popupAnchor: [0, -25],
// });

// const stationIcon = new L.Icon({
//   iconUrl: trainIconUrl,
//   iconSize: [30, 30],
//   iconAnchor: [12, 25],
//   popupAnchor: [0, -25],
// });

// const Station = () => {
//   const [trainCoordinates, setTrainCoordinates] = useState([]);
//   const [allTrainData, setAllTrainData] = useState([]);
//   const [routes, setRoutes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredTrains, setFilteredTrains] = useState([]);

//   const mapCenter = [23.762273273678503, 90.38347198808196];

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       try {
//         const response = await axios.get("http://localhost:4100/station");
//         setTrainCoordinates(response.data);
//       } catch (error) {
//         console.error("Error fetching train coordinates:", error);
//       }
//     };

//     fetchCoordinates();
//   }, []);

//   useEffect(() => {
//     const fetchTrainData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4100/train");
//         if (response.data) {
//           setAllTrainData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching train data:", error);
//       }
//     };

//     fetchTrainData();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const results = allTrainData.filter(train =>
//         train.data.train_name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredTrains(results);
//     } else {
//       setFilteredTrains([]);
//     }
//   }, [searchTerm, allTrainData]);

//   const handleSearch = (trainName) => {
//     const train = allTrainData.find(
//       (train) => train.data.train_name.toLowerCase() === trainName.toLowerCase()
//     );
//     if (train) {
//       setRoutes(train.data.routes);
//     } else {
//       setRoutes([]); // Clear routes if no match found
//     }
//     setSearchTerm(""); // Clear the search term after selecting a train
//   };

//   const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

//   return (
//     <div className="station-container p-3">
//       <div className="sidebar" style={{ marginRight: "20px" }}>
//         <img
//           src={logo}
//           alt="Sidebar Description"
//           className="p-3 center-image"
//           style={{ width: "100%" }}
//         />
//         <button className="btn btn-primary w-100 btn-default mb-3">
//           <i className="fa-solid fa-train mx-1"></i>
//           Live Train Tracking
//         </button>

//         <button className="btn btn-danger w-100 btn-default mb-3">
//           <i className="fa-solid fa-location mx-1"></i>
//           Share Your Location
//         </button>

//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control btn-default-input rounded mx-1"
//             placeholder="Train Name"
//             aria-label="Train Name"
//             aria-describedby="basic-addon2"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <div className="input-group-append">
//             <button
//               className="btn btn-outline-primary btn-default"
//               type="button"
//               onClick={() => handleSearch(searchTerm)}
//             >
//               Find
//             </button>
//           </div>
//         </div>

//         {searchTerm && filteredTrains.length > 0 && (
//           <ul className="list-group">
//             {filteredTrains.map((train, index) => (
//               <li
//                 key={index}
//                 className="list-group-item"
//                 onClick={() => handleSearch(train.data.train_name)}
//               >
//                 {train.data.train_name}
//               </li>
//             ))}
//           </ul>
//         )}

//         <br></br>
//         <Timeline routes={routes} />
//       </div>
//       <div className="map-container map-border">
//         <MapContainer
//           center={mapCenter}
//           zoom={13}
//           style={{ height: "880px", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <TileLayer
//             url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
//             attribution='Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>'
//             minZoom={2}
//             maxZoom={19}
//             tileSize={256}
//           />
//           {trainCoordinates.map((coords, index) => (
//             <Marker
//               key={index}
//               position={[coords[0], coords[1]]}
//               icon={trainIcon}
//             >
//               <Popup>
//                 <div>
//                   <strong>{coords[2]}</strong>
//                   <br />
//                   Latitude: {coords[0]}
//                   <br />
//                   Longitude: {coords[1]}
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//           <Marker position={trainOnCoordinate} icon={stationIcon}>
//             <Popup>
//               <div>
//                 <strong>Train On</strong>
//                 <br />
//                 Latitude: {trainOnCoordinate[0]}
//                 <br />
//                 Longitude: {trainOnCoordinate[1]}
//               </div>
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Station;


import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import stationIconUrl from "./ASSETS/station.png";
import trainIconUrl from "./ASSETS/train-on.png";
import "./CSS/station.css";
import logo from "./ASSETS/logo.png";
import Timeline from "./timeline";

const trainIcon = new L.Icon({
  iconUrl: stationIconUrl,
  iconSize: [40, 40],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const stationIcon = new L.Icon({
  iconUrl: trainIconUrl,
  iconSize: [30, 30],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const Station = () => {
  const [trainCoordinates, setTrainCoordinates] = useState([]);
  const [allTrainData, setAllTrainData] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [selectedTrainName, setSelectedTrainName] = useState("");

  const [selectDuration,setSelectDuration]=useState("");

  const mapCenter = [23.762273273678503, 90.38347198808196];

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get("http://localhost:4100/station");
        setTrainCoordinates(response.data);
      } catch (error) {
        console.error("Error fetching train coordinates:", error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await axios.get("http://localhost:4100/train");
        if (response.data) {
          setAllTrainData(response.data);
        }
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };

    fetchTrainData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = allTrainData.filter(train =>
        train.data.train_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTrains(results);
    } else {
      setFilteredTrains([]);
    }
  }, [searchTerm, allTrainData]);

  const handleSearch = (trainName) => {
    const train = allTrainData.find(
      (train) => train.data.train_name.toLowerCase() === trainName.toLowerCase()
    );
    if (train) {
      setRoutes(train.data.routes);
      setSelectedTrainName(train.data.train_name); // Set the selected train name


    } else {
      setRoutes([]); // Clear routes if no match found
      setSelectedTrainName(""); // Clear the selected train name
    }
    setSearchTerm(""); // Clear the search term after selecting a train
  };

  const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

  return (
    <div className="station-container p-3">
      <div className="sidebar" style={{ marginRight: "20px" }}>
        <img
          src={logo}
          alt="Sidebar Description"
          className="p-3 center-image"
          style={{ width: "100%" }}
        />
        <button className="btn btn-primary w-100 btn-default mb-3">
          <i className="fa-solid fa-train mx-1"></i>
          Live Train Tracking
        </button>

        <button className="btn btn-danger w-100 btn-default mb-3">
          <i className="fa-solid fa-location mx-1"></i>
          Share Your Location
        </button>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control btn-default-input rounded mx-1"
            placeholder="Train Name"
            aria-label="Train Name"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            {/* <button
              className="btn btn-outline-primary btn-default"
              type="button"
              onClick={() => handleSearch(searchTerm)}
            >
              Find
            </button> */}
          </div>
        </div>

        {searchTerm && filteredTrains.length > 0 && (
          <ul className="list-group">
            {filteredTrains.map((train, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => handleSearch(train.data.train_name)}
              >
                {train.data.train_name}
              </li>


            ))}
          </ul>
        )}

        <br></br>

        {selectedTrainName && (
          <div className="selected-train-name text-center">
            <h5>{selectedTrainName}</h5>
            <hr></hr>
          </div>
        )}

        <Timeline routes={routes} />
      </div>
      <div className="map-container map-border">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "880px", width: "100%" }}
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
              icon={trainIcon}
            >
              <Popup>
                <div>
                  <strong>{coords[2]}</strong>
                  <br />
                  Latitude: {coords[0]}
                  <br />
                  Longitude: {coords[1]}
                </div>
              </Popup>
            </Marker>
          ))}
          <Marker position={trainOnCoordinate} icon={stationIcon}>
            <Popup>
              <div>
                <strong>Train On</strong>
                <br />
                Latitude: {trainOnCoordinate[0]}
                <br />
                Longitude: {trainOnCoordinate[1]}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Station;
