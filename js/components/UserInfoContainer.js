import { connect } from 'react-redux';
import {requestLogin} from '../actions/actions';
import UserInfo from './UserInfo';

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLoginClick: (e) => {
            e.preventDefault();
            dispatch(requestLogin())
        }
    }
}

const UserInfoContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfo);

module.exports = UserInfoContainer;
