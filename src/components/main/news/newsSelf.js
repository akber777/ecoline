import React, { useLayoutEffect, useState } from 'react';


// rectstrap
import { Col, Container, Row } from 'reactstrap';

// react router dom
import { NavLink, useLocation } from 'react-router-dom';


// react query
import { useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../../api/api';



const NewsSelf = () => {


    let { pathname } = useLocation();


    useLayoutEffect(() => {

        setPage(1)
        setBlog([])

    }, [pathname])


    let [page, setPage] = useState(1)

    let [blog, setBlog] = useState([])


    let { data, isLoading } = useQuery(['blog', pathname, page], async () => {

        const res = await axios.get(baseUrl + 'blog', {
            headers: {
                'Content-Type': 'application/json',
                page: page,
                number: 3
            }
        })

        return res.data

    }, {
        refetchOnWindowFocus: false
    })


    useLayoutEffect(() => {

        if (isLoading === false) {
            setBlog(oldArray => [...oldArray, ...data.data])
        }

    }, [data])

    window.onscroll = function () {

        if (isLoading === false) {

            if (data.data.length !== 0) {
                setPage(page = page + 1)
                if (isLoading === false) {
                    if (blog.includes(...data.data) === false) {
                        setBlog(oldArray => [...oldArray, ...data.data])
                    }
                }
            }
        }
    }


    return (
        <main className='newsSelf'>

            <div className='home__newsContent'>
                <Container>
                    <Row>
                        {
                            isLoading === false && blog.length === 0 ?
                                data.data.map((item, index) => (
                                    <Col lg='4' className='mb-4' key={index}>
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
                                :
                                blog.map((item, index) => (
                                    <Col lg='4' className='mb-4' key={index}>
                                        <NavLink to={'/blogs/' + item.slug}>
                                            <div className='home__newsInfo' style={{ marginTop: 0 }}>
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
                        }
                    </Row>
                </Container>
            </div>
        </main>
    );
}

export default NewsSelf;
