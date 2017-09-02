import { connect } from "react-redux";
import React from "react";
import { requestModel } from "../actions/actions";
import ModelDetail from "../components/ModelDetail";

function mapStateToProps(state, ownProps) {
    const uid = ownProps.match.params.id;
    const model = state.entities.models[uid]
        ? state.entities.models[uid]
        : null;

    return {
        uid: uid,
        model: model
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestModel: uid => {
            dispatch(requestModel(uid));
        }
    };
}

const ModelDetailContainer = connect(mapStateToProps, mapDispatchToProps)(
    ModelDetail
);

module.exports = ModelDetailContainer;
