import { connect } from 'react-redux';
import {requestModels} from '../actions/actions';
import Grid from './Grid';

function mapStateToProps(state, ownProps) {
    var query = {categories: ownProps.params.category};
    var key = JSON.stringify(query);
    var models = state.models[key] || [];
    var isLoading = !!state.isLoading[key];

    return {
        models,
        isLoading
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestModels: (offset) => {
            var query = {categories: ownProps.params.category};
            dispatch(requestModels(query, offset))
        }
    }
}

const RecentGrid = connect(mapStateToProps, mapDispatchToProps)(Grid);

module.exports = RecentGrid;
