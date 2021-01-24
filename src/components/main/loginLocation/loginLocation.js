import React from 'react';

// css

import './css/_loginLocation.scss';


// tools
import { NavLink } from 'react-router-dom';
import { Container, Input } from 'reactstrap';
import Map from '../map/map';




const LoginLocation = () => {

    const mapLocate = [
        ['<div><span>Gəncə</span><p>Gəncə şəhəri, Gəncə-Şəmkir şossesi 2-ci km.</p> <p>Tel: (044) 222 11 16</p> <p>İş saatları<br>Həftə içi günlər - 09:00-18:00<br>Şənbə günləri - 09:00-18:00<br>Bazar günləri - İşləmir</p></div>', 41.015137, 28.979530, 'Gəncə'],
    ];


    return (
        <main className='info loginLocation'>
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
                        <NavLink to={'/logininformation'} >
                            Məlumatlarım
                        </NavLink>
                        <NavLink to={'/loginorder'}>
                            Sifarişlərim
                        </NavLink>
                        <NavLink to={'/loginlocation'} className='activeMenu'>
                            Ünvanlarım
                        </NavLink>
                        <NavLink to={''}>
                            Çıxış
                        </NavLink>
                    </div>
                </div>
                <div className='info__content'>
                    <div className='formBox'>
                        <div className='formItem'>
                            <span>Ad:</span>
                            <Input type='text' value='Qardaşımın evi' />
                        </div>
                        <div className='formItem'>
                            <span>Telefon::</span>
                            <Input type='phone' value='+99455 555 55 55' />
                        </div>
                        <div className='formItem fromLocate'>
                            <span>Ünvan:</span>
                            <Input type='text' value='Aliskender İskenderov 3/3, Nasimi distr. Baku / Azerbaijan ' />
                        </div>
                        <div className='formItem'>
                            <span>Xəritədə göstər:</span>
                            <p className='showPin'>
                                <img src={require('../../images/newPin.png').default} alt='' />
                            </p>
                        </div>
                        <div className='formItem'>
                            <span>Açıqlama::</span>
                            <Input type='text' value='Nizami metrosu, kitabxana ile uzbeuz' />
                        </div>
                    </div>
                    <div className='login__sendBtn infoSend'>
                        <button>
                            YADDA SAXLA
                        </button>
                    </div>
                </div>
            </Container>

            <div id='map'>
                <Map locations={mapLocate} />
            </div>
        </main>
    );
}

export default LoginLocation;
