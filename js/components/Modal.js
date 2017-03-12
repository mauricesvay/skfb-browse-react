import React from 'react';
import ModelDetail from '../views/ModelDetail';

const Modal = ({ match, history }) => {
    const back = ( e ) => {
        e.stopPropagation( );
        history.goBack( );
    };

    return (
        <div className="popup-container">
            <div className="popup-overlay" onClick={back}></div>
            <div className="popup-model">
                <ModelDetail match={match}></ModelDetail>
            </div>
            <button onClick={back}>x</button>
        </div>
    );
};

export default Modal;
