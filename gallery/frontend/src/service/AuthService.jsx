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

    register(user) {
        return fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
        }).then(res => {
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
        });
    }

    updateProfile(user) {
        return fetch(`${API_BASE}/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
        }).then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
        });
    }

    checkSession() {
        return fetch("http://localhost:8080/api/auth/session", {
            method: "GET",
            credentials: "include"
        }).then(res => {
            if (!res.ok) throw new Error("Not logged in");
            return res.json();
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