import React from 'react';

const Modal = ( props ) => (
    <div className="popup-container">
        <div className="popup-overlay" onClick={props.onExit}></div>
        <div className="popup-model">
            {props.children}
        </div>
    </div>
);

export default Modal;
