import axios from 'axios';
const api = {};
api.user = (action) => {
    let prefix = '/api/user/';

    return prefix + action;
};
api.path = (action) => {
    let prefix = '/api/tasks/';

    return prefix + action;
};

api.fetchTask=()=>{
    return axios
        .get(api.path('all'))
        .then(
            (response) => {
                return response.data;
            }
        );
}

export default api;
