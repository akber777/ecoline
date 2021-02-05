import React, { useLayoutEffect } from 'react';

// css

import './css/_loginOrder.scss';


// tools
import { NavLink } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import Map from '../map/map';


// query
import { useQuery } from 'react-query';
import { loginOrder } from '../../queries/queries';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';


// jquery
import $ from 'jquery';

const LoginOrder = () => {

    // settings
    let settings = useQuery(['settings', ''], async () => {

        const res = await axios.get(baseUrl + 'setting')

        return res.data
    }, {
        refetchOnWindowFocus: false
    })




    const locate = settings.isLoading === false && (
        settings.data.data.map_location.map(item => (
            [
                Number(item.lat),
                Number(item.long)
            ]
        ))
    )



    let { data, isLoading } = useQuery(['loginOrder', ''], loginOrder)



    useLayoutEffect(() => {

        $('.orderLogin__top').on('click', function () {

            $(this).next().stop().slideToggle()

        })

    }, [data])

    return (
        <main className='info order'>
            <div className='rules__banner'>
                <img src={require('../../images/rules.png').default} alt='' />
                <Container>
                    <h4 className='rules__title'>
                        ONLİNE SİFARİŞ
                    </h4>
                </Container>
            </div>
            <Container>
                <div className='info__top'>
                    <div className='info__topItem'>
                        <NavLink to={'/logininformation'}>
                            Məlumatlarım
                        </NavLink>
                        <NavLink to={'/loginorder'} className='activeMenu'>
                            Sifarişlərim
                        </NavLink>
                        <NavLink to={'/loginlocation'}>
                            Ünvanlarım
                        </NavLink>
                        <NavLink to={''}
                            onClick={() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('user')
                            }}
                        >
                            Çıxış
                        </NavLink>
                    </div>
                </div>
                {
                    isLoading === false && (
                        data.data.map((item, index) => (
                            <div className='orderLogin__info' key={index}>
                                <div className='orderLogin__top'>
                                    <p>
                                        {
                                            index + 1
                                        }
                                        <span>
                                            16 Dekabr 2020
                                        </span>
                                    </p>
                                    <p>
                                        MƏHSUL:
                                    <span>
                                            16 ədəd
                                    </span>
                                    </p>
                                    <p>
                                        QİYMƏT:
                                    <span>
                                            {
                                                item.amount
                                            }
                                        </span>
                                    </p>
                                    <p>
                                        STATUS:
                                    <span>
                                            Təhvil verildi
                                    </span>
                                    </p>
                                </div>
                                <div className='order__content'>
                                    <Row>
                                        {
                                            item.items.data.map((product, index) => (
                                                <Col md='6' lg='2' key={index}>
                                                    <div className='order__itemBox'>
                                                        <div className='order__itemBox--img'>
                                                            <img src={require('../../images/3.png').default} alt='' />
                                                        </div>
                                                        <strong>{product.product.data.name}</strong>
                                                        <span>qısa</span>
                                                        <div className='flex'>
                                                            <p className='priceBtn'>
                                                                <span data-minus="-20%">
                                                                    {
                                                                        product.product.data.price
                                                                    }
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                    <div className='order__buttonBox'>
                                        <NavLink to={''}>
                                            TƏSLİMAT ÜNVANI
                                        </NavLink>
                                        <NavLink to={''}>
                                            SİFARİŞİ QIYMƏTLƏNDİR
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </Container>

            <div id='map'>
                {
                    settings.isLoading === false && (
                        <Map locations={locate} />
                    )
                }
            </div>
        </main >
    );
}

export default LoginOrder;
