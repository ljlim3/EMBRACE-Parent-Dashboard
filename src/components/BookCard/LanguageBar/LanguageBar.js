import React, { useEffect, useState } from "react";
import "./languagebar.css";

const LanguageBar = ({data}) => {
  const result = [];

  for(let i = 0; i < data.length; i++) {
    if(data[i] === null) {
      result.push(<div className="bar-item empty-slot"></div>)
    } else if((data[i])[0] === "parent") {
      result.push(<div className={`bar-item reader-parent lang-${data[i][1]}`}>{(data[i])[1]}</div>)
    } else if ((data[i])[0] === "child") {
      result.push(<div className={`bar-item reader-child lang-${data[i][1]}`}>{(data[i])[1]}</div>)
    } 
  }

  return (
    <div className="bar-grid">
      {result}
    </div>
  );
};

export default LanguageBar;
