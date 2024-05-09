import axios from '../axios';

const handleLoginApi = (data) => {
    return axios.post('/api/login', data);
}

export { handleLoginApi }