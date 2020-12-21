import {itemConstants} from "../_constants";
import {itemService} from "../_services";

const getAllCategories = () => {
    return dispatch => {
        dispatch(request());

        itemService.getAllCategories()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: itemConstants.GETALL_CAT_REQ}
    }

    function success(categories) {
        return {type: itemConstants.GETALL_CAT_SUC, categories}
    }

    function failure(error) {
        return {type: itemConstants.GETALL_CAT_FAIL, error}
    }
}

const getAllFiltered = (filter) => {
    return dispatch => {
        dispatch(request())

        itemService.getAllFiltered(filter)
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error))
            );
    }

    function request() {
        return {type: itemConstants.GET_PROD_FILT_REQ}
    }

    function success(products) {
        return {type: itemConstants.GET_PROD_FILT_SUC, products}
    }

    function failure(error) {
        return {type: itemConstants.GET_PROD_FILT_FAIL, error}
    }
}

const getProdDetails = (prodId) => {
    return dispatch => {
        dispatch(request())

        itemService.getProdDetails(prodId)
            .then(
                product => dispatch(success(product)),
                error => dispatch(failure(error))
            );
    }

    function request() {
        return {type: itemConstants.GET_PROD_REQ}
    }

    function success(product) {
        return {type: itemConstants.GET_PROD_SUC, product}
    }

    function failure(error) {
        return {type: itemConstants.GET_PROD_FAIL, error}
    }
}

export const itemActions = {
    getAllCategories,
    getProdDetails,
    getAllFiltered
};
