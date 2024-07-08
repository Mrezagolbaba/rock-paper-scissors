import axios from 'axios';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3001/login', { username, password });
        localStorage.setItem('userId', response.data.id);
    } catch (error) {
        console.error('Login failed:', error);
    }
};

export const logout = () => {
    localStorage.removeItem('userId');
};

export const register = async (username: string, password: string) => {
    try {
       const response= await axios.post('http://localhost:3001/register', { username, password })
       return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
    }
}