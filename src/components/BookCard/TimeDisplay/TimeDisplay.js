import React from "react";
import "./timedisplay.css";

const TimeDisplay = ({ hours, minutes }) => {
  return (
    <div className="container">
      <h4>Time Spent Reading</h4>
      <div className="time">
        <div className="hour">
          {hours}
          <span className="time-label-hours">hours</span>
        </div>
        <div className="colon">:</div>
        <div className="minute">
          {minutes}
          <span className="time-label-minutes">minutes</span>
        </div>
        {/* {hours} : {minutes} */}
      </div>
      {/* <span className="time-label-hours">hours</span>
      <span className="time-label-minutes">minutes</span> */}
    </div>
  );
};

export default TimeDisplay;
