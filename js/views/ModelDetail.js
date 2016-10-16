import { connect } from 'react-redux';
import React from 'react';
import { requestModel } from '../actions/actions';
import ModelDetail from '../components/ModelDetail';

function mapStateToProps( state, ownProps ) {
    var uid = ownProps.params.id;
    return {
        model: state.model[uid]
            ? state.model[uid]
            : null
    }
}

function mapDispatchToProps( dispatch, ownProps ) {
    return {
        requestModel: ( uid ) => {
            dispatch(requestModel( uid ))
        }
    }
}

const ModelDetailContainer = connect( mapStateToProps, mapDispatchToProps )( ModelDetail );

module.exports = ModelDetailContainer;
