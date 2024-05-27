import React from "react";
import "./CSS/timeline.css"; // Ensure you import the CSS for styling

const Timeline = ({ routes }) => {
  return (
    <div className="history-tl-container">
      <ul className="tl ">
        {routes.map((item, index) => (
          <li className="tl-item" key={index}>
            <div
              className="item-title text-center shadow btn btn-outline-danger"
              style={{
                transform: "translateY(-27%)",
                //backgroundColor: "#FFC300",
                padding: "10px",
                borderRadius: "10px",
                width: "190px",
              }}
            >
              {item.city}
            </div>

            <div className="item-detail" style={{ height: "120px" }}>
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

export default Timeline;
