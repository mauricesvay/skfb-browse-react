import {connect} from 'react-redux';
import {requestModels} from '../actions/actions';
import Grid from '../components/Grid';

function mapStateToProps(state, ownProps) {
    var query = {
        search: ownProps.location.query.q
    };
    var key = JSON.stringify(query);
    var models = state.models[key] || [];
    var isLoading = !!state.isLoading[key];

    return {models, isLoading};
}

function mapDispatchToProps(dispatch, ownProps) {
    var query = {
        search: ownProps.location.query.q
    };
    return {
        requestModels: (offset) => {
            dispatch(requestModels(query, offset))
        }
    }
}

const RecentGrid = connect(mapStateToProps, mapDispatchToProps)(Grid);

module.exports = RecentGrid;
