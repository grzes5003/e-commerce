export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.text.token) {
        console.log("authHeader: ", user.text.token);
        return new Headers({
            'Authorization': 'Bearer ' + user.text.token,
            'withCredentials': 'true',
            'credentials': 'include',
        });
    } else {
        return {};
    }
}
