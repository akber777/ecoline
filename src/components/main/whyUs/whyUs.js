import React, { useLayoutEffect } from 'react';

// tools

// rectstrap
import { Col, Container, Row } from 'reactstrap';

// react router dom
import { NavLink } from 'react-router-dom';

// aos
import AOS from 'aos';
import "aos/dist/aos.css";



const WhyUs = () => {

    useLayoutEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <div className='home__whyUs' data-aos="fade-down">
            <h4>BİZİ SEÇMƏYİNİZ ÜÇÜN BİR NEÇƏ SƏBƏB</h4>
            <div className='home__whyUsWrapper' style={{ backgroundImage: `url(${require('../../images/bacj.png').default})` }}>
                {/* <img src={require('../../images/bacj.png').default} alt='' /> */}
                <Container>
                    <div className='home__whyUsContent'>
                        <h4>DAHA ÇOX MƏLUMAT ALMAQ ÜÇÜN ...</h4>
                        <Row>
                            <Col lg='4'>
                                <NavLink to={''}>
                                    <div className='home__whyUsItems'>
                                        <div className='home__whyUsItems--imgBox'>
                                            <img src={require('../../images/sebeb.png').default} alt='' />
                                        </div>
                                        <div className='home__whyUsItems--text'>
                                            <h4>Profesinal Mütəxəsislər</h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard
                                                dummy text ever since the 1500s, when an unknown printer
                                                took a galley of
                                                 </p>
                                        </div>
                                    </div>
                                </NavLink>
                            </Col>
                            <Col lg='4'>
                                <NavLink to={''}>
                                    <div className='home__whyUsItems'>
                                        <div className='home__whyUsItems--imgBox'>
                                            <img src={require('../../images/sebeb.png').default} alt='' />
                                        </div>
                                        <div className='home__whyUsItems--text'>
                                            <h4>Sürətli Çatdırılma</h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard
                                                dummy text ever since the 1500s, when an unknown printer
                                                took a galley of
                                                 </p>
                                        </div>
                                    </div>
                                </NavLink>
                            </Col>
                            <Col lg='4'>
                                <NavLink to={''}>
                                    <div className='home__whyUsItems'>
                                        <div className='home__whyUsItems--imgBox'>
                                            <img src={require('../../images/sebeb.png').default} alt='' />
                                        </div>
                                        <div className='home__whyUsItems--text'>
                                            <h4>Mükəmməl Nəticə</h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard
                                                dummy text ever since the 1500s, when an unknown printer
                                                took a galley of
                                                 </p>
                                        </div>
                                    </div>
                                </NavLink>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default WhyUs;
