import http from './httpService';

const apiEndPoint = '/auth';

export function loginUser(body){
    return http.post(apiEndPoint, {email: body.email, password: body.password});
}

export function authUser(){
    return http.get(`${apiEndPoint}/me`);
}