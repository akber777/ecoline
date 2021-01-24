import React from 'react';


// css

import './css/_login.scss';

// tools

// rectstrap
import { Container, Input } from 'reactstrap';

// components
import WhyUs from '../whyUs/whyUs';
import News from '../news/news';
import Map from '../map/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';


// ract router dom
import { NavLink } from 'react-router-dom';

const mapLocate = [
    ['<div><span>Gəncə</span><p>Gəncə şəhəri, Gəncə-Şəmkir şossesi 2-ci km.</p> <p>Tel: (044) 222 11 16</p> <p>İş saatları<br>Həftə içi günlər - 09:00-18:00<br>Şənbə günləri - 09:00-18:00<br>Bazar günləri - İşləmir</p></div>', 41.015137, 28.979530, 'Gəncə'],
];

const Login = () => {
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
                        <div className='login__social'>
                            <a href='2#'>
                                <FontAwesomeIcon icon={faEnvelope} />
                                Log in Email
                            </a>
                            <a href='2#'>
                                <FontAwesomeIcon icon={faFacebookF} />
                                Connect to facebook
                            </a>
                        </div>
                        <div className='login__info'>
                            <h4>XÜSUSİ QEYDİYYAT</h4>
                            <div className='login__formBox'>
                                <Input placeholder='AD/SOYAD' type='text' />
                                <Input placeholder='EMAIL' type='text' />
                                <Input placeholder='ŞİFRƏ' type='password' />
                            </div>
                            <div className='login__formBoxEnd'>
                                <NavLink to={''}>
                                    ŞİFRƏMİ UNUTDUM
                                </NavLink>
                                <NavLink to={''}>
                                    DAXİL OL
                                </NavLink>
                            </div>
                            <div className='login__sendBtn'>
                                <button>
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
        </main>
    );
}

export default Login;
