import {userConstants} from '../_constants';
import {userService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

const login = (username, password) => {
    return dispatch => {
        dispatch(request({username}));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    };

    function request(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        console.log("ERROR LOGIN: error=", error);
        return {type: userConstants.LOGIN_FAILURE, error}
    }
};


const register = (username, password, email) => {
    return dispatch => {
        dispatch(request());

        userService.register(username, password, email)
            .then(
                _ => {
                    dispatch(success());
                    dispatch(alertActions.success("Register successful"));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    };

    function request() {
        return {type: userConstants.REGISTER_REQUEST}
    }

    function success() {
        return {type: userConstants.REGISTER_SUCCESS}
    }

    function failure(error) {
        console.log("ERROR REGISTER: error=", error);
        return {type: userConstants.REGISTER_FAILURE, error}
    }
};

const logout = () => {
    userService.logout();
    return {type: userConstants.LOGOUT};
};


const getAll = () => {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}



export const userActions = {
    login,
    logout,
    register,
    getAll
};
