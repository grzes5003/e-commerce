import {alertConstants} from '../_constants';
import {Intent} from "@blueprintjs/core";

export const clearToasts = () => ({type: alertConstants.CLEAR_TOASTS});

function success(message) {
    return {type: alertConstants.SUCCESS, message};
}

function error(message) {
    clearToasts();
    const toastObject = {
        icon: 'error',
        intent: Intent.DANGER,
        message: message,
    };
    return {type: alertConstants.ENQUEUE_TOAST, toast: toastObject};
}

function clear() {
    return {type: alertConstants.CLEAR};
}

export const toast = toastObject => (dispatch, getState) => {
    clearToasts();
    dispatch({
        type: alertConstants.ENQUEUE_TOAST,
        toast: toastObject,
    });
};

export const alertActions = {
    success,
    error,
    clear,
    clearToasts,
    toast
};

