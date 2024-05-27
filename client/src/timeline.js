import React, { useEffect, useState } from "react";
import "./CSS/timeline.css"; // Ensure you import the CSS for styling

const Timeline = ({ routes }) => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  useEffect(() => {
    const updateCurrentStopIndex = () => {
      const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
      const index = routes.findIndex((route) => {
        if (!route.departure_time) return false;
        const [time, period] = route.departure_time.split(" ");
        const [hours, minutes] = time.split(":");
        let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        if (period.toLowerCase() === "pm" && parseInt(hours) !== 12) totalMinutes += 12 * 60;
        return currentTime <= totalMinutes;
      });
      setCurrentStopIndex(index === -1 ? routes.length - 1 : index);
    };

    updateCurrentStopIndex();
    const interval = setInterval(updateCurrentStopIndex, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [routes]);

  return (
    <div className="history-tl-container">
      <ul className="tl">
        {routes.map((item, index) => (
          <li className="tl-item" key={index}>
            {index === currentStopIndex && (
              <div className="circle"></div>
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
