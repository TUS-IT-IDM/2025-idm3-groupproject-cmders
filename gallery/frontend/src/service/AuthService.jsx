import axios from 'axios';

class AuthService {
    login(user) {
        return axios.post('http://localhost:8080/api/auth/login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    getSession() {
        return axios.get('http://localhost:8080/api/auth/session', {
            withCredentials: true
        });
    }

    logout() {
        return axios.get('http://localhost:8080/api/auth/logout', {
            withCredentials: true
        });
    }
}

export default new AuthService();