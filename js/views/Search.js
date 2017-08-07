import {
    connect
} from 'react-redux';
import {
    requestModels,
    requestFallback
} from '../actions/actions';
import qs from 'qs';
import Grid from '../components/Grid';

function mapStateToProps( state, ownProps ) {
    var queryParams = qs.parse( ownProps.location.search.substr( 1 ) );
    var q = queryParams.q || '';

    var query = {
        q: q,
        special: 'search'
    };
    var key = JSON.stringify( query );
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
    }
}

function mapDispatchToProps( dispatch, ownProps ) {

    var queryParams = qs.parse( ownProps.location.search.substr( 1 ) );
    var q = queryParams.q || '';

    var query = {
        q: q,
        special: 'search'
    };
    var key = JSON.stringify( query );
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
