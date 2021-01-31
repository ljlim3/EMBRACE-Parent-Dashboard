import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import ModalMessage from "./Modal/ModalMessage/ModalMessage"

const ModalGroup = (props) => {
    const { 
        clickedBook, 
        firstModalContent, 
        secondModalContent, 
        open, 
        onClose, 
        firstModalOpen, 
        resetRecommendation,
        loginStatus
    } = props;
    const [reset, setReset] = useState(false);
    const [nextClicked, setNextClicked] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    const [readClicked, setReadClicked] = useState(false);
    const [isFourthValidReading, setIsFourthValidReading] = useState(false);
    const [firstModalLeftColSelection, setFirstModalLeftColSelection] = useState("");
    const [firstModalRightColSelection, setFirstModalRightColSelection] = useState("");


    const handleReset = () => {
        setReset(true);
        resetRecommendation();
        onClose();
    }

    const handleNextClick = () => {
        onClose();
        setNextClicked(true);
        setSecondOpen(true);
    }

    const secondHandleBack = () => {
        setSecondOpen(false);
        firstModalOpen();
    }

    const handleReadClick = () => {
        setReadClicked(true);
    }

    const handleFourthValidReading = (isFourthValidReading) => {
        setIsFourthValidReading(isFourthValidReading);
    }

    const handleFirstModalLeftColSelection = (firstModalLeftColSelection) => {
        setFirstModalLeftColSelection(firstModalLeftColSelection);
    }

    const handleFirstModalRightColSelection = (firstModalRightColSelection) => {
        setFirstModalRightColSelection(firstModalRightColSelection);
    }

    // const language = () => {
    //     if(firstModalRightColSelection === firstModalContent.upperRightBtnLabel) {
    //         return 
    //     }
    // }

    let msgPMModeOffHeader="Reading Tip:";
    let msgPMModeOff="Even when you do not move the pictures, imagine moving the pictures as you read!";
    let msgValidFouthReadingHeader="Congratulations on Your Fourth Reading!";
    let msgValidFourthReading="Be sure to leave enough time to answer questions about this text after you finish reading."
    let btnLabel="Ok";

    const engMsgNoPMMode = [
        msgPMModeOffHeader,
        msgPMModeOff,
        btnLabel="Ok, got it!"
    ]

    const spnMsgNoPMMode = [
        msgPMModeOffHeader="Consejo de lectura:",
        msgPMModeOff="Aun cuando no mueva los retratos, imagine mover los retratos mientras que lee.",
        btnLabel="¡Okey, entiendo!"
    ]

    const engMsgFourthReading = [
        msgValidFouthReadingHeader,
        msgValidFourthReading,
        btnLabel="Ok"
    ]

    const spnMsgFourthReading = [
        msgValidFourthReading="¡Felicidades por completar la cuarta lectura!",
        msgValidFourthReading="Asegúrese de dejar bastante tiempo para contestar preguntas sobre este texto después de que acabe de leer.",
        btnLabel="Okey"
    ]

    return (
        <div className="modal-group">
            <Modal 
                clickedBook={clickedBook}
                {...firstModalContent}
                handleBack={handleReset}
                reset={reset}
                handleNextClick={handleNextClick}
                open={open}
                onClose={onClose}
                setReset={setReset}
                handleFourthValidReading={handleFourthValidReading}
                handleFirstModalLeftColSelection={handleFirstModalLeftColSelection}
                handleFirstModalRightColSelection={handleFirstModalRightColSelection}
            />

            <Modal
                clickedBook={clickedBook}
                {...secondModalContent}
                handleBack={secondHandleBack}
                handleReadClick={handleReadClick}
                reset={reset}
                open={secondOpen}
                setReset={setReset}
                prevModalLeftColSelection={firstModalLeftColSelection === firstModalContent.upperLeftBtnLabel ? firstModalContent.upperLeftBtnImg : firstModalContent.lowerLeftBtnImg}
                prevModalRightColSelection={firstModalRightColSelection}
                prevModalLeftColLabel={firstModalLeftColSelection}
                loginStatus={loginStatus}
            />
             
            <ModalMessage
                open={isFourthValidReading}
                engMsg={engMsgFourthReading}
                spnMsg={spnMsgFourthReading}
                // btnRightText="Ok"
                onClose={() => handleFourthValidReading(false)}
            ></ModalMessage>
            
            <ModalMessage
                open={readClicked}
                engMsg={engMsgNoPMMode}
                spnMsg={spnMsgNoPMMode}
                // btnRightText="Ok, got it!"
                onClose={() => setReadClicked(false)}
            ></ModalMessage>
        </div>
    )
}

export default ModalGroup;