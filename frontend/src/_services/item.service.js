import {config} from "../config";

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

function handleResponse(response) {
    const jsonPr = (t) => {
        try {
            let o = JSON.parse(t);
            if (o && typeof o === "object") {
                return o;
            }
        } catch (e) {}
        return false;
    }
    // TODO: add not found
    console.log("handleResponse: resp: ", response);
    return response.text().then(text => {
        console.log("handleResponse: ", text);
        const data = text && jsonPr(text);
        console.log("handleResponse: json: ", data);
        if (!response.ok) {
            console.log("handleResponse: not ok", response.statusText);

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("handleResponse: data: ", data);
        return data;
    });
}

export const itemService = {
    getAllCategories,
    getProdDetails
};
