import {
    connect
} from 'react-redux';
import {
    requestModels,
    requestFallback
} from '../actions/actions';
import Grid from '../components/Grid';

var query = {
    'staffpicked': 'true',
    'sort_by': '-createdAt',
    'count': 24
};
var key = JSON.stringify( query );

function mapStateToProps( state ) {
    var models = state.models[ key ] ?
        state.models[ key ].models.map( uid => state.entities.models[ uid ] ) : [];
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

function mapDispatchToProps( dispatch ) {
    return {
        requestModels: ( cursor ) => {
            dispatch( requestModels( key, query, cursor ) )
        },
        requestFallback: ( uid ) => {
            dispatch( requestFallback( uid ) )
        }
    }
}

const RecentGrid = connect( mapStateToProps, mapDispatchToProps )( Grid );

module.exports = RecentGrid;
