import {config} from '../config';
import {authHeader} from '../_helpers';


const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({username, password})
    };

    const req = `${config.loginServiceUrl}/login`;

    return fetch(req, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            console.log("LOGIN set up user: ", user);

            return user;
        });
};

const logout = () => {
    console.log("logout action!");
    localStorage.removeItem('user');
};

const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("getALL header: ", requestOptions);

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse)
};

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
    console.log("handleResponse: resp: ", response);
    return response.text().then(text => {
        console.log("handleResponse: ", text);
        const data = text && jsonPr(text);
        console.log("handleResponse: json: ", data);
        if (!response.ok) {
            console.log("handleResponse: not ok", response.statusText);
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // window.location.reload(false);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("handleResponse: data: ", data);
        return data;
    });
}

export const userService = {
    login,
    logout,
    getAll
};
