import { connect } from 'react-redux';
import React from 'react';
import { requestModel } from '../actions/actions';
import ModelDetail from '../components/ModelDetail';

function mapStateToProps( state, ownProps ) {
    console.log( 'ModelDetails', state );
    var uid = ownProps.match.params.id;
    return {
        uid: uid,
        model: state.allModels[uid]
            ? state.allModels[uid]
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
