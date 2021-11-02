import http from "./httpService";
import config from './config.json';

const apiEndPoint = `${config.URL}/order`;

export function checkOut(payment){
    return http.post(apiEndPoint, {payment: payment});
}

export function getMyOrders(){
    return http.get(`${apiEndPoint}/myOrders`);
}