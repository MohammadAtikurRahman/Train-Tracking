import React, { useEffect, useState } from "react";
import "./CSS/timeline.css"; // Ensure you import the CSS for other styling

const Timeline = ({ routes }) => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  let circleTop = ((currentStopIndex + 1) / routes.length) * 50;
  // max =(route.length - 1) * 100
  // let circleTop = currentStopIndex ;
  circleTop = circleTop + 50;
  // setCurrentStopIndex(currentStopIndex + 20)

  // console.log(circleTop);

  const circleStyle = {
    position: "absolute",
    left: "-18px",
    top: `${circleTop}%`,
    transform: "translateY(-50%)",
    backgroundColor: "yellow",
    border: "10px solid #2732AE",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    zIndex: 1,
  };

  console.log(routes.length);

  return (
    <div className="history-tl-container">
      <ul className="tl">
        {routes.map((item, index) => (
          <li className="tl-item" key={index}>
            {index === currentStopIndex && (
              <div className="circle" style={circleStyle}></div>
            )}
            <div
              className="item-title text-center shadow btn btn-outline-danger"
              style={{
                transform: "translateY(-27%)",
                padding: "10px",
                borderRadius: "10px",
                width: "190px",
              }}
            >
                        <i className="fa-solid fa-location mx-1"></i>

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
