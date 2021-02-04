
import axios from 'axios';


export function SetToken() {

    axios.interceptors.request.use(function (config) {

        let token = localStorage.getItem('token')

        if (token) {
            config.headers['Authorization'] = 'Bearer ' + JSON.parse(token)
        } else {
            delete config.headers['Authorization']
        }
        return config
    });


    axios.interceptors.response.use(function (response) {

        return response;

    }, function (error) {

        if (error.response.status === 401) {
            history.push({
                pathname: '/login'
            })
        }

    });

}