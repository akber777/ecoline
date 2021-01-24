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

const Footer = () => {
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
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faFacebookF} />
                            <FontAwesomeIcon icon={faPlay} />
                            <FontAwesomeIcon icon={faLinkedinIn} />
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
                            <a href='tel:994 55 555 55 55'>
                                +994 55 555 55 55
                             </a>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
