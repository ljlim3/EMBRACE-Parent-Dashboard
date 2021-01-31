import React from "react";
import ReactDOM from "react-dom";
import Switch from "../../Switch/Switch";
import "./readingoptions.css";

const ReadingOptions = ({ open, onClose, handleBackClick }) => {
  if (!open) return null;

  const portalElement = document.getElementById("portal");
  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal-sm">
        <div className="reading-option-title">
          <h2>Reading Options</h2>
        </div>
        <h3 className="pm-title">Move the Pictures</h3>
        <h3 className="vocab-title">Show Vocabulary</h3>
        <div className="option-toggle-pm">
          <Switch className="pm-mode" />
        </div>
        <div className="option-toggle-vocab">
          <Switch className="vocab" />
        </div>
        <button
          className="button btn-back"
          onClick={() => {
            handleBackClick(true);
            onClose();
          }}
        >
          Back
        </button>
        <button className="button btn-read">Read</button>
      </div>
    </>,
    portalElement
  );
};

export default ReadingOptions;
