import React from 'react';

// css

import './css/_info.scss';


// tools
import { NavLink } from 'react-router-dom';
import { Container, Input } from 'reactstrap';
import Map from '../map/map';


// query
import { useQuery } from 'react-query';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';


const LoginInformation = () => {

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
                                <Input type='password' />
                            </div>
                            <div className='formItem formPass'>
                                <span>YENİ ŞİFRƏ:</span>
                                <Input type='password' />
                            </div>
                            <div className='formItem formPass'>
                                <span>YENİ ŞİFRƏ:</span>
                                <Input type='password' />
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
                {
                    settings.isLoading === false && (
                        <Map locations={locate} />
                    )
                }
            </div>
        </main>
    );
}

export default LoginInformation;
