import http from "./httpService";
import config from './config.json';

const apiEndPoint = `${config.URL}/books`

export function saveBook(body){
    http.post(apiEndPoint, body)
}

export function getBook(id){
    http.get(`${apiEndPoint}/${id}`)
}