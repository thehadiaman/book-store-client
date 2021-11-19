import axios from 'axios';

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwtToken');
axios.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error=>{
    const ERR = error.response && error.response.status >=400 && error.response.status < 500;

    if(!ERR){
        console.log(error);
    }
    return Promise.reject(error);
});

const services = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default services;
