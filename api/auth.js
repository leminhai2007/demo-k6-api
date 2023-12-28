import http from 'k6/http';

export function doLogin(username, password) {
    // Prepare request parameters
    const params = {
        headers: { 'Content-Type': 'application/json' },
    }

    const body = JSON.stringify({
        username: username,
        password: password
    })
    
    // Request API
    return http.post('https://dummyjson.com/auth/login', body, params);
}