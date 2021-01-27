import {config} from "../config";
import {handleResponse} from "../_helpers/handle-response";

const getAllCategories = () => {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/categories`, requestOptions).then(handleResponse)
}

const getAllFiltered = (filter) => {
    console.log('in the service');

    const requestOptions = {
        method: 'GET'
    };

    console.log('FILER: ', filter.categories);

    let params = new URLSearchParams();

    if (filter.categories) {
        params.append('cat', filter.categories);
    }

    if (filter.offset !== undefined && filter.offset !== null) {
        params.append('offset', filter.offset);
    }

    if (filter.limit) {
        params.append('limit', filter.limit);
    }

    if (filter.sort) {
        params.append('sort', filter.sort);
    }

    if (filter.order) {
        params.append('order', filter.order);
    }

    console.log('params: ', params.toString());

    return fetch(`${config.apiUrl}/products?` + params.toString(), requestOptions).then(handleResponse)
}

const getProdDetails = (prodId) => {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/product/` + prodId, requestOptions).then(handleResponse)
}

const getBrandsList = () => {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/brands`, requestOptions).then(handleResponse)
}

export const itemService = {
    getAllCategories,
    getProdDetails,
    getAllFiltered,
    getBrandsList
};
