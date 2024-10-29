// components/HoursPopover.jsx
import React, { useState } from 'react';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const HoursPopover = ({ hours }) => {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => setShowPopover(!showPopover);

  const popoverStyles = {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    zIndex: 1000,
    width: "max-content",
  };

  return (
    <div className="relative inline-block">
      <button onClick={togglePopover} className="text-blue-500 underline hover:text-blue-700">
        Hours
      </button>

      {showPopover && (
        <div style={popoverStyles} className="popover">
          <h4 className="font-semibold mb-2">Operating Hours</h4>
          <ul>
            {daysOfWeek.map((day, dayIndex) => {
              // Adjust to start with Monday as day 0
              const dayHours = hours[0].open.filter(openTime => openTime.day === dayIndex);

              return (
                <li key={dayIndex} className="mb-1">
                  <span className="font-medium">{day}:</span>{" "}
                  {dayHours.length > 0 ? (
                    dayHours.map((timeSlot, index) => (
                      <span key={index}>
                        {`${timeSlot.start.slice(0, 2)}:${timeSlot.start.slice(2)} - ${timeSlot.end.slice(0, 2)}:${timeSlot.end.slice(2)}`}
                        {index < dayHours.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    "Closed"
                  )}
                </li>
              );
            })}
          </ul>
          <button onClick={togglePopover} className="mt-2 text-gray-500 text-sm underline">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default HoursPopover;
