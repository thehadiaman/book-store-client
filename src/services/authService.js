import http from './httpService';
import config from './config.json';

const apiEndPoint = `${config.URL}/auth`

export function loginUser(body){
    return http.post(apiEndPoint, {email: body.email, password: body.password});
}

export function authUser(){
    return http.get(`${apiEndPoint}/me`);
}