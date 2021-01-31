import React, { useState } from "react";
import "./bookcard.css";
import LanguageBar from "./LanguageBar/LanguageBar";
import Chart from "./QuestionStats/Chart";
import TimeDisplay from "./TimeDisplay/TimeDisplay";
import { getRecommendedOptions } from "../../utils";

const BookCard = ({ data, handleBookClick, loginStatus }) => {
  const [flip, setFlip] = useState(false);
  let hours = Math.floor(data.timeSpent / 60);
  let minutes = data.timeSpent % 60;

  const {
    parentCounter,
    childCounter,
    engCounter,
    spnCounter,
    numReqReadings,
    readingHistory
   } = getRecommendedOptions(data);

  let inProgress = false;

  if(data.childEnglishInProgress || data.childSpanishInProgress || 
    data.parentEnglishInProgress || data.parentSpanishInProgress) {
      inProgress = true;
  }

  return (
    <div className={`card ${flip ? "flip" : ""}`} onClick={() => { flip && setFlip(!flip) }}>
      {/* Front Side of the Card */}
      <figure className="front">
        {/* Star to Indicate Fulfillment of 4 Readings */}
        <div className="star-container">
          <img
            className={`${data.numReadings < 4 ? "grayscale" : "drop-shadow"}`}
            src="star-yellow.png"
            alt=""
          />
          {/* Number of Readings */}
          <div className="num-readings">{data.numReadings}</div>
        </div>
        <header>
          <h4>{data.title}</h4>
        </header>
        {/* Image of Book */}
        <div className="image-container">
          <img src={data.image} alt="" />
        </div>
        {/* Reader and Language Display */}
        <div className="lang-bar">
          <img
            className="parent-icon"
            src="parent-icon.png"
            alt="parent icon"
          />
          <LanguageBar data={readingHistory} />
          <img className="child-icon" src="child-icon.png" alt="child icon" />
        </div>
        <div className="button-area">
          <button onClick={() => {!flip && setFlip(!flip)}} className="button button-info">
            <img src="bar-graph.png" alt="information on my readings" />
          </button>
          <button
            className="button button-read"
            onClick={() => {
                !flip &&
                handleBookClick(
                  true, 
                  data.title, 
                  parentCounter, 
                  childCounter, 
                  engCounter, 
                  spnCounter,
                  numReqReadings
                );
              }
            }
          >
            <img src="book.png" alt="read book" />
          </button>
        </div>
      </figure>
      {/* Back Side of the Card */}
      <figure className={`back ${loginStatus !== "PAR" ? "bg-color" : ""}`}>
        {/* CAR Questions Chart */}
        {
          loginStatus === "PAR" &&
          <div className="chart">
            <Chart readingData={data}></Chart>
          </div>
        }
        {/* Time Spent Reading */}
        <div className={`${loginStatus === "PAR" ? "time-container" : "position-center"}`}>
          <TimeDisplay hours={hours} minutes={minutes} />
        </div>
      </figure>
    </div>
  );
};

export default BookCard;
