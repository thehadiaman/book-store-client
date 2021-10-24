import http from "./httpService";
import config from './config.json';

const apiEndPoint = `${config.URL}/books`

export function saveBook(body){
    http.post(apiEndPoint, body)
}

export function getAllBook(){
    return http.get(`${apiEndPoint}`)
}

export function getBook(id){
    return http.get(`${apiEndPoint}/${id}`)
}

export function getSellerBooks(id){
    return http.get(`${apiEndPoint}/seller/${id}`)
}