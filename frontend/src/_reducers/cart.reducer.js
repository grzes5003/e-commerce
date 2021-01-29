import {cartConstants} from "../_constants";

export function cart(state = {cart: [], orders: []}, action) {
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

        // cart override
        case cartConstants.OVERWRITE_CART_REQ:
            return {
                cart: [],
                orders: state.orders,
                loading: true
            }
        case cartConstants.OVERWRITE_CART_SUC:
            console.log('przyszlo to: ', action);
            return {
                orders: state.orders,
                cart: action.products
            };

        // cart orders
        case cartConstants.ORDER_PROD_FROM_CART_REQ:
            return {
                cart: state.cart,
                loading: true
            }
        case cartConstants.ORDER_PROD_FROM_CART_SUC:
            return {
                cart: [],
                order: state.cart
            }
        case cartConstants.ORDER_PROD_FROM_CART_FAIL:
            return {
                error: action.error
            };

        // get all orders
        case cartConstants.GET_ALL_ORDERS_REQ:
            return {
                cart: state.cart,
                loading: true
            }
        case cartConstants.GET_ALL_ORDERS_SUC:
            return {
                orders: action.orders,
                cart: state.cart
            }
        case cartConstants.GET_ALL_ORDERS_FAIL:
            return {
                cart: state.cart,
                error: action.error
            }
        default:
            return state
    }
}
