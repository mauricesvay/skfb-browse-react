import {
    connect
} from 'react-redux';
import {
    requestModels
} from '../actions/actions';
import Grid from '../components/Grid';
var _ = {
    filter: require( 'lodash/filter' )
};

var query = {
    'special': 'newsfeed'
};
var key = JSON.stringify( query );

function mapStateToProps( state ) {
    var models = state.models[ key ] ?
        state.models[ key ].models.map( uid => state.allModels[ uid ] ) :
        [];
    var isLoading = !!state.isLoading[ key ];
    var nextOffset = models.length;

    // Only keep model uploads
    models = _.filter( models, ( story ) => {
        return story.verb === 'upload';
    } );
    models = models.map( ( story ) => {
        var model = story.obj;
        model.user = story.actor;
        return model;
    } );

    return {
        models,
        isLoading,
        nextOffset
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        requestModels: ( offset ) => {
            dispatch( requestModels( query, offset ) )
        }
    }
}

const NewsfeedGrid = connect( mapStateToProps, mapDispatchToProps )( Grid );

module.exports = NewsfeedGrid;
