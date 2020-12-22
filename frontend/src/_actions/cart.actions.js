import {cartService} from "../_services";
import {cartConstants} from "../_constants";
import {alertActions} from "./alert.actions";
import {Intent} from "@blueprintjs/core/lib/esnext/common/intent";

const addProdToCart = (prodId) => {
    return dispatch => {
        dispatch(request())

        cartService.addProdToCart(prodId)
            .then(
                product => {
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

export const cartActions = {
    addProdToCart
};
