
// axios
import axios from 'axios';

// router dom
import { useHistory, useLocation } from 'react-router-dom';


// recoil
import { useRecoilState } from 'recoil';


// atoms
import { error } from '../atoms/atoms';


export function SetToken() {


    let [err, setError] = useRecoilState(error)

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

        setError(error)

        if (error.response !== undefined) {
            if (error.response.status === 401) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');

                if (pathname === 'loginorder' ||
                    pathname === 'loginlocation' ||
                    pathname === 'logininformation' ||
                    pathname === 'passwordupdate'

                ) {
                    history.push({
                        pathname: '/signin'
                    })
                }
            }

            if (error.response.status === 400) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');

                if (pathname === 'loginorder' ||
                    pathname === 'loginlocation' ||
                    pathname === 'logininformation' ||
                    pathname === 'passwordupdate'

                ) {
                    history.push({
                        pathname: '/signin'
                    })
                }
            }
        }



    });

}