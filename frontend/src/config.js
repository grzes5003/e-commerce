export const config = {
    apiUrl: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : window.location.origin + '/api'
}
