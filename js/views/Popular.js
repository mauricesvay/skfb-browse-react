import {
    connect
} from 'react-redux';
import {
    requestModels,
    requestFallback
} from '../actions/actions';
import Grid from '../components/Grid';

function getDateWithDayOffset( daysOffset ) {
    var now = +new Date();
    var offsetDate = new Date( now + ( daysOffset * 24 * 60 * 60 * 1000 ) );
    var formattedDate = [
        offsetDate.getUTCFullYear(),
        ( '00' + ( offsetDate.getUTCMonth() + 1 ) ).substr( -2, 2 ),
        ( '00' + offsetDate.getUTCDate() ).substr( -2, 2 )
    ].join( '-' );
    return formattedDate;
}

var query = {
    'sort_by': '-likeCount',
    'published_since': getDateWithDayOffset( -7 ),
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
