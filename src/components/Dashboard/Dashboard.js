import React, { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import Data from "../../data/data.json";
import ModalGroup from "../ModalGroup/ModalGroup";
import ModalMessage from "../ModalGroup/Modal/ModalMessage/ModalMessage";
import axios from "axios";
import { getRecommendedOptions } from "../../utils";

import "./dashboard.css";

const firstModalContent = {
  leftColTitle: "Reader",
  leftColName: "reader",
  rightColTitle: "Language",
  rightColName: "language",
  upperLeftBtnImg: "parent-icon.png",
  lowerLeftBtnImg: "child-icon.png",
  upperLeftBtnLabel: "Parent",
  lowerLeftBtnLabel: "Child",
  upperRightBtnLabel: "English (EN)",
  lowerRightBtnLabel: "Spanish (ES)",
  upperLeftVal: "parent",
  lowerLeftVal: "child",
  upperRightVal: "EN",
  lowerRightVal: "ES",
  upperLeftBtnColor: "green",
  lowerLeftBtnColor: "orange",
  upperRightBtnColor: "blue",
  lowerRightBtnColor: "yellow",
  rightSubmitBtnLabel: "Next",
  parentRecommended: "",
  childRecommended: "",
  engRecommended: "",
  spnRecommended: "",
  numReqReadings: ""
}

const secondModalContent = {
  modalTitle: "Reading Options",
  leftColTitle: "Move the Pictures",
  leftColName: "pmMode",
  rightColTitle: "Show Vocabulary",
  rightColName: "showVacabulary",
  prevLeftColTitle: "Reader",
  prevRightColTitle: "Language",
  upperLeftBtnImg: "checkmark.png",
  lowerLeftBtnImg: "x.png",
  upperRightBtnImg: "checkmark.png",
  lowerRightBtnImg: "x.png",
  upperLeftBtnLabel: "Yes",
  lowerLeftBtnLabel: "No",
  upperRightBtnLabel: "Yes",
  lowerRightBtnLabel: "No",
  upperLeftVal: true,
  lowerLeftVal: false,
  upperRightVal: true,
  lowerRightVal: false,
  upperLeftBtnColor: "bright-green",
  lowerLeftBtnColor: "red",
  upperRightBtnColor: "bright-green",
  lowerRightBtnColor: "red",
  rightSubmitBtnLabel: "Read"
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [inProgress, setInProgress] = useState(Data[1].bookInProgress.title !== null ? true : false);

  const [parentRecommended, setParentRecommended] = useState(false);
  const [childRecommended, setChildRecommended] = useState(false);
  const [engRecommended, setEngRecommended] = useState(false);
  const [spnRecommended, setSpnRecommended] = useState(false);
  const [numReqReadings, setNumReqReadings] = useState(0);
  const [bookTitle, setBookTitle] = useState("");
  const [continuedBookTitle, setContinuedBookTitle] = useState({})

  const handleBookClick = (isOpen, title, parentCounter, childCounter, engCounter, spnCounter, numReqReadings) => {
    setIsOpen(isOpen);
    setNumReqReadings(numReqReadings);
    setBookTitle(title);
    setRecommendation(parentCounter, childCounter, engCounter, spnCounter);
  };

  const setRecommendation = (parentCounter, childCounter, engCounter, spnCounter) => {
    if(parentCounter === 3 && childCounter === 0) {
      setChildRecommended(true);
    } else if(childCounter === 3 && parentCounter === 0) {
      setParentRecommended(true);
    } 
    if(engCounter === 0 && spnCounter === 3) {
      setEngRecommended(true);
    } else if(spnCounter === 0 && engCounter === 3) {
      setSpnRecommended(true);
    }  
  }

  const resetRecommendation = () => {
    setChildRecommended(false);
    setParentRecommended(false);
    setEngRecommended(false);
    setSpnRecommended(false);
  }

  useEffect(() => {
    setContinuedBookTitle({
      "title": Data[1].bookInProgress.title
    })
  }, Data[1].bookInProgress.title);
  
  firstModalContent.parentRecommended = parentRecommended;
  firstModalContent.childRecommended = childRecommended;
  firstModalContent.engRecommended = engRecommended;
  firstModalContent.spnRecommended = spnRecommended; 
  firstModalContent.numReqReadings = numReqReadings; 
 
  let inProgressMsgHeader="Welcome Back!";
  let inProgressMsg=`${Data[1].bookInProgress.reader === "child" ? "Your child was" : "You (the parent) were"} reading \"${Data[1].bookInProgress.title}\" in ${Data[1].bookInProgress.language === "EN" ? "English" : "Spanish"}. Do you want to continue?`
  let contReading="Yes, continue reading";
  let startOver="No, start this book over";
  let readNewBook="No, start a new book";

  const engMessage = [
    inProgressMsgHeader,
    inProgressMsg,
    readNewBook,
    startOver,
    contReading,
  ]

  const spnMessage = [
    inProgressMsgHeader="¡Bienvenido de vuelta!",
    inProgressMsg=`${Data[1].bookInProgress.reader === "child" ? "Su hijo" : "Usted (El padre)"} estaba leyendo \"${Data[1].bookInProgress.title}\" en ${Data[1].bookInProgress.language === "EN" ? "ingles" : "español"}. ¿Quiere continuar?`,
    readNewBook="No, empezar un libro nuevo",
    startOver="No, empezar un libro nuevo",
    contReading="Sí, continuar leyendo"
  ]

  const postContinueBook = async () => {
    const response = await axios
      .post("http://localhost:5000/continueBook", continuedBookTitle)
      .then((response) => console.log(response))
      .catch((error) => console.log("Error: ", error))
  }

  const loginStatus = Data[0].loginStatus;

  return (
    <div className="App">
      <div className="title">Books</div>
      <div className="card-grid">
        {Data.map((data, key) => {
          if(key > 1) {
            return (
              <BookCard 
                handleBookClick={handleBookClick} 
                loginStatus={loginStatus}
                data={data}
                key={data.id}
              ></BookCard>
            );
          }
        })}
    
        <ModalMessage 
          open={inProgress} 
          inProgress={inProgress}
          onClose={() => {setInProgress(false); resetRecommendation()}} 
          spnMsg={spnMessage}
          engMsg={engMessage}
          onStartOver={() => {
            let data = null;
            for (let key in Data) {
              if (key > 1 && Data[key].title === Data[1].bookInProgress.title) {
                data = Data[key];
                break;
              }
            }

            const {
              parentCounter,
              childCounter,
              engCounter,
              spnCounter,
              numReqReadings
            } = getRecommendedOptions(data);

            handleBookClick(
              true, 
              Data[1].bookInProgress.title, 
              parentCounter, 
              childCounter, 
              engCounter, 
              spnCounter,
              numReqReadings
            );
          }}
          onContinue={postContinueBook}
        ></ModalMessage>
              
        <ModalGroup
          clickedBook={bookTitle}
          firstModalContent={firstModalContent}
          secondModalContent={secondModalContent}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          firstModalOpen={() => setIsOpen(true)}
          resetRecommendation={resetRecommendation}
          loginStatus={loginStatus}
        />
      </div>
    </div>
  );
}
