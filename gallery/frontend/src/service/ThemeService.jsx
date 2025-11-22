import axios from "axios";

class ThemeService {
    getAll() {
        return axios.get('http://localhost:8080/api/themes', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }
}

export default new ThemeService();