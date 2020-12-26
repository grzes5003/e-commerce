export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        console.log("authHeader: ", user.token);
        return new Headers({
            'Authorization': 'Bearer ' + user.token,
            'withCredentials': 'true',
            'credentials': 'include',
        });
    } else {
        return {};
    }
}
