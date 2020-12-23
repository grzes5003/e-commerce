import {cartConstants} from "../_constants";

export function cart(state = {cart: []}, action) {
    switch (action.type) {
        // add to cart
        case cartConstants.ADD_PROD_TO_CART_REQ:
            return {
                cart: state.cart,
                loading: true
            };
        case cartConstants.ADD_PROD_TO_CART_SUC:
            return {
                cart: [...state.cart, action.product]
            };
        case cartConstants.ADD_PROD_TO_CART_FAIL:
            return {
                error: action.error
            };
        // remove from cart
        case cartConstants.REMOVE_PROD_FROM_CART_REQ:
            let cart = state.cart.filter(function (product, index) {
                return product.id !== action.prodId;
            });
            return {
                cart: cart
            }
        case cartConstants.OVERWRITE_CART_REQ:
            return {
                ...state,
                loading: true
            }
        case cartConstants.OVERWRITE_CART_SUC:
            console.log('przyszlo to: ', action);
            return {
                cart: action.products
            };
        default:
            return state
    }
}
