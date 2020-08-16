import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://custom-menu-generator.firebaseio.com/'
});

export default instance;