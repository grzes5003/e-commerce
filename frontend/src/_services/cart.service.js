import {authHeader} from "../_helpers";
import {config} from "../config";
import {handleResponse} from "../_helpers/handle-response";

const addProdToCart = (prodId) => {
    const header = authHeader();

    const requestOptions = {
        method: 'GET',

    };

    // user logged in
    if (header) {
        requestOptions.headers = header;
    }
    console.log("Add to cart ", requestOptions);

    return fetch(`${config.apiUrl}/add/to/cart/`+prodId, requestOptions).then(handleResponse)

}

export const cartService = {
    addProdToCart
};
