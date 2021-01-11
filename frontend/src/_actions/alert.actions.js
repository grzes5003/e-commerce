import {alertConstants} from '../_constants';
import {Intent} from "@blueprintjs/core";
import { createStandaloneToast } from "@chakra-ui/react"

export const clearToasts = () => ({type: alertConstants.CLEAR_TOASTS});

function success(message) {
    return {type: alertConstants.SUCCESS, message};
}

function error(message) {
    clearToasts()
    const toast = createStandaloneToast()

    toast({
        title: message,
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
    })

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
    clearToasts()
    const toast = createStandaloneToast()

    toast({
        title: toastObject.message,
        description: toastObject.message,
        status: toastObject.intent,
        duration: 2000,
        isClosable: true,
    })

    return {type: alertConstants.ENQUEUE_TOAST, toast: toastObject};
};

export const alertActions = {
    success,
    error,
    clear,
    clearToasts,
    toast
};

