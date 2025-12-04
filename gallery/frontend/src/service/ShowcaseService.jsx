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
        return axios.get(`http://localhost:8080/api/showcases/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    getProjects(id) {
        return axios.get(`http://localhost:8080/api/showcases/${id}/projects`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    save(showcase, file) {
        const formData = new FormData();
        formData.append('showcase', new Blob([JSON.stringify(showcase)], { type: 'application/json' }));
        formData.append('file', file);

        return axios.post('http://localhost:8080/api/showcases', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
    }
}

export default new ShowcaseService();