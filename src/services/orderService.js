import http from "./httpService";
import config from './config.json';

const apiEndPoint = `${config.URL}/order`;

export function checkOut(payment){
    return http.post(apiEndPoint, {payment: payment});
}

export function getMyOrders(){
    return http.get(`${apiEndPoint}/myOrders`);
}

export function cancelOrder(orderId){
    return http.put(`${apiEndPoint}/cancelOrder`, {OrderId: orderId});
}

export function getDeliveries(){
    return http.get(`${apiEndPoint}/deliveries`)
}

export function getOrders(){
    return http.get(`${apiEndPoint}/orders`)
}

export function pack(bookId, orderId){
    return http.put(`${apiEndPoint}/packBook`, {bookId: bookId, orderId: orderId});
}