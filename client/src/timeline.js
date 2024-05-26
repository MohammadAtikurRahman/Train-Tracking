import React from "react";
import "./VerticalTimeline.css"; // Ensure you import the CSS for styling

const VerticalTimeline = ({ routes }) => {
  return (
    <div className="history-tl-container">
      <ul className="tl ">
        {routes.map((item, index) => (
          <li className="tl-item" key={index}>
            <div
              className="item-title"
              style={{
                transform: "translateY(-27%)",
                backgroundColor: "#adb5bd",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {item.city}
            </div>

            <div className="item-detail">
              {item.arrival_time && <p>Arrival: {item.arrival_time}</p>}
              {item.departure_time && <p>Departure: {item.departure_time}</p>}
              {item.halt && <p>Halt: {item.halt} min</p>}
              {item.duration && <p>Duration: {item.duration}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalTimeline;
