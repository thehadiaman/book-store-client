import axios from 'axios';

axios.interceptors.response.use(null, error=>{

    const ERR = error.response && error.response.status >=400 && error.response.status < 500;

    if(!ERR){
        console.log(error);
    }
    console.log(error)
    return Promise.reject(error);

});

const services = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default services;
