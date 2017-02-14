import {
    connect
} from 'react-redux';
import {
    requestModels
} from '../actions/actions';
import Grid from '../components/Grid';

function mapStateToProps( state, ownProps ) {
    var query = {
        'categories': ownProps.params.category,
        'sort_by': '-createdAt',
        'count': 24
    };
    var key = JSON.stringify( query );
    var models = state.models[ key ] ?
        state.models[ key ].models.map( uid => state.allModels[ uid ] ) : [];
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
                'categories': ownProps.params.category,
                'sort_by': '-createdAt',
                'count': 24
            };
            var key = JSON.stringify( query );
            dispatch( requestModels( key, query, cursor ) )
        }
    }
}

const RecentGrid = connect( mapStateToProps, mapDispatchToProps )( Grid );

module.exports = RecentGrid;
