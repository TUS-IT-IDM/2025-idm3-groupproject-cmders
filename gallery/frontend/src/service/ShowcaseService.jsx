import axios from 'axios';

const API = '/showcases';

class ShowcaseService {
    getAll() {
        return axios.get('http://localhost:8080/api/showcases', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    get(id) {
        return axios.get(`${API}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    create(showcase) {
        return axios.post('http://localhost:8080/api/showcases',
            showcase,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );
    }
}

export default new ShowcaseService();