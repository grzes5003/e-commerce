import {cartService} from "../_services";
import {cartConstants} from "../_constants";

const addProdToCart = (prodId) => {
    return dispatch => {
        dispatch(request())

        cartService.addProdToCart(prodId)
            .then(
                product => dispatch(success(product)),
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
