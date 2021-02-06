import React from 'react';

// css

import './css/_header.scss';


// Tools
import { Container } from 'reactstrap';

// react router dom

import { NavLink } from 'react-router-dom';


// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';




const Header = () => {
    return (
        <header className='header'>
            <div className=' headerMobWrap'>
                <div className='closeMob'>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className='headerMobileMenu'>
                    <NavLink to={'/'} className='activeItem'>
                        ANA SƏHİFƏ
                                </NavLink>
                    <NavLink to={'/aboutus'}>
                        HAQQIMIZDA
                                </NavLink>
                    <NavLink to={'/services'}>
                        XİDMƏTLƏR
                                </NavLink>
                    <NavLink to={'/price'}>
                        QİYMƏTLƏR
                                </NavLink>
                    <NavLink to={'/blogs'}>
                        BLOG
                                </NavLink>
                    <NavLink to={'/contact'}>
                        ƏLAQƏ
                    </NavLink>
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
                                    <NavLink to={'/signIn'}>
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
                                    <NavLink to={'/login'}>
                                        Qeydiyyat
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
                        <NavLink to={''} className='navLogo'>
                            <img src={require('../images/logoHeader.png').default} alt='' />
                        </NavLink>
                        <div className='header__navItem'>
                            <div className='openMob'>
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            <div className='header__navList'>
                                <NavLink to={'/'} className='activeItem'>
                                    ANA SƏHİFƏ
                                </NavLink>
                                <NavLink to={'/aboutus'}>
                                    HAQQIMIZDA
                                </NavLink>
                                <NavLink to={'/services'}>
                                    XİDMƏTLƏR
                                </NavLink>
                                <NavLink to={'/price'}>
                                    QİYMƏTLƏR
                                </NavLink>
                                <NavLink to={'/blogs'}>
                                    BLOG
                                </NavLink>
                                <NavLink to={'/contact'}>
                                    ƏLAQƏ
                                </NavLink>
                            </div>
                            <div className='header__navGet'>
                                <NavLink to={'/order'}>
                                    SİFARİŞ
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
