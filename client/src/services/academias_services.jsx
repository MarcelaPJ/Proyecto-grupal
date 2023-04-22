import axios from 'axios';

export const createUser = (name, email, password, confirmPassword) => axios.post('http://localhost:8080/api/academias/register', { name, lastName:name, email, password, confirmPassword });

export const loginUser = (email, password) => axios.post('http://localhost:8080/api/academias/login', { email, password });
