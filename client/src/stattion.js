import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import stationIconUrl from "./ASSETS/station.png";
import trainIconUrl from "./ASSETS/train-on.png";
import "./CSS/station.css";
import logo from "./ASSETS/logo2.png";
import Timeline from "./timeline";

const stationIcon = new L.Icon({
  iconUrl: stationIconUrl,
  iconSize: [40, 40],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const spstationIcon = new L.Icon({
  iconUrl: stationIconUrl,
  iconSize: [40, 40],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const trainIcon = new L.Icon({
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
  const [selectedTrainDuration, setSelectedTrainDuration] = useState("");
  const [selectedTrainOffDays, setSelectedTrainOffDays] = useState("");

  const mapCenter = [23.762273273678503, 90.38347198808196];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
      const results = allTrainData.filter((train) =>
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
      setSelectedTrainDuration(train.data.total_duration); // Set the selected train duration

      const offDays = weekDays.filter((day) => !train.data.days.includes(day));
      setSelectedTrainOffDays(offDays.join(", ")); // Set the selected train off days
    } else {
      setRoutes([]); // Clear routes if no match found
      setSelectedTrainName(""); // Clear the selected train name
      setSelectedTrainDuration(""); // Clear the selected train duration
      setSelectedTrainOffDays(""); // Clear the selected train off days
    }
    setSearchTerm(""); // Clear the search term after selecting a train
  };

  const trainOnCoordinate = [23.65300952543099, 90.47188046024007];

  const getMarkers = () => {
    if (selectedTrainName) {
      return (
        <>
          {routes.map((route, index) => {
            if (route.lat && route.lan) {
              return (
                <div>
                  <Marker
                    key={index}
                    position={[route.lat, route.lan]}
                    icon={stationIcon}
                  >
                    <Popup>
                      <div>
                        <strong>{route.city} </strong>
                        <br />
                        Latitude: {route.lat}
                        <br />
                        Longitude: {route.lan}
                        <br />
                        {route.arrival_time && (
                          <div>Arrival Time: {route.arrival_time}</div>
                        )}
                        {route.departure_time && (
                          <div>Departure Time: {route.departure_time}</div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                  <Marker position={trainOnCoordinate} icon={trainIcon}>
                    <Popup>
                      <div>
                        <strong>{selectedTrainName}</strong>
                        <br />
                        Latitude: {trainOnCoordinate[0]}
                        <br />
                        Longitude: {trainOnCoordinate[1]}
                      </div>
                    </Popup>
                  </Marker>
                </div>
              );
            }
            return null;
          })}
        </>
      );
    }
    return trainCoordinates.map((coords, index) => (
      <Marker
        key={index}
        position={[coords[0], coords[1]]}
        icon={spstationIcon}
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
    ));
  };

  return (
    <div className="station-container p-3">
      <div className="sidebar" style={{ marginRight: "20px" }}>
        <img
          src={logo}
          alt="Sidebar Description"
          className="p-3 center-image"
          style={{ width: "100%" }}
        />

        {selectedTrainName && (
          <div className="selected-train-info text-center ">
            <table className="table table-bordered shadow rounded">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <h5 style={{}}>
                      {" "}
                      <i className="fa-solid fa-train mx-1"></i>
                      {selectedTrainName}
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Duration: {selectedTrainDuration}</h6>
                  </td>
                  <td>
                    <h6>
                      Off Days:{" "}
                      {selectedTrainOffDays
                        ? selectedTrainOffDays
                        : "NO OFF DAY"}
                    </h6>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
          </div>
        )}
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
          {getMarkers()}
        </MapContainer>
      </div>
    </div>
  );
};

export default Station;
