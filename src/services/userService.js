import http from './httpService';
import config from './config.json';

const apiEndPoint = `${config.URL}/users`

export function saveUser(body){
    http.post(apiEndPoint, {name: body.name, email: body.email, address: body.address, phone: body.phone, type: body.type,
        password: body.password});
}