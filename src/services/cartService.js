import http from "./httpService";
import config from './config.json';

const apiEndPoint = `${config.URL}/cart`;

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