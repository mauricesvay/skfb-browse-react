import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import User from "../User";
import { addLike, removeLike, containsLike } from "../actions/user";

class LikeButton extends React.Component {

    componentDidMount() {
        if (User.isConnected()) {
            this.props.containsLike(this.props.modelUid);
        }
    }

    render() {
        if (User.isConnected() && this.props.doesLike !== undefined) {
            if (this.props.doesLike) {
                return (
                    <button
                        className="active likeButton"
                        onClick={e =>
                            this.props.removeLike(this.props.modelUid)}
                        data-uid={this.props.modelUid}
                    >
                        Like ✓
                    </button>
                );
            } else {
                return (
                    <button
                        className="likeButton"
                        onClick={e => this.props.addLike(this.props.modelUid)}
                        data-uid={this.props.modelUid}
                    >
                        Like
                    </button>
                );
            }
        } else {
            return <button className="likeButton" disabled>Like</button>;
        }
    }
}

function mapStateToProps(state, ownProps) {
    const modelUid = ownProps.model.uid;
    const doesLike = state.user.likes[modelUid];

    return {
        modelUid,
        doesLike
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addLike: uid => {
            dispatch(addLike(uid));
        },
        removeLike: uid => {
            dispatch(removeLike(uid));
        },
        containsLike: uid => {
            dispatch(containsLike(uid));
        }
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LikeButton);
