import {itemConstants} from "../_constants";

export function items(state = {brands: []}, action) {
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

            // get products
        case itemConstants.GET_PROD_REQ:
            return {
                brands: state.brands,
                loading: true
            };
        case itemConstants.GET_PROD_SUC:
            return {
                brands: state.brands,
                product: action.product
            };
        case itemConstants.GET_PROD_FAIL:
            return {
                error: action.error
            };

            // get filtered products
        case itemConstants.GET_PROD_FILT_REQ:
            return {
                brands: state.brands,
                loading: true
            };
        case itemConstants.GET_PROD_FILT_SUC:
            return {
                brands: state.brands,
                products: action.products
            };
        case itemConstants.GET_PROD_FILT_FAIL:
            return {
                error: action.error
            };

            // get brands
        case itemConstants.GET_BRANDS_REQ:
            return {
                product: state.product,
                loading: true
            };
        case itemConstants.GET_BRANDS_SUC:
            return {
                product: state.product,
                brands: action.brands
            };
        case itemConstants.GET_BRANDS_FAIL:
            return {
                error: action.error
            };
        default:
            return state
    }
}
