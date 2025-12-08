import axios from 'axios';

class UserService {
    getFavourites(user) {
        return axios.get(`http://localhost:8080/api/users/${user.id}/favourites`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    favourite(user, project) {
        return axios.post(`http://localhost:8080/api/users/${user.id}/favourite/${project.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    unfavourite(user, project) {
        return axios.delete(`http://localhost:8080/api/users/${user.id}/unfavourite/${project.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
    }
}

export default new UserService();