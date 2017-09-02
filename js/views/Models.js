import { connect } from "react-redux";
import { requestModels, requestFallback } from "../actions/actions";
import Grid from "../components/Grid";

function getDateWithDayOffset(daysOffset) {
    var now = +new Date();
    var offsetDate = new Date(now + daysOffset * 24 * 60 * 60 * 1000);
    var formattedDate = [
        offsetDate.getUTCFullYear(),
        ("00" + (offsetDate.getUTCMonth() + 1)).substr(-2, 2),
        ("00" + offsetDate.getUTCDate()).substr(-2, 2)
    ].join("-");
    return formattedDate;
}

function getQuery(match) {
    const queries = {
        "/staffpicks": {
            staffpicked: "true",
            sort_by: "-createdAt",
            count: 24
        },
        "/popular": {
            sort_by: "-likeCount",
            published_since: getDateWithDayOffset(-7),
            count: 24
        },
        "/recent": {
            sort_by: "-createdAt",
            count: 24
        },
        "/collection/:id": {
            uid: match.params.id,
            special: "collection",
            count: 24
        },
        "/category/:category": {
            categories: match.params.category,
            sort_by: "-createdAt",
            count: 24
        }
    };

    if (match.path && queries.hasOwnProperty(match.path)) {
        return queries[match.path];
    } else {
        return {};
    }
}

function mapStateToProps(state, ownProps) {
    var query = getQuery(ownProps.match);
    var key = JSON.stringify(query);
    var models = state.models[key]
        ? state.models[key].models.map(uid => state.entities.models[uid])
        : [];
    var isLoading = !!state.isLoading[key];
    var nextCursor = state.models[key] ? state.models[key].nextCursor : "";

    return {
        models,
        isLoading,
        nextCursor,
        key //required to force re-rendering
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestModels: cursor => {
            var query = getQuery(ownProps.match);
            var key = JSON.stringify(query);
            dispatch(requestModels(key, query, cursor));
        },
        requestFallback: uid => {
            dispatch(requestFallback(uid));
        }
    };
}

const RecentGrid = connect(mapStateToProps, mapDispatchToProps)(Grid);

module.exports = RecentGrid;
