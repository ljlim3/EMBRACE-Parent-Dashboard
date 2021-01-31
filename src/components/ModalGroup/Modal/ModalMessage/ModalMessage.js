import React, {useState} from "react";
import Switch from "../../../Switch/Switch";
import "./modalmessage.css";

const ModalMessage = ({open, inProgress=false, onContinue, onStartOver, onClose, header=null, spnMsg, engMsg, btnLeftText, btnMiddleText, btnRightText}) => {    
    const [isToggled, setIsToggled] = useState(false);

    if(!open) return null;
   
    const onToggle = () => {
        setIsToggled(!isToggled);
    }

    return (
        <div className="modal-message">
            <div className="overlay"></div>
            <div className="modal-responsive">
                <div className="toggle-area">
                    <Switch
                        onToggle={onToggle}
                        onLabel="EN"
                        offLabel="ES"
                    ></Switch>
                </div>
                {/* <div className="modal-content"> */}
                    <h2 className="modal-heading">{isToggled ? engMsg[0] : spnMsg[0]}</h2>
                    {/* <div className="message"/> */}
                    <p className="message">{isToggled ? engMsg[1] : spnMsg[1]}</p>
                    {
                        inProgress ? ( 
                            <div className="btn-area">
                                <button className="btn-submit btn-back" onClick={onClose}>{isToggled ? engMsg[2] : spnMsg[2]}</button>
                                <button className="btn-submit middle" onClick={() => {onClose(); onStartOver();}}>{isToggled ? engMsg[3] : spnMsg[3]}</button>
                                <button className="btn-submit right" onClick={() => {onClose(); onContinue();}}>{isToggled ? engMsg[4] : spnMsg[4]}</button>     
                            </div>
                        ) :
                        (
                            <div className="btn-area">
                                <button className="button" onClick={onClose}>{isToggled ? engMsg[2] : spnMsg[2]}</button> 
                            </div>
                        )
                    }
                {/* </div> */}
            </div>
        </div>
    )
}

export default ModalMessage;