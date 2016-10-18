import {
    connect
} from 'react-redux';
import {
    requestModels
} from '../actions/actions';
import Grid from '../components/Grid';

function mapStateToProps( state, ownProps ) {
    var query = {
        'uid': ownProps.params.id,
        'special': 'collection',
        'count': 24
    };
    var key = JSON.stringify( query );
    var models = state.models[ key ] ?
        state.models[ key ].models : [];
    var isLoading = !!state.isLoading[ key ];
    var nextCursor = state.models[ key ] ?
        state.models[ key ].nextCursor :
        '';

    return {
        models,
        isLoading,
        nextCursor
    };
}

function mapDispatchToProps( dispatch, ownProps ) {
    return {
        requestModels: ( cursor ) => {
            var query = {
                'uid': ownProps.params.id,
                'special': 'collection',
                'count': 24
            };
            var key = JSON.stringify( query );
            dispatch( requestModels( key, query, cursor ) )
        }
    }
}

const RecentGrid = connect( mapStateToProps, mapDispatchToProps )( Grid );

module.exports = RecentGrid;