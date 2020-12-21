import {itemConstants} from "../_constants";

export function items(state = {}, action) {
    switch (action.type) {
        // get all categories
        case itemConstants.GETALL_CAT_REQ:
            console.log('loading  items');
            return {
                loading: true
            };
        case itemConstants.GETALL_CAT_SUC:
            console.log('items ', action.categories);
            return {
                categories: action.categories
            };
        case itemConstants.GETALL_CAT_FAIL:
            return {
                error: action.error
            };

        case itemConstants.GET_PROD_REQ:
            return {
                loading: true
            };
        case itemConstants.GET_PROD_SUC:
            return {
                product: action.product
            };
        case itemConstants.GET_PROD_FAIL:
            return {
                error: action.error
            };

            // get filtered products
        case itemConstants.GET_PROD_FILT_REQ:
            return {
                loading: true
            };
        case itemConstants.GET_PROD_FILT_SUC:
            return {
                products: action.products
            };
        case itemConstants.GET_PROD_FILT_FAIL:
            return {
                error: action.error
            };
        default:
            return state
    }
}
