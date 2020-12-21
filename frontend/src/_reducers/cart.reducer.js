import {cartConstants} from "../_constants";

export function cart(state = {cart: []}, action) {
    switch (action.type) {
        // add to cart
        case cartConstants.ADD_PROD_TO_CART_REQ:
            console.log("cart request state: ", state);
            return {
                cart: state.cart,
                loading: true
            };
        case cartConstants.ADD_PROD_TO_CART_SUC:
            console.log("reducer state123: ", state);
            return {
                cart: [...state.cart, action.product]
            };
        case cartConstants.ADD_PROD_TO_CART_FAIL:
            return {
                error: action.error
            };
        default:
            return state
    }
}
