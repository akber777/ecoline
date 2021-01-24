import React from 'react';

// css

import './css/_loginOrder.scss';


// tools
import { NavLink } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import Map from '../map/map';




const LoginOrder = () => {

    const mapLocate = [
        ['<div><span>Gəncə</span><p>Gəncə şəhəri, Gəncə-Şəmkir şossesi 2-ci km.</p> <p>Tel: (044) 222 11 16</p> <p>İş saatları<br>Həftə içi günlər - 09:00-18:00<br>Şənbə günləri - 09:00-18:00<br>Bazar günləri - İşləmir</p></div>', 41.015137, 28.979530, 'Gəncə'],
    ];


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
                        <NavLink to={''}>
                            Çıxış
                        </NavLink>
                    </div>
                </div>
                <div className='orderLogin__info'>
                    <div className='orderLogin__top'>
                        <p>
                            01.
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
                                141 AZN
                            </span>
                        </p>
                        <p>
                            STATUS:
                            <span>
                                Təhvil verildi
                            </span>
                        </p>
                    </div>
                </div>
                <div className='oder__content'>
                    <Row>
                        <Col md='6' lg='2'>
                            <div className='order__itemBox'>
                                <div className='order__itemBox--img'>
                                    <img src={require('../../images/3.png').default} alt='' />
                                </div>
                                <strong>DUBLYONKA</strong>
                                <span>qısa</span>
                                <div className='flex'>
                                    <p className='priceBtn'>
                                        <span data-minus="-20%">
                                            13 AZN
                                    </span>

                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md='6' lg='2'>
                            <div className='order__itemBox'>
                                <div className='order__itemBox--img'>
                                    <img src={require('../../images/3.png').default} alt='' />
                                    <div className='show'>
                                        2
                                    </div>
                                </div>
                                <strong>DUBLYONKA</strong>
                                <span>qısa</span>
                                <div className='flex'>
                                    <p className='priceBtn'>
                                        <span>
                                            13 AZN
                                        </span>
                                        <i>
                                            13%
                                        </i>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md='6' lg='2'>
                            <div className='order__itemBox'>
                                <div className='order__itemBox--img'>
                                    <img src={require('../../images/3.png').default} alt='' />
                                </div>
                                <strong>DUBLYONKA</strong>
                                <span>qısa</span>
                                <div className='flex'>
                                    <p className='priceBtn'>
                                        <span>
                                            13 AZN
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md='6' lg='2'>
                            <div className='order__itemBox'>
                                <div className='order__itemBox--img'>
                                    <img src={require('../../images/3.png').default} alt='' />
                                </div>
                                <strong>DUBLYONKA</strong>
                                <span>qısa</span>
                                <div className='flex'>
                                    <p className='priceBtn'>
                                        <span data-minus="-20%">
                                            13 AZN
                                    </span>

                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md='6' lg='2'>
                            <div className='order__itemBox'>
                                <div className='order__itemBox--img'>
                                    <img src={require('../../images/3.png').default} alt='' />
                                </div>
                                <strong>DUBLYONKA</strong>
                                <span>qısa</span>
                                <div className='flex'>
                                    <p className='priceBtn'>
                                        <span data-minus="-20%">
                                            13 AZN
                                    </span>

                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md='6' lg='2'>
                            <div className='order__itemBox'>
                                <div className='order__itemBox--img'>
                                    <img src={require('../../images/3.png').default} alt='' />
                                </div>
                                <strong>DUBLYONKA</strong>
                                <span>qısa</span>
                                <div className='flex'>
                                    <p className='priceBtn'>
                                        <span data-minus="-20%">
                                            13 AZN
                                    </span>

                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='order__buttonBox'>
                    <NavLink to={''}>
                        TƏSLİMAT ÜNVANI
                    </NavLink>
                    <NavLink to={''}>
                        SİFARİŞİ QIYMƏTLƏNDİR
                    </NavLink>
                </div>
                <div className='orderLogin__info'>
                    <div className='orderLogin__top'>
                        <p>
                            01.
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
                                141 AZN
                            </span>
                        </p>
                        <p>
                            STATUS:
                            <span>
                                Təhvil verildi
                            </span>
                        </p>
                    </div>
                    <div className='orderLogin__top'>
                        <p>
                            02.
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
                                141 AZN
                            </span>
                        </p>
                        <p>
                            STATUS:
                            <span>
                                Təhvil verildi
                            </span>
                        </p>
                    </div>
                    <div className='orderLogin__top'>
                        <p>
                            03.
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
                                141 AZN
                            </span>
                        </p>
                        <p>
                            STATUS:
                            <span>
                                Təhvil verildi
                            </span>
                        </p>
                    </div>
                    <div className='orderLogin__top end' data-status='hazirlanir' >
                        <p>
                            04.
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
                                141 AZN
                            </span>
                        </p>
                        <p>
                            STATUS:
                            <span>
                                Hazırlanır
                            </span>
                        </p>
                    </div>
                </div>
                <div className='login__sendBtn infoSend'>
                    <button>
                        YADDA SAXLA
                        </button>
                </div>
            </Container>

            <div id='map'>
                <Map locations={mapLocate} />
            </div>
        </main >
    );
}

export default LoginOrder;
