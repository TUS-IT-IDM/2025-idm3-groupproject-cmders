import axios from 'axios';

class AuthService {
    register(user, profilePicture) {
        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
        formData.append('profilePicture', profilePicture);

        return axios.post('http://localhost:8080/api/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
    }

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
        return axios.post('http://localhost:8080/api/auth/logout', {}, {
            withCredentials: true
        });
    }
}

export default new AuthService();