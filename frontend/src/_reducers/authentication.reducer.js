import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                login_failure: true
            };
        case userConstants.LOGOUT:
            return {
                logout_successful: true
            };

            // register
        case userConstants.REGISTER_SUCCESS:
            return {
                success: true
            }
        case userConstants.REGISTER_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }
}
