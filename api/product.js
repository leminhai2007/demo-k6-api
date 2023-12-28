import http from 'k6/http';

export function getProducts(token) {
    // Prepare request parameters
    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }

    // Request API
    return http.get('https://dummyjson.com/products', params);
}

export function searchProducts(token, keyword) {
    // Prepare request parameters
    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }

    // Request API
    return http.get(`https://dummyjson.com/products/search?q=${keyword}`, params);
}

export function getProductById(token, id) {
    // Prepare request parameters
    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }

    // Request API
    return http.get(`https://dummyjson.com/product/${id}`, params);
}