import React from "react";
import ModelDetail from "../views/ModelDetail";

const Modal = ({ match, history }) => {
    const back = e => {
        e.stopPropagation();
        history.goBack();
    };

    return (
        <div className="popup-container">
            <div className="popup-overlay" onClick={back} />
            <div className="popup-model">
                <ModelDetail match={match} />
            </div>
            <button className="closeButton" onClick={back}>x</button>
        </div>
    );
};

export default Modal;
