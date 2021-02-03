import React from 'react';

// css
import "./css/_payment.scss";

// tools

// rectstrap
import { Container } from 'reactstrap';

// react router dom
// import { NavLink } from 'react-router-dom';

// map

import Map from '../map/map';

// react router dom
import { NavLink, useHistory } from 'react-router-dom';

// query
import { useQuery } from 'react-query';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';


const Payment = () => {


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

    let history = useHistory();

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if (JSON.parse(localStorage.getItem('items')) === null) {
        history.push({
            pathname: '/order'
        })
    }

    return (
        <main className='location payment'>
            <div className='rules__banner'>
                <img src={require('../../images/rules.png').default} alt='' />
                <Container>
                    <h4 className='rules__title'>
                        ONLİNE SİFARİŞ
                    </h4>
                </Container>
            </div>
            <div className='locationWrapper'>
                <div className='order__breadCrumbs'>
                    <span>
                        SİFARİŞ
                    </span>
                    <span>
                        SİFARİŞLƏRİM
                    </span>
                    <span>
                        ÜNVAN SEÇ
                    </span>
                    <span className='activCrumbs'>
                        ÖDƏNİŞ ET
                    </span>
                </div>
                <Container>
                    <div className='payment__content'>
                        <div className='location__content'>
                            <div className='location__contentLeft'>
                                <p>
                                    Kredit Kartı ilə

                            </p>
                            </div>
                            <div className='location__contentRight'>
                                <NavLink to={''}>
                                    SEÇ
                            </NavLink>
                            </div>
                        </div>
                        <div className='location__content'>
                            <div className='location__contentLeft'>
                                <p>
                                    Post terminal
                            </p>
                            </div>
                            <div className='location__contentRight'>
                                <NavLink to={''}>
                                    SEÇ
                            </NavLink>
                            </div>
                        </div>
                        <div className='location__content'>
                            <div className='location__contentLeft'>
                                <p>
                                    Nəğd ödəniş
                            </p>
                            </div>
                            <div className='location__contentRight'>
                                <NavLink to={''}>
                                    SEÇ
                            </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='order__result'>
                        <p>
                            ÜMUMİ MƏBLƏĞ:
                         <span className='res'>
                                {
                                    JSON.parse(localStorage.getItem('total')) !== null && (

                                        JSON.parse(localStorage.getItem('total')).reduce(reducer) + ' AZN'
                                    )
                                }
                            </span>
                        </p>
                        <div className='btnBoxs' style={{ marginTop: 15 }}>
                            <NavLink to={'/location'}>
                                <button className='success'>
                                    Prev
                            </button>
                            </NavLink>
                            <NavLink to={'/delivery'}>
                                <button className='success'>
                                    Next
                            </button>
                            </NavLink>
                        </div>
                    </div>
                </Container>
            </div>
            {
                settings.isLoading === false && (
                    <Map locations={locate} />
                )
            }
        </main >
    );
}

export default Payment;
