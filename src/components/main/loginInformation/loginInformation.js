import React from 'react';

// css

import './css/_info.scss';


// tools

// react router dom
import { NavLink, useHistory } from 'react-router-dom';

// reactstrap
import { Container } from 'reactstrap';

// component
import Map from '../map/map';


// query
import { useQuery } from 'react-query';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';

// queries

import { user } from '../../queries/queries';


const LoginInformation = () => {


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


    // user information

    let { data, isLoading } = useQuery(['user', ''], user, {
        refetchOnWindowFocus: false,
        cacheTime: localStorage.getItem('token') && localStorage.getItem('user') === null ? 0 : 5000
    })


    if (localStorage.getItem('token') === null) {
        history.push({
            pathname: '/signin'
        })
    }

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
                        <NavLink to={'/loginorder'}>
                            Sifarişlərim
                        </NavLink>
                        <NavLink to={'/loginlocation'}>
                            Ünvanlarım
                        </NavLink>
                        <NavLink to={'/logininformation'} className='activeMenu'>
                            Məlumatlarım
                        </NavLink>
                        <NavLink to={'/passwordupdate'}>
                            Şifrəni yenilə
                        </NavLink>
                        <NavLink to={'/index'}
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
                            <input value={isLoading === false ? (data.data.name) : ''} />
                        </div>
                        <div className='formItem'>
                            <span>Soyad:</span>
                            <input value={isLoading === false ? (data.data.surname) : ''} />
                        </div>
                        <div className='formItem'>
                            <span>Telefon:</span>
                            <input value={isLoading === false ? (data.data.phone) : ''} />
                        </div>
                        <div className='formItem'>
                            <span>E mail:</span>
                            <input value={isLoading === false ? (data.data.email) : ''} />
                        </div>
                        {/* <div className='formItem'>
                            <span>Dogum tarixi:</span>
                            <p>13/09/1997</p>
                        </div>
                        <div className='formItem'>
                            <span>Cinsiyyet:</span>
                            <p>Kişi</p>
                        </div> */}
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
