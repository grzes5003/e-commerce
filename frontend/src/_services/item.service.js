import {config} from "../config";
import {handleResponse} from "../_helpers/handle-response";

const getAllCategories = () => {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/categories`, requestOptions).then(handleResponse)
}

const getProdDetails = (prodId) => {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/product/`+prodId, requestOptions).then(handleResponse)
}

export const itemService = {
    getAllCategories,
    getProdDetails
};
