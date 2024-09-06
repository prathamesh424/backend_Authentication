import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

async function signUpUser(formData) {
    try {
        const response = await axiosInstance.post('/users/register', formData);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error while SignIn', error.response ? error.response.data : error.message);
        throw error;
    }
}

const jsonAxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 25000,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function signInUser({ username, password, email }) {
    try {
        const response = await jsonAxiosInstance.post('/users/login', { username, password, email });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error while logging in:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export { signUpUser , signInUser };
