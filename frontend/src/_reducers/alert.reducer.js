import { alertConstants } from '../_constants';

const initialState = {
    toastQueue: [],
};

export function alert(state = initialState, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        case alertConstants.ENQUEUE_TOAST: {
            return {
                ...state,
                // toastQueue: [...state.toastQueue, action.toast],
                toastQueue: [action.toast],
            };
        }
        case alertConstants.CLEAR_TOASTS:
            return {
                ...state,
                toastQueue: []
            };
        default:
            return state
    }
}
