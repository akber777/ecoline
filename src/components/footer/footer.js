import React from 'react';


// css

import './css/_footer.scss';

// tools

// reactstrap
import { Container } from 'reactstrap';


// font awesome

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// react router dom
import { NavLink } from 'react-router-dom';

// react query
import { useQuery } from 'react-query';

// axios
import axios from 'axios';

// baseUrl
import { baseUrl } from '../api/api';

const Footer = () => {

    // settings
    let settings = useQuery(['settings', ''], async () => {

        const res = await axios.get(baseUrl + 'setting')

        return res.data
    }, {
        refetchOnWindowFocus: false
    })


    return (
        <footer className='footer'>
            <Container>
                <div className='footer__top'>
                    <div className='footer__logo'>
                        <img src={require('../images/logoHeader.png').default} alt='' />
                    </div>
                    <div className='footer__content'>
                        <p>© 2020. All Rights Reserved.</p>
                        <div className='footer__social'>
                            {
                                settings.isLoading === false && settings.data !== undefined && (
                                    settings.data.data.social.map(item => (
                                        <a target="_blank" href={item.url}>
                                            <i className={item.icon} ></i>
                                        </a>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
            <div className='footer__end'>
                <Container>
                    <div className='footer__wrapEnd'>
                        <div className='footer__end--left'>
                            <NavLink to={'/rules'}>
                                Qaydalar və şərtlər
                            </NavLink>
                            <NavLink to={''}>
                                Bizimlə əlaqə
                             </NavLink>
                            <NavLink to={''}>
                                Sıx Soruşulan Sual
                             </NavLink>
                            <NavLink to={''}>
                                Təkliflər və şikayətlər
                            </NavLink>
                        </div>
                        <div className='footer__end--right'>
                            <a href={settings.isLoading === false && settings.data === false && (settings.data.data.header_phone)}>
                                {settings.isLoading === false && settings.data && (settings.data.data.header_phone)}
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
