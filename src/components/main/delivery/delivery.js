import React from 'react';

// css
import "./css/_delivery.scss";

// tools

// rectstrap
import { Container } from 'reactstrap';

// react router dom
// import { NavLink } from 'react-router-dom';

// map

import Map from '../map/map';
import { NavLink } from 'react-router-dom';


const Delivery = () => {

    const mapLocate = [
        ['<div><span>Gəncə</span><p>Gəncə şəhəri, Gəncə-Şəmkir şossesi 2-ci km.</p> <p>Tel: (044) 222 11 16</p> <p>İş saatları<br>Həftə içi günlər - 09:00-18:00<br>Şənbə günləri - 09:00-18:00<br>Bazar günləri - İşləmir</p></div>', 41.015137, 28.979530, 'Gəncə'],
    ];

    return (
        <main className='location payment delivery'>
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
                    <NavLink to={'/order'}>
                        SİFARİŞ
                    </NavLink>
                    <NavLink to={'/location'}>
                        ÜNVAN SEÇ
                    </NavLink>
                    <NavLink to={'/payment'}>
                        ÖDƏNİŞ ET
                    </NavLink>
                    <NavLink to={'/delivery'} className='activCrumbs'>
                        TƏSLİMAT
                    </NavLink>
                </div>
                <Container>
                    <div className='payment__content'>
                        <div className='location__content'>
                            <div className='location__contentLeft'>
                                <p>
                                    Sizin məhsulların təhvil verilməsinə qalan vaxt:
                                    <span>
                                        14-16 saat
                                    </span>
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
                                68 AZN
                        </span>
                        </p>

                    </div>
                </Container>
            </div>
            <Map locations={mapLocate} />
        </main>
    );
}

export default Delivery;
