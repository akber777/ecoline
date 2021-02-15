import React, { useLayoutEffect } from 'react';

// css

import './css/_header.scss';


// Tools
import { Container } from 'reactstrap';

// react router dom

import { NavLink, useLocation } from 'react-router-dom';


// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


// react i18
import { useTranslation } from 'react-i18next';

// react query
import { useQuery } from 'react-query';

// axios
import axios from 'axios';

// helper
import { checkedUrl } from '../helper/helper';

// jquery
import $ from 'jquery';


const Header = () => {

    let { pathname } = useLocation()

    const { t } = useTranslation();

    let { data, isLoading } = useQuery(['header', ''], async () => {

        const res = axios.get('http://apiecoline.gocreative.az/api/v1/data/menu/header')

        return (await res).data;

    }, {
        refetchOnWindowFocus: false
    })


    useLayoutEffect(() => {

        if (pathname === '/') {

            $('.header__navList a:first').addClass('activeItem')
        }

        else if (pathname === 'index') {
            $('.header__navList a:first').addClass('activeItem')
        }

    }, [data])


    return (
        <header className='header'>
            <div className=' headerMobWrap'>
                <div className='closeMob'>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className='headerMobileMenu'>
                    {
                        isLoading === false && data !== undefined && (
                            data.map((item, index) => (
                                <NavLink to={checkedUrl(item)} key={index} className={checkedUrl(item) === pathname ? 'activeItem' : ''}>
                                    {
                                        item.title
                                    }
                                </NavLink>
                            ))
                        )
                    }
                    <div className='footer__social'>
                        <a href=''><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href=''><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href=''><FontAwesomeIcon icon={faPlay} /></a>
                        <a href=''><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                </div>
            </div>
            <div className='header__top'>
                <Container>
                    <div className='header__topFlex'>
                        <div className='header__topLeft'>
                            <p>Həftənin 7 günü saat 10:00`dan 18:00`a dək xidmətinizdəyik</p>
                        </div>
                        <div className='header__topRight'>
                            <a href='tel:'>
                                ( 050 ) 222 22 22
                            </a>
                            {
                                window.localStorage.getItem('token') === null ?
                                    <NavLink to={'/signin'}>
                                        <img src={require('../images/phone.png').default} alt='' />
                                        Daxil ol <span>/</span>
                                    </NavLink>
                                    :
                                    <NavLink to={'/loginorder'}>
                                        {
                                            JSON.parse(window.localStorage.getItem('user')).name
                                        }
                                    </NavLink>
                            }
                            {
                                window.localStorage.getItem('token') === null ?
                                    <NavLink to={'/register'}>
                                        {
                                            t('qeydiyyatLogin')
                                        }
                                    </NavLink>
                                    :
                                    ''
                            }
                        </div>
                    </div>
                </Container>
            </div>
            <div className='header__menuBox'>
                <Container>
                    <nav className='header__nav'>
                        <NavLink to={'/index'} className='navLogo'>
                            <img src={require('../images/logoHeader.png').default} alt='' />
                        </NavLink>
                        <div className='header__navItem'>
                            <div className='openMob'>
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            <div className='header__navList'>
                                {
                                    isLoading === false && data !== undefined && (
                                        data.map((item, index) => (
                                            <NavLink to={checkedUrl(item)} key={index} className={checkedUrl(item) === '/' + pathname.split('/')[1] ? 'activeItem' : ''}>
                                                {
                                                    item.title
                                                }
                                            </NavLink>
                                        ))
                                    )
                                }

                            </div>
                            <div className='header__navGet'>
                                <NavLink to={'/order'}>
                                    {
                                        t('sifaris')
                                    }
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </Container>
            </div>
        </header>
    );
}

export default Header;
