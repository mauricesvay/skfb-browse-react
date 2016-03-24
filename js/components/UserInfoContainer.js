import { connect } from 'react-redux';
import {requestLogin, requestLogout} from '../actions/actions';
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
            dispatch(requestLogin());
        },
        onLogoutClick: (e) => {
            dispatch(requestLogout());
        }
    }
}

const UserInfoContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfo);

module.exports = UserInfoContainer;
