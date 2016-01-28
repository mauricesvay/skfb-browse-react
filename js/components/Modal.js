import React from 'react';

const Modal = React.createClass({
    render() {
        return (
            <div className="popup-container">
                <div className="popup-overlay" onClick={this.props.onExit}></div>
                <div className="popup-model">
                    { this.props.children }
                </div>
            </div>
        );
    }
});

module.exports = Modal;
