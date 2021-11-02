import http from './httpService';
import config from './config.json';

const apiEndPoint = `${config.URL}/users`

export function saveUser(body){
    return http.post(apiEndPoint, {name: body.name, email: body.email, address: body.address, phone: body.phone, zip: body.zip , type: body.type,
        password: body.password});
}

export function verifyUser(body){
    return http.put(`${apiEndPoint}/verify`, {code: body.verificationCode});
}

export function checkEmail(email){
    return http.get(`${apiEndPoint}/checkemail/${email}`);
}

export function getNewVerificationCode(){
    return http.get(`${apiEndPoint}/getverificationcode`);
}

export function forgetPassword(email){
    return http.put(`${apiEndPoint}/forgetpassword`, {email: email});
}

export function resetPassword(body){
    return http.put(`${apiEndPoint}/resetpassword`, {email: body.email, code: body.code, password: body.password});
}

export function updateAddress(body){
    return http.put(`${apiEndPoint}/updateContact`, {address: body.address, phone: body.phone, zip: body.zip});
}

export function checkDeliveryPartner(zip){
    return http.get(`${apiEndPoint}/check-delivery-partner-zip/${zip}`)
}