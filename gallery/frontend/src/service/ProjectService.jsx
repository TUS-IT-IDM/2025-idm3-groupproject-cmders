import axios from 'axios';

const API = '/projects';

class ProjectService {
    get(id) {
        return axios.get(`http://localhost:8080/api/projects/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    getAll() {
        return axios.get('http://localhost:8080/api/projects', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    getFiles(id) {
        return axios.get(`http://localhost:8080/api/projects/${id}/files`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
    }

    save(project, image, attachments) {
        const formData = new FormData();
        formData.append('project', new Blob([JSON.stringify(project)], { type: 'application/json' }));
        formData.append('image', image);

        if (attachments) {
            for (let i = 0; i < attachments.length; i++) {
                formData.append('attachments', attachments[i]);
            }
        }

        return axios.post('http://localhost:8080/api/projects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/projects/${id}`, {
            withCredentials: true
        });
    }
}

export default new ProjectService();