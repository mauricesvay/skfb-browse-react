import {connect} from 'react-redux';
import {requestModels} from '../actions/actions';
import Grid from '../components/Grid';

var query = {
    'sort_by': '-likeCount',
    'date': 7
};
var key = JSON.stringify(query);

function mapStateToProps(state) {
    var models = state.models[key] || [];
    var isLoading = !!state.isLoading[key];

    return {models, isLoading};
}

function mapDispatchToProps(dispatch) {
    return {
        requestModels: (offset) => {
            dispatch(requestModels(query, offset))
        }
    }
}

const RecentGrid = connect(mapStateToProps, mapDispatchToProps)(Grid);

module.exports = RecentGrid;
