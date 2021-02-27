import React, { useLayoutEffect } from 'react';

// tools

// rectstrap
import { Col, Container, Row } from 'reactstrap';

// react router dom
import { NavLink, useLocation } from 'react-router-dom';

// aos
import AOS from 'aos';
import "aos/dist/aos.css";

// imgPath
import { baseUrl, imgPath } from '../../api/api';

// query
import { useQuery } from 'react-query';

// axios
import axios from 'axios';

// react i18
import { useTranslation } from 'react-i18next';

const WhyUs = (props) => {

    const { t } = useTranslation()

    useLayoutEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    let { pathname } = useLocation();

    let updatedPath = pathname === '/' ? 'index' : pathname.split('/')[1]

    let { data, isLoading } = useQuery(['advantage', pathname], async () => {


        const res = axios.get(baseUrl + 'page/' + updatedPath)


        return (await res).data
    })





    return (
        <>
            {
                isLoading === false && data.data.length !== 0 && data.data.viewBag.advantage !== undefined && data !== undefined && (
                    <div className='home__whyUs' data-aos="fade-down">
                        <h4>
                            {
                                t('BİZİ SEÇMƏYİNİZ ÜÇÜN BİR NEÇƏ SƏBƏB')
                            }
                        </h4>
                        <div className='home__whyUsWrapper' style={{ backgroundImage: `url(${require('../../images/bacj.png').default})` }}>
                            {/* <img src={require('../../images/bacj.png').default} alt='' /> */}
                            <Container>
                                <div className='home__whyUsContent'>
                                    <h4>
                                        {
                                            t('DAHA ÇOX MƏLUMAT ALMAQ ÜÇÜN ...')
                                        }
                                    </h4>
                                    <Row>
                                        {
                                            isLoading === false && data.data.length !== 0 && (
                                                data.data.viewBag.advantage !== undefined ? data.data.viewBag.advantage.map((item, index) => (
                                                    <Col lg='4' key={index}>
                                                        <NavLink to={''}>
                                                            <div className='home__whyUsItems'>
                                                                <div className='home__whyUsItems--imgBox'>
                                                                    <img src={item.img !== undefined && item.img !== null ? imgPath + item.img : ''} alt='' />
                                                                </div>
                                                                <div className='home__whyUsItems--text'>
                                                                    <h4>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </h4>
                                                                    <p>
                                                                        {
                                                                            item.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    </Col>
                                                ))
                                                    :
                                                    ''
                                            )
                                        }

                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default WhyUs;
