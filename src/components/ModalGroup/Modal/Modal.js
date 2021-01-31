import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import ModalMessage from "./ModalMessage/ModalMessage";
import PreviousSelectionsBox from "../../PreviousSelectionsBox/PreviousSelectionsBox";
import axios from 'axios';
import "./modal.css";

const readingLabels = {
  "English (EN)": "EN",
  "Spanish (ES)": "ES",
  "child-icon.png": "child",
  "parent-icon.png": "parent"
};

const Modal = (props) => {
  const {
          modalTitle = null,
          leftColTitle,
          leftColName,
          rightColTitle,
          rightColName,
          prevLeftColTitle,
          prevRightColTitle,
          upperLeftBtnImg,
          lowerLeftBtnImg,
          upperRightBtnImg = null,
          lowerRightBtnImg = null,
          upperLeftBtnLabel,
          lowerLeftBtnLabel,
          upperRightBtnLabel,
          lowerRightBtnLabel,
          upperLeftVal=true,
          lowerLeftVal=false,
          upperRightVal=true,
          lowerRightVal=false,
          upperLeftBtnColor,
          lowerLeftBtnColor,
          upperRightBtnColor,
          lowerRightBtnColor,
          rightSubmitBtnLabel,
          open, 
          handleNextClick,
          handleReadClick,
          handleBack,
          handleFourthValidReading,
          handleFirstModalLeftColSelection,
          handleFirstModalRightColSelection,
          prevModalLeftColSelection,
          prevModalRightColSelection,
          prevModalLeftColLabel,
          reset, setReset,
          parentRecommended=false,
          childRecommended=false,
          engRecommended=false,
          spnRecommended=false,
          numReqReadings=0,
          clickedBook,
          loginStatus
   } = props;

  const recommendedReaderMsg = `${childRecommended ? "Your child hasn't read yet!\n\nYour child" : "You haven't read yet!\n\nYou"} should read at least once.`;
  const recommendedLangMsg = `You haven't read in ${engRecommended ? "English" : "Spanish"} yet!\n\nYou should read at least once in ${engRecommended ? "English" : "Spanish"}.`;

  const upperLeftImgLabel = upperLeftBtnLabel.toLowerCase();
  const lowerLeftImgLabel = lowerLeftBtnLabel.toLowerCase();

  const [upperLeftClicked, setUpperLeftClicked] = useState(false);
  const [lowerLeftClicked, setLowerLeftClicked] = useState(false);
  const [upperRightClicked, setUpperRightClicked] = useState(false);
  const [lowerRightClicked, setLowerRightClicked] = useState(false);
  const [recommendedLangClicked, setRecommendedLangClicked] = useState(false);
  const [recommendedReaderClicked, setRecommendedReaderClicked] = useState(false);
  const [leftColSelection, setLeftColSelection] = useState("");
  const [rightColSelection, setRightColSelection] = useState("");

  const [bookData, setBookData] = useState({});

  const handleUpperLeftClick = () => {
    setLowerLeftClicked(false);
    setUpperLeftClicked(true);
  };

  const handleLowerLeftClick = () => {
    setUpperLeftClicked(false);
    setLowerLeftClicked(true);
  };

  const handleUpperRightClick = () => {
    setLowerRightClicked(false);
    setUpperRightClicked(true);
  };

  const handleLowerRightClick = () => {
    setUpperRightClicked(false);
    setLowerRightClicked(true);
  };

  useEffect(() => {
    setBookData({
      "title": clickedBook,
      "reader": readingLabels[prevModalLeftColSelection],
      "language": readingLabels[prevModalRightColSelection],
      "PM": leftColSelection,
      "showVocab": rightColSelection
    });
  }, [
        clickedBook, 
        prevModalLeftColSelection, 
        prevModalRightColSelection, 
        leftColSelection,
        rightColSelection
  ])

  const consoleLog = () => {
    console.log(bookData);
  }

  const postBookDetails = async () => {
    const response = await axios
      .post("http://localhost:5000/loadBook", bookData)
      .then((response) => console.log(response))
      .catch((err) => console.log("Error: ", err))
  }

  useEffect(() => {
    if (reset) {
      setUpperLeftClicked(false);
      setLowerLeftClicked(false);
      setUpperRightClicked(false);
      setLowerRightClicked(false);
      setReset(false);
    }
  })

  if (!open) return null;

  let completedThreeReadings = false;

  if(numReqReadings === 3) {
    completedThreeReadings = true;
  }

  // const portalElement = document.getElementById("portal");
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <h2 className="modal-header">{modalTitle}</h2>
        <div className="modal-content">
          <div className="column">
            <h3 className="modal-subheader">{leftColTitle}</h3>
            <div className="button-area">
              <div className="btn-row">
                {
                  parentRecommended &&
                  <button
                    className={`recommended ${recommendedReaderClicked ? "tooltip" : ""}`}
                    tooltip-text={recommendedReaderMsg}
                    onClick={()=> setRecommendedReaderClicked(!recommendedReaderClicked)}
                  >
                    <img src="attention.png" alt="recommended option"></img>
                  </button>
                }
                <button 
                  className={`button left-col top ${upperLeftBtnColor}-outline
                          ${upperLeftClicked ? `btn-upper-left-clicked ${upperLeftBtnColor}` : ""}`}
                  onClick={() => {
                      if(modalTitle !== null) setLeftColSelection(upperLeftVal);
                      handleUpperLeftClick();
                      if(modalTitle === null) handleFirstModalLeftColSelection(upperLeftBtnLabel);
                    }}
                >
                  {/* { 
                    upperLeftBtnImg !== null &&
                    <img
                      className={`img-upper-left ${upperLeftImgLabel}-icon`}
                      src={upperLeftBtnImg}
                      alt={`${upperLeftBtnLabel} icon`}
                    ></img>
                  }  */}
                  {upperLeftBtnLabel}
                </button>
              </div>
              <div className="btn-row">
                {
                  childRecommended &&
                  <button
                    className={`recommended ${recommendedReaderClicked ? "tooltip" : ""}`}
                    tooltip-text={recommendedReaderMsg}
                    onClick={()=> setRecommendedReaderClicked(!recommendedReaderClicked)}
                  >
                    <img src="attention.png" alt="recommended option"></img>
                  </button>
                }
                <button 
                  className={`button left-col bottom ${lowerLeftBtnColor}-outline 
                        ${lowerLeftClicked ? `btn-lower-left-clicked ${lowerLeftBtnColor}` : "btn-lower-left"}`}
                  onClick={() => {
                    if(modalTitle !== null) setLeftColSelection(lowerLeftVal);
                    handleLowerLeftClick(); 
                    if(modalTitle === null) handleFirstModalLeftColSelection(lowerLeftBtnLabel);
                  }}
                >
                  {/* {
                    lowerLeftBtnImg !== null &&
                    <img
                      className={`img-lower-left ${lowerLeftImgLabel}-icon`}
                      src={lowerLeftBtnImg}
                      alt={`${lowerLeftBtnLabel} icon`}
                    ></img>
                  } */}
                  {lowerLeftBtnLabel}
                </button>
              </div>
            </div>
          </div>
          <div className="column">
            <h3 className="modal-subheader">{rightColTitle}</h3>
            <div className="button-area">
              <div className="btn-row">
                {
                  engRecommended &&
                  <button
                    className={`recommended ${recommendedReaderClicked ? "tooltip" : ""}`}
                    tooltip-text={recommendedReaderMsg}
                    onClick={()=> setRecommendedReaderClicked(!recommendedReaderClicked)}
                  >
                    <img src="attention.png" alt="recommended option"></img>
                  </button>
                }
                <button 
                  className={`button right-col top ${upperRightBtnColor}-outline ${
                                upperRightClicked ? `btn-upper-right-clicked ${upperRightBtnColor}` : "btn-upper-right"}`}
                  onClick={() => {
                    if(modalTitle !== null) setRightColSelection(upperRightVal);
                    handleUpperRightClick();
                    if(modalTitle === null) handleFirstModalRightColSelection(upperRightBtnLabel);
                  }}
                >
                  { 
                    upperRightBtnImg !== null &&
                    <img
                      className="img-upper-right"
                      src={upperRightBtnImg}
                      alt={`${upperRightBtnLabel} icon`}
                    ></img> 
                  }
                  {upperRightBtnLabel}
                </button>
              </div>
              <div className="btn-row">
                {
                  spnRecommended &&
                  <button
                    className={`recommended ${recommendedReaderClicked ? "tooltip" : ""}`}
                    tooltip-text={recommendedReaderMsg}
                    onClick={()=> setRecommendedReaderClicked(!recommendedReaderClicked)}
                  >
                    <img src="attention.png" alt="recommended option"></img>
                  </button>
                }
                <button 
                  className={`button right-col bottom ${lowerRightBtnColor}-outline ${
                                lowerRightClicked ? `btn-lower-right-clicked ${lowerRightBtnColor}` : "btn-lower-right"}`}
                  onClick={() => {
                    if(modalTitle !== null) setRightColSelection(lowerRightVal);
                    handleLowerRightClick(); 
                    if(modalTitle === null) handleFirstModalRightColSelection(lowerRightBtnLabel);
                  }}
                >
                  {
                    lowerRightBtnImg !== null &&
                    <img
                      className="img-lower-right"
                      src={lowerRightBtnImg}
                      alt={`${lowerRightBtnLabel} icon`}
                    ></img>
                  } 
                  {lowerRightBtnLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="submission-btn-area">
          <button 
            className="btn-submit left btn-back"
            onClick={() => {
              handleBack();
            }}
          >
            Back
          </button>
          <button 
            className={`btn-submit right ${(upperLeftClicked || lowerLeftClicked)
                        && (upperRightClicked || lowerRightClicked) ? "" : "tooltip"}`}
            tooltip-text={`${ (rightSubmitBtnLabel === "Next") ? "Please select the reader and language." : 
              "Please select either Yes or No for both options."}`}
            disabled={`${ (upperLeftClicked || lowerLeftClicked)
              && (upperRightClicked || lowerRightClicked) ? "" : "true"}`}
            type="submit"
            onClick={() => {
              if(rightSubmitBtnLabel === "Next") {
                handleNextClick();
                if(completedThreeReadings) {
                  if( (parentRecommended || childRecommended) && (engRecommended || spnRecommended) ) {
                    if( ((parentRecommended && upperLeftClicked) || (childRecommended && lowerLeftClicked))
                        && ((engRecommended && upperRightClicked) || (spnRecommended && lowerRightClicked))
                      ) {
                        handleFourthValidReading(true);
                    }
                  } else if(parentRecommended || childRecommended) {
                    if((parentRecommended && upperLeftClicked) || (childRecommended && lowerLeftClicked)) {
                      handleFourthValidReading(true);
                    }
                  } else if(engRecommended || spnRecommended) {
                    if((engRecommended && upperRightClicked) || (spnRecommended && lowerRightClicked)) {
                      handleFourthValidReading(true);
                    }
                  } else {
                    handleFourthValidReading(true);
                  }
                }
              } 
              if(rightSubmitBtnLabel === "Read") {
                if(lowerLeftClicked) handleReadClick();
                postBookDetails();
                consoleLog();
              }
            }}
          >
            {rightSubmitBtnLabel}
          </button>
        </div>
      </div>
    </>
    // <>
    //   <div className="overlay"></div>
    //   <div className={`${modalTitle !== null ? ".modal-with-header" : "modal"}`}>
    //     {
    //       modalTitle !== null &&
    //       <div className="prev-selections-box">
    //         <PreviousSelectionsBox 
    //           topLeftLabel={prevLeftColTitle} 
    //           topRightLabel={prevRightColTitle}
    //           prevLeftColSelection={prevModalLeftColSelection}
    //           prevRightColSelection={prevModalRightColSelection}
    //           prevModalLeftColLabel={prevModalLeftColLabel}
    //         ></PreviousSelectionsBox>
    //       </div>
    //     }
    //     <div className="modal-content">
    //       <div className="column">
    //         <div className="modal-title">
    //           <h2>{modalTitle}</h2>
    //         </div>
    //         <div className="modal-subheader">
    //           <h2 className={`option left-col ${parentRecommended || childRecommended ? "margin-left" : ""}`}>{leftColTitle}</h2>
    //         </div>
    //         <div className="button-area">
    //           {modalTitle === null &&
    //             <div className="recommendedBtns">
    //               {
    //                 (parentRecommended || childRecommended) &&
    //                 <button 
    //                   className={`${parentRecommended ? "upper-left" : "lower-left"} recommended 
    //                           ${recommendedReaderClicked ? "tooltip" : ""}`}
    //                   tooltip-text={recommendedReaderMsg}
    //                   onClick={()=> setRecommendedReaderClicked(!recommendedReaderClicked)}
                    
    //                 ><img src="attention.png" alt="recommended option"></img></button>
    //               }
    //               {
    //                 (engRecommended || spnRecommended) &&
    //                 <button 
    //                   className={`${engRecommended ? "upper-right" : "lower-right"} recommended 
    //                             ${recommendedLangClicked ? "tooltip" : ""}`}
    //                   tooltip-text={recommendedLangMsg}
    //                   onClick={()=> setRecommendedLangClicked(!recommendedLangClicked)}
    //                 ><img src="attention.png" alt="recommended option"></img></button>
    //               }
    //             </div>
    //           }
    //           {
    //             loginStatus !== "DS" &&
    //             (
    //             <>
    //             <button
    //               className={`button btn-left-col ${upperLeftBtnColor}-outline ${
    //                 upperLeftClicked ? `btn-upper-left-clicked ${upperLeftBtnColor}` : "btn-upper-left"
    //               } ${upperLeftBtnImg !== null ? "pad-left" : ""} 
    //               ${parentRecommended || childRecommended ? "margin-left" : ""}`}
    //               name={leftColName}
    //               value={upperLeftVal}
    //               onClick={() => {
    //                 if(modalTitle !== null) setLeftColSelection(upperLeftVal);
    //                 handleUpperLeftClick();
    //                 if(modalTitle === null) handleFirstModalLeftColSelection(upperLeftBtnLabel);
    //               }}
    //             >
    //               { 
    //                 upperLeftBtnImg !== null &&
    //                 <img
    //                   className={`img-upper-left ${upperLeftImgLabel}-icon`}
    //                   src={upperLeftBtnImg}
    //                   alt={`${upperLeftBtnLabel} icon`}
    //                 ></img>
    //               } 
    //               {upperLeftBtnLabel}
    //             </button>
    //             <button
    //               className={`button btn-left-col btn-bottom ${lowerLeftBtnColor}-outline ${
    //                 lowerLeftClicked ? `btn-lower-left-clicked ${lowerLeftBtnColor}` : "btn-lower-left"
    //               } ${lowerLeftBtnImg ? "pad-left" : ""} 
    //               ${childRecommended || parentRecommended ? "margin-left" : ""}`}
    //               name={leftColName}
    //               value={lowerLeftVal}
    //               onClick={() => {
    //                 if(modalTitle !== null) setLeftColSelection(lowerLeftVal);
    //                 handleLowerLeftClick(); 
    //                 if(modalTitle === null) handleFirstModalLeftColSelection(lowerLeftBtnLabel);
    //               }}
    //             >
    //               {
    //                 lowerLeftBtnImg !== null &&
    //                 <img
    //                   className={`img-lower-left ${lowerLeftImgLabel}-icon`}
    //                   src={lowerLeftBtnImg}
    //                   alt={`${lowerLeftBtnLabel} icon`}
    //                 ></img>
    //               }
    //               {lowerLeftBtnLabel}
    //             </button>
    //             </>
    //             )
    //           }
    //         </div>
    //         <div className="column">
    //           <div className="modal-subheader">
    //             <h2 className={`option right-col ${engRecommended || spnRecommended ? "margin-left" : ""}`}>{rightColTitle}</h2>
    //           </div>
    //           <div className="button-area">
    //             <button
    //               className={`button btn-right-col ${upperRightBtnColor}-outline ${
    //                 upperRightClicked ? `btn-upper-right-clicked ${upperRightBtnColor}` : "btn-upper-right"
    //               } ${upperRightBtnImg ? "pad-left" : ""} ${lowerLeftBtnImg} ${engRecommended || spnRecommended ? "margin-left" : ""}`}
    //               name={rightColName}
    //               value={upperRightVal}
    //               onClick={() => {
    //                 if(modalTitle !== null) setRightColSelection(upperRightVal);
    //                 handleUpperRightClick();
    //                 if(modalTitle === null) handleFirstModalRightColSelection(upperRightBtnLabel);
    //               }}
    //             >
    //               { 
    //                 upperRightBtnImg !== null &&
    //                 <img
    //                   className="img-upper-right"
    //                   src={upperRightBtnImg}
    //                   alt={`${upperRightBtnLabel} icon`}
    //                 ></img> 
    //               }
    //               {upperRightBtnLabel}
    //             </button>
    //             <button
    //               className={`button btn-right-col btn-bottom ${lowerRightBtnColor}-outline ${
    //                 lowerRightClicked ? `btn-lower-right-clicked ${lowerRightBtnColor}` : "btn-lower-right"
    //               } ${lowerRightBtnImg ? "pad-left" : ""} ${engRecommended || spnRecommended ? "margin-left" : ""}`}
    //               name={rightColName}
    //               value={lowerRightVal}
    //               onClick={() => {
    //                 if(modalTitle !== null) setRightColSelection(lowerRightVal);
    //                 handleLowerRightClick(); 
    //                 if(modalTitle === null) handleFirstModalRightColSelection(lowerRightBtnLabel);
    //               }}
    //             >
    //               {
    //                 lowerRightBtnImg !== null &&
    //                 <img
    //                   className="img-lower-right"
    //                   src={lowerRightBtnImg}
    //                   alt={`${lowerRightBtnLabel} icon`}
    //                 ></img>
    //               } 
    //               {lowerRightBtnLabel}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="submission-btn-area">
    //       <button
    //         className="button btn-submit left"
    //         onClick={() => {
    //           handleBack();
    //         }}
    //       >
    //         Back
    //       </button>
    //       {/* <div className="v-line"></div> */}
    //       <button
    //         className={`button btn-submit right ${(upperLeftClicked || lowerLeftClicked)
    //           && (upperRightClicked || lowerRightClicked) ? "" : "tooltip"}`}
    //         tooltip-text={`${ (rightSubmitBtnLabel === "Next") ? "Please select the reader and language." : 
    //           "Please select either Yes or No for both options."}`}
    //         disabled={`${ (upperLeftClicked || lowerLeftClicked)
    //           && (upperRightClicked || lowerRightClicked) ? "" : "true"}`}
    //         type="submit"
    //         onClick={() => {
    //           if(rightSubmitBtnLabel === "Next") {
    //             handleNextClick();
    //             if(completedThreeReadings) {
    //               if( (parentRecommended || childRecommended) && (engRecommended || spnRecommended) ) {
    //                 if( ((parentRecommended && upperLeftClicked) || (childRecommended && lowerLeftClicked))
    //                     && ((engRecommended && upperRightClicked) || (spnRecommended && lowerRightClicked))
    //                   ) {
    //                     handleFourthValidReading(true);
    //                 }
    //               } else if(parentRecommended || childRecommended) {
    //                 if((parentRecommended && upperLeftClicked) || (childRecommended && lowerLeftClicked)) {
    //                   handleFourthValidReading(true);
    //                 }
    //               } else if(engRecommended || spnRecommended) {
    //                 if((engRecommended && upperRightClicked) || (spnRecommended && lowerRightClicked)) {
    //                   handleFourthValidReading(true);
    //                 }
    //               } else {
    //                 handleFourthValidReading(true);
    //               }
    //             }
    //           } 
    //           if(rightSubmitBtnLabel === "Read") {
    //             if(lowerLeftClicked) handleReadClick();
    //             postBookDetails();
    //             consoleLog();
    //           }
    //         }}
    //       >
    //         {rightSubmitBtnLabel}
    //       </button>
    //     </div>
    //   </div>
    // </>
  );
};

export default Modal;
