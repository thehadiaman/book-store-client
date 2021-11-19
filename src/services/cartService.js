import http from "./httpService";

const apiEndPoint = '/cart';

export function addToCart(id, count){
    return http.put(`${apiEndPoint}/${id}`, {count: count});
}

export function getCart(){
    return http.get(`${apiEndPoint}`);
}

export function getCartCount(){
    return http.get(`${apiEndPoint}/count`);
}

export function getAllCartItems(){
    return http.get(`${apiEndPoint}/getAll`);
}

export function getTotalPrice(){
    return http.get(`${apiEndPoint}/getTotalPrice`);
}