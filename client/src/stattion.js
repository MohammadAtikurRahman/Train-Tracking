import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import trainIconUrl from "./station.png"; // Import the train icon PNG
import trainOnIconUrl from "./train-on.png"; // Import the train-on icon PNG
import "./station.css"; // Import the CSS file for styling
import logo from "./logo.png";

// Create custom icons
const trainIcon = new L.Icon({
  iconUrl: trainIconUrl,
  iconSize: [40, 40], // size of the icon
  iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
});

const trainOnIcon = new L.Icon({
  iconUrl: trainOnIconUrl,
  iconSize: [30, 30], // size of the icon
  iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
});

const Station = () => {
  const [trainCoordinates, setTrainCoordinates] = useState([]);

  const mapCenter = [23.762273273678503, 90.38347198808196];

  useEffect(() => {
    // Fetch coordinates from the API
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get("http://localhost:4100/station");

        console.log("train", response);
        setTrainCoordinates(response.data);
      } catch (error) {
        console.error("Error fetching train coordinates:", error);
      }
    };

    fetchCoordinates();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const trainOnCoordinate = [23.780844737084603, 90.37937224155554];

  return (
    <div className="station-container p-3">
      <div className="sidebar " style={{ marginRight: "20px" }}>
        <img
          src={logo}
          alt="Sidebar Description"
          className="p-3 center-image "
          style={{ width: "100%" }}
        />

        <button className="btn btn-primary w-100 btn-default mb-3">
          <i class="fa-solid fa-train mx-1"></i>
          Live Train Tracking
        </button>

        <div class="input-group mb-3  ">
          <input
            type="text"
            className="form-control btn-default-input rounded mx-1 "
            placeholder="Train Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          ></input>
          <div class="input-group-append">
            <button class="btn btn-outline-primary btn-default " type="button">
              Find
            </button>
          </div>
        </div>
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
          <Marker position={trainOnCoordinate} icon={trainOnIcon}>
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
