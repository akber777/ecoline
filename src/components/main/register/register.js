import React, { useLayoutEffect, useState } from 'react';


// css

import './css/_login.scss';

// tools

// rectstrap
import { Container, Input } from 'reactstrap';

// components
import WhyUs from '../whyUs/whyUs';
import News from '../news/news';
import Map from '../map/map';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons';


// ract router dom
import { NavLink, useHistory } from 'react-router-dom';

// react query
import { useMutation } from 'react-query';

// axios
import axios from 'axios';


// apis

import { registerApi } from '../../api/api';


// token
import { error } from '../../atoms/atoms';

// recoil
import { useRecoilValue } from 'recoil';


// sweet alert
import swal from 'sweetalert';




const mapLocate = [
    [41.015137, 28.979530]
];


const Login = () => {




    let [name, setName] = useState()
    let [surname, setSurname] = useState()
    let [email, setEmail] = useState()
    let [phone, setPhone] = useState()
    let [password, setPassword] = useState()
    let [passwordRepeat, setPasswordRepeat] = useState()

    let isValid = true;

    let history = useHistory()

    let params = {
        name: name,
        phone: phone,
        surname: surname,
        email: email,
        password: password,
        password_confirmation: passwordRepeat
    }


    const err = useRecoilValue(error)



    // // register
    const mutation = useMutation(regi => axios.post(registerApi, regi), {
        onSuccess: function (token) {

            window.localStorage.setItem('token', JSON.stringify(token.data.token))

            window.localStorage.setItem('user', JSON.stringify(token.data.user))

            history.push({
                pathname: '/logininformation'
            })

        }
    })


    useLayoutEffect(() => {
        if (err !== null && mutation.isError === true) {
            swal({
                title: err.response.data.error,
                icon: "error",
                button: "Bağla",
            })
        }
    }, [mutation.isError])



    return (
        <main className='rules login'>
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
                    <h4>QEYDİYYATDAN KEÇ VƏ YA DAXİL OL</h4>
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
                            <h4>XÜSUSİ QEYDİYYAT</h4>
                            <div className='login__formBox'>
                                <Input placeholder='AD' type='text'
                                    onChange={(event) => {
                                        setName(event.target.value)
                                    }}
                                />
                                <p className='alertLogin'>Ad Daxil Edin</p>
                                <Input placeholder='SOYAD' type='text'
                                    onChange={(event) => {
                                        setSurname(event.target.value)
                                    }}
                                />
                                <p className='alertLogin'>Soyad Daxil Edin</p>
                                <Input placeholder='EMAIL' type='text'
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }} />
                                <p className='alertLogin'>Emaili Daxil Edin</p>
                                <Input placeholder='ŞİFRƏ' type='password'
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                                <p className='alertLogin'>Şifrə Daxil Edin</p>
                                <Input placeholder='ŞİFRƏ TƏKRAR' type='password'
                                    onChange={(event) => {
                                        setPasswordRepeat(event.target.value)
                                    }}
                                />
                                <p className='alertLogin'>Şifrəni Təkrar Daxil Edin</p>
                            </div>
                            <div className='login__formBoxEnd'>
                                {/* <NavLink to={''}>
                                    ŞİFRƏMİ UNUTDUM
                                </NavLink> */}
                                <NavLink to={''}>
                                    DAXİL OL
                                </NavLink>
                            </div>
                            <div className='login__sendBtn'>
                                <button
                                    onClick={() => {

                                        document.querySelectorAll('.login__formBox input').forEach(item => {

                                            if (item.value !== '') {
                                                item.nextElementSibling.style.display = 'none';
                                                item.nextElementSibling.classList.remove('framesAlert')

                                            } else {
                                                item.nextElementSibling.style.display = 'block';
                                                item.nextElementSibling.classList.remove('framesAlert')

                                                setTimeout(() => {
                                                    item.nextElementSibling.classList.add('framesAlert')
                                                }, 100)

                                                isValid = false
                                            }

                                        })

                                        if (isValid === true) {
                                            mutation.mutate(params)
                                        }

                                    }}
                                >
                                    QEYDİYYAT
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <WhyUs />
            <News />
            <div id='map'>
                <Map locations={mapLocate} />
            </div>
        </main >
    );
}

export default Login;
