import http from "./httpService";
import config from './config.json';

const apiEndPoint = `${config.URL}/books`;

export function saveBook(body){
    return http.post(apiEndPoint, body);
}

export function getAllBook(){
    return http.get(`${apiEndPoint}`);
}

export function getBook(id){
    return http.get(`${apiEndPoint}/${id}`);
}

export function getSellerBooks(id){
    return http.get(`${apiEndPoint}/seller/${id}`);
}

export function getBookReviews(bookId){
    return http.get(`${apiEndPoint}/review/${bookId}`);
}

export function myReviewStatus(bookId){
    return http.get(`${apiEndPoint}/myReview/${bookId}`);
}

export function reviewBook({bookId, heading, review}){
    return http.post(`${apiEndPoint}/review`, {bookId, heading, review});
}

export function rateBook(bookId, rate){
    return http.put(`${apiEndPoint}/rate/${bookId}`, {rate});
}

export function getMyRatings(bookId){
    return http.get(`${apiEndPoint}/myRating/id/${bookId}`);
}