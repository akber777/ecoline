import React, { useState } from 'react';

// css

import './css/_signIn.scss';

// tools

// rectstrap
import { Container, Input } from 'reactstrap';

// components
import WhyUs from '../whyUs/whyUs';
import News from '../news/news';
import MapContainer from '../map/map';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons';


// ract router dom
import { NavLink, useHistory, useLocation } from 'react-router-dom';

// react query
import { useMutation } from 'react-query';

// axios
import axios from 'axios';


// api
import { loginApi, baseUrl } from '../../api/api';

// query

import { useQuery } from 'react-query';




const SignIn = () => {

    let [email, setEmail] = useState()
    let [password, setPassword] = useState()


    let params = {
        email: email,
        password: password
    }


    let history = useHistory();

    let { pathname } = useLocation();

    // register
    const mutation = useMutation(regi => axios.post(loginApi, regi), {
        onSuccess: function (login) {
            window.localStorage.setItem('user', JSON.stringify(login.data.user));
            window.localStorage.setItem('token', JSON.stringify(login.data.token));


            if (login.status === 200 && pathname === '/signin') {
                history.push({
                    pathname: '/loginorder'
                })
            } else {
                history.push({
                    pathname: pathname
                })
            }
        },
        onError: function (error) {
            document.querySelector('.loginAlertBox').style.display = 'block'
        }
    })




    // settings
    let settings = useQuery(['settings', ''], async () => {

        const res = await axios.get(baseUrl + 'setting')


        return res.data
    }, {
        refetchOnWindowFocus: false
    })




    const locate = settings.isLoading === false && (
        settings.data.data.map_location.map(item => (
            [
                Number(item.lat),
                Number(item.long)
            ]
        ))
    )

    return (
        <main className='signIn rules login'>
            <div className='rules__banner'>
                <img src={require('../../images/rules.png').default} alt='' />
                <Container>
                    <h4 className='rules__title'>
                        Login
                    </h4>
                </Container>
            </div>
            <div className='rules__content login__content'>
                <Container>
                    <div className='login__info'>
                        {/* <div className='login__social'>
                            <a href='2#'>
                                <FontAwesomeIcon icon={faEnvelope} />
                                Log in Email
                            </a>
                            <a href='2#'>
                                <FontAwesomeIcon icon={faFacebookF} />
                                Connect to facebook
                            </a>
                        </div> */}
                        <div className='login__info'>
                            <h4>DAXİL OL</h4>
                            <div className='login__formBox'>
                                <Input placeholder='EMAIL' type='text'
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }} />
                                <Input placeholder='ŞİFRƏ' type='password'
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                                <p className='loginAlertBox'>
                                    Parol və login məlumatları səhvdir
                                </p>
                            </div>
                            <div className='login__formBoxEnd'>
                                {/* <NavLink to={''}>
                                    ŞİFRƏMİ UNUTDUM
                                </NavLink> */}
                                <NavLink to={'/login'}>
                                    QEYDİYYATDAN KEÇ
                                </NavLink>
                            </div>
                            <div className='login__sendBtn'>
                                <button
                                    onClick={() => {
                                        mutation.mutate(params)
                                    }}
                                >
                                    DAXİL OL
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <WhyUs />
            <News />
            <div id='map'>
                {
                    settings.isLoading === false && (
                        <MapContainer locations={locate} />
                    )
                }
            </div>
        </main>
    );
}

export default SignIn;
