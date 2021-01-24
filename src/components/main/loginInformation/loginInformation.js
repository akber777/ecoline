import React from 'react';

// css

import './css/_info.scss';


// tools
import { NavLink } from 'react-router-dom';
import { Container, Input } from 'reactstrap';
import Map from '../map/map';




const LoginInformation = () => {

    const mapLocate = [
        ['<div><span>Gəncə</span><p>Gəncə şəhəri, Gəncə-Şəmkir şossesi 2-ci km.</p> <p>Tel: (044) 222 11 16</p> <p>İş saatları<br>Həftə içi günlər - 09:00-18:00<br>Şənbə günləri - 09:00-18:00<br>Bazar günləri - İşləmir</p></div>', 41.015137, 28.979530, 'Gəncə'],
    ];


    return (
        <main className='info'>
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
                        <NavLink to={'/logininformation'} className='activeMenu'>
                            Məlumatlarım
                        </NavLink>
                        <NavLink to={'/loginorder'}>
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
                <div className='info__content'>
                    <div className='formBox'>
                        <div className='formItem'>
                            <span>Ad:</span>
                            <p>Akber</p>
                        </div>
                        <div className='formItem'>
                            <span>Soyad:</span>
                            <p>Akhmedzadeh</p>
                        </div>
                        <div className='formItem'>
                            <span>Telefon:</span>
                            <p>(050) 387 35 09</p>
                        </div>
                        <div className='formItem'>
                            <span>E mail:</span>
                            <p>akberakhmedzadeh@gmail.com</p>
                        </div>
                        <div className='formItem'>
                            <span>Dogum tarixi:</span>
                            <p>13/09/1997</p>
                        </div>
                        <div className='formItem'>
                            <span>Cinsiyyet:</span>
                            <p>Kişi</p>
                        </div>
                    </div>
                    <div className='fomrPassword'>
                        <h4>Şifrə</h4>
                        <form>
                            <div className='formItem formPass'>
                                <span>HAZIRKİ ŞİFRƏ:</span>
                                <Input type='password' value='qdqdqdqd' />
                            </div>
                            <div className='formItem formPass'>
                                <span>YENİ ŞİFRƏ:</span>
                                <Input type='password' value='qdqdqdqd' />
                            </div>
                            <div className='formItem formPass'>
                                <span>YENİ ŞİFRƏ:</span>
                                <Input type='password' value='qdqdqdqd' />
                            </div>
                        </form>
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

export default LoginInformation;
