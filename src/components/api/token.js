
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';


export function SetToken() {


    let history = useHistory();

    let { pathname } = useLocation();

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


        if (error.response !== undefined) {
            if (error.response.status === 401) {

                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');

                if (pathname !== '/ordercomplete') {
                    history.push({
                        pathname: '/signin'
                    })
                }
            }

            if (error.response.status === 400) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');

                if (pathname !== '/ordercomplete') {
                    history.push({
                        pathname: '/signin'
                    })
                }
            }
        }


    });

}