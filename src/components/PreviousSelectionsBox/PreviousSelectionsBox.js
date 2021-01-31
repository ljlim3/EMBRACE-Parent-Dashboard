import React from "react";
import "./previousselectionsbox.css";

const PreviousSelectionsBox = ({topLeftLabel, topRightLabel, prevLeftColSelection, prevRightColSelection, prevModalLeftColLabel}) => {
    return (
        <div>
            <div className="rectangle">
                {/* <div className="top">{topLeftLabel}</div>
                <div className="top">{topRightLabel}</div> */}
                <div className="content left">
                    <img src={prevLeftColSelection} alt="previous selection"></img>
                    <span className="img-label">{prevModalLeftColLabel}</span>
                </div>
                <div className="content right">{prevRightColSelection}</div>
            </div>
        </div>
    );
}

export default PreviousSelectionsBox;