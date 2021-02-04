import React, { useLayoutEffect } from 'react';


// tools

// rectstrap
import { Col, Container, Row } from 'reactstrap';

// react router dom
import { NavLink } from 'react-router-dom';

// aos
import AOS from 'aos';
import "aos/dist/aos.css";


// queries
import { blogs } from '../../queries/queries';

// react query
import { useQuery } from 'react-query';

const News = () => {


    useLayoutEffect(() => {
        AOS.init({
            duration: 2000
        });

        window.onscroll = () => {
            AOS.refresh()
        }
    }, []);



    let { data, isLoading } = useQuery(['blogs', 'latest'], blogs, {
        refetchOnWindowFocus: false
    })


    return (
        <div className='home__news' data-aos="fade-down">
            <div className='title'>
                <h4>XƏBƏRLƏR</h4>
                <NavLink to={'/blogs'}>
                    DAHA ÇOX XƏBƏR ÜÇÜN ...
                </NavLink>
            </div>
            <div className='home__newsContent'>
                <Container>
                    <Row>
                        {
                            isLoading === false && (
                                data.data.map((item, index) => (
                                    <Col lg='4' key={index}>
                                        <NavLink to={'/blogs/' + item.slug}>
                                            <div className='home__newsInfo'>
                                                <img src={item.cover.cover} alt='' />
                                                <div className='layout'>
                                                    <img src={require('../../images/layouts.png').default} alt='' />
                                                </div>
                                                <div className='text'>
                                                    <span>15 DEKABR</span>
                                                    <h4>
                                                        {
                                                            item.title
                                                        }
                                                    </h4>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </Col>
                                ))
                            )
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default News;
