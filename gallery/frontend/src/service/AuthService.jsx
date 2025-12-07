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

    register(formData) {
  return fetch("http://localhost:8080/MainGallery/Register", {
    method: "POST",
    body: formData,                // no Content-Type header → browser sets multipart
    credentials: "include"         // if you use sessions / cookies
  }).then(r => {
    if (!r.ok) throw new Error("Registration failed");
    return r.json();
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