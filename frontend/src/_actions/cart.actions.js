import {cartService, itemService} from "../_services";
import {cartConstants} from "../_constants";
import {alertActions} from "./alert.actions";
import {Intent} from "@blueprintjs/core/lib/esnext/common/intent";

const addProdToCart = (product) => {
    return dispatch => {
        dispatch(request())

        cartService.addProdToCart(product)
            .then(
                _ => {
                    dispatch(success(product));
                    dispatch(alertActions.toast({
                        icon: 'tick-circle',
                        intent: Intent.SUCCESS,
                        message: 'Added to cart',
                    }))
                },
                error => dispatch(failure(error))
            );
    }

    function request() {
        return {type: cartConstants.ADD_PROD_TO_CART_REQ}
    }

    function success(product) {
        return {type: cartConstants.ADD_PROD_TO_CART_SUC, product}
    }

    function failure(error) {
        return {type: cartConstants.ADD_PROD_TO_CART_FAIL, error}
    }
}

const removeCartCookie = () => {
    return dispatch => {
        cartService.removeCartCookie()
            .then(
                message =>
                    dispatch(alertActions.toast({
                        icon: 'tick-circle',
                        intent: Intent.SUCCESS,
                        message: message,
                    }))
            );
    }

}

const removeItemFromCartCookie = prodId => {
    return dispatch => {
        dispatch(request(prodId))

        cartService.removeItemFromCartCookie(prodId)
            .then(
                message => {
                    console.log('REMOVE ITEM THEN: ', message)
                    dispatch(alertActions.toast({
                        icon: 'tick-circle',
                        intent: Intent.SUCCESS,
                        message: message,
                    }))
                },
                error => dispatch(failure(error))
            );
    }

    function request(prodId) {
        return {type: cartConstants.REMOVE_PROD_FROM_CART_REQ, prodId}
    }

    function success() {
        return {type: cartConstants.REMOVE_PROD_FROM_CART_SUC}
    }

    function failure(error) {
        return {type: cartConstants.REMOVE_PROD_FROM_CART_FAIL, error}
    }
}

const loadCartAfterReload = () => {
    return dispatch => {
        dispatch(request())

        cartService.loadCartAfterReload()
            .then(
                // TODO reduce redundancy
                products => dispatch(success(products))
            );
    }

    function request() {
        return {type: cartConstants.OVERWRITE_CART_REQ}
    }

    function success(products) {
        return {type: cartConstants.OVERWRITE_CART_SUC, products}
    }
}

export const cartActions = {
    addProdToCart,
    loadCartAfterReload,
    removeItemFromCartCookie,
};
