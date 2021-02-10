import React, { useLayoutEffect } from 'react';

// css

import './css/_loginOrder.scss';


// tools
import { NavLink, useHistory } from 'react-router-dom';

// reactstrap
import { Container, Col, Row } from 'reactstrap';

// map
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

// helper
import { createDate, capitalize } from '../../helper/helper';


const LoginOrder = () => {

    let history = useHistory()

    // settings
    let settings = useQuery(['settings', ''], async () => {

        const res = await axios.get(baseUrl + 'setting')

        return res.data
    }, {
        refetchOnWindowFocus: false,

    })




    const locate = settings.isLoading === false && (
        settings.data.data.map_location.map(item => (
            [
                Number(item.lat),
                Number(item.long)
            ]
        ))
    )



    let { data, isLoading } = useQuery(['loginOrder', ''], loginOrder, {
        refetchOnWindowFocus: false,
        cacheTime: localStorage.getItem('token') && localStorage.getItem('user') === null ? 0 : 5000
    })



    useLayoutEffect(() => {

        $('.orderLogin__top').on('click', function () {

            $(this).next().stop().slideToggle()

        })


    })


    if (localStorage.getItem('token') === null) {
        history.push({
            pathname: '/signin'
        })
    }


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
                        <NavLink to={'/loginorder'} className='activeMenu'>
                            Sifarişlərim
                        </NavLink>
                        <NavLink to={'/loginlocation'}>
                            Ünvanlarım
                        </NavLink>
                        <NavLink to={'/logininformation'}>
                            Məlumatlarım
                        </NavLink>
                        <NavLink to={'/passwordupdate'}>
                            Şifrəni yenilə
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
                                            index + 1 + ' :'
                                        }
                                        <span>
                                            {
                                                createDate(item.created_at).newDate + ' ' + capitalize(createDate(item.created_at).month) + ' ' + createDate(item.created_at).year
                                            }
                                        </span>
                                    </p>
                                    <p>
                                        MƏHSUL:
                                    <span>
                                            {
                                                item.items.data.length + ' ədəd'
                                            }
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
                                                            <img src={product.product.data.img !== null && product.product.data.img.length !== 0 ? product.product.data.img.order : ''} alt='' />
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
