import React, { useState } from "react";
import "./switch.css";

const Switch = ({onToggle, msg, onLabel="ON",offLabel="OFF"}) => {

  // const [isToggled, setIsToggled] = useState(false);

  
  
  return (
    <label className="switch">
      <input type="checkbox" onChange={onToggle} />
      <div className="slider round">
        <span className="on">{onLabel}</span>
        <span className="off">{offLabel}</span>
      </div>
    </label>
  );
};

export default Switch;
