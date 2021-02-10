import React, { useLayoutEffect, useState } from 'react';

// css

import './css/_loginLocation.scss';


// tools
import { NavLink } from 'react-router-dom';
import { Container, Input } from 'reactstrap';
import Map from '../map/map';

// axios
import axios from 'axios';


// react query
import { useQuery, useMutation } from 'react-query';


// api
import { baseUrl } from '../../api/api';


// jquery
import $ from 'jquery';


const LoginLocation = () => {



    let { data, isLoading } = useQuery(['infoLocation'], async (key) => {

        const res = axios.get(baseUrl + 'selectable?include=cities')

        return res;

    }, {
        refetchOnWindowFocus: false
    })





    let [name, setName] = useState()
    let [phone, setPhone] = useState()
    let [address, setAddress] = useState()
    let [id, setId] = useState()
    let [city_id, setCity] = useState(isLoading === false && (data.data.data.cities.data[0].name))



    let params = {
        name: name,
        phone: phone,
        address: address,
        city_id: city_id,
        id: id
    }


    // register
    const mutationAdd = useMutation(add => axios.post(baseUrl + 'address/add', add))

    const mutationUpdated = useMutation(update => axios.put(baseUrl + 'address', update), {
        onSuccess: function () {

            $('.formItem input').val('')
        }
    })



    // address


    let addressApi = useQuery(['addressApi', mutationAdd.data, mutationUpdated.data], async (key) => {

        const res = axios.get(baseUrl + 'address')

        return res;


    }, {
        refetchOnWindowFocus: false,
        cacheTime: localStorage.getItem('token') && localStorage.getItem('user') === null ? 0 : 5000
    })



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


    useLayoutEffect(() => {
        $('.sendInfo').on('click', function () {

            $('.infoPopup').hide()

        })

    }, [addressApi.data])




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
                        <NavLink to={'/loginorder'}>
                            Sifarişlərim
                        </NavLink>
                        <NavLink to={'/loginlocation'} className='activeMenu'>
                            Ünvanlarım
                        </NavLink>
                        <NavLink to={'/logininformation'}>
                            Məlumatlarım
                        </NavLink>
                        <NavLink to={'/passwordupdate'}>
                            Şifrəni yenilə
                        </NavLink>
                        <NavLink to={''} onClick={() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                        }}>
                            Çıxış
                        </NavLink>
                    </div>
                </div>
                <div className='info__content'>
                    <div className='infoPopup openUpdatedPopup'>
                        <div className='info__WrapperModal'>
                            <button className='closeModal' onClick={(event) => {
                                document.querySelector('.openUpdatedPopup').style.display = 'none'
                            }}>
                                x
                            </button>
                            <h4>YENILE</h4>
                            <div className='formBox'>
                                <div className='formItem'>
                                    <span>Ad:</span>
                                    <Input type='text'
                                        onChange={(event) => {
                                            setName(event.target.value)
                                        }} />
                                </div>
                                <div className='formItem'>
                                    <span>Telefon:</span>
                                    <Input type='phone'
                                        onChange={(event) => {
                                            setPhone(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className='formItem fromLocate'>
                                    <span>Ünvan:</span>
                                    <Input type='text'
                                        onChange={(event) => {
                                            setAddress(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className='formItem'>
                                    <span>Xəritədə göstər:</span>
                                    <p className='showPin'>
                                        <img src={require('../../images/newPin.png').default} alt='' />
                                    </p>
                                </div>
                                <div className='formItem'>
                                    <span>Şəhər:</span>
                                    <select
                                        onChange={(event) => {
                                            setCity(event.target.value)

                                        }}
                                    >
                                        {
                                            isLoading === false && data !== undefined && (

                                                data.data.data.length !== 0 && (
                                                    data.data.data.cities.data.map(item => (
                                                        <option key={item.id}
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </option>
                                                    ))
                                                )

                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <button className='sendInfo'
                                onClick={(event) => {
                                    mutationUpdated.mutate(params)
                                }}
                            >
                                ƏLAVƏ ET
                            </button>
                        </div>
                    </div>

                    {/* add */}
                    <div className='infoPopup openAddPopup'>
                        <div className='info__WrapperModal'>
                            <button className='closeModal' onClick={(event) => {

                                document.querySelector('.openAddPopup').style.display = 'none'

                            }}>
                                x
                            </button>
                            <h4>YENILE</h4>
                            <div className='formBox'>
                                <div className='formItem'>
                                    <span>Ad:</span>
                                    <Input type='text'
                                        onChange={(event) => {
                                            setName(event.target.value)
                                        }} />
                                </div>
                                <div className='formItem'>
                                    <span>Telefon:</span>
                                    <Input type='phone'
                                        onChange={(event) => {
                                            setPhone(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className='formItem fromLocate'>
                                    <span>Ünvan:</span>
                                    <Input type='text'
                                        onChange={(event) => {
                                            setAddress(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className='formItem'>
                                    <span>Xəritədə göstər:</span>
                                    <p className='showPin'>
                                        <img src={require('../../images/newPin.png').default} alt='' />
                                    </p>
                                </div>
                                <div className='formItem'>
                                    <span>Şəhər:</span>
                                    <select
                                        onChange={(event) => {
                                            setCity(event.target.value)

                                        }}
                                    >
                                        {
                                            isLoading === false && data !== undefined && (

                                                data.data.data.length !== 0 && (
                                                    data.data.data.cities.data.map(item => (
                                                        <option key={item.id}
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </option>
                                                    ))
                                                )

                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <button className='sendInfo'
                                onClick={() => {
                                    mutationAdd.mutate(params)
                                }}
                            >
                                ƏLAVƏ ET
                            </button>
                        </div>
                    </div>

                    <div className='formBox'>
                        {
                            addressApi.isLoading === false && addressApi.data !== undefined && addressApi.data.data.data.length !== 0 && (
                                addressApi.data.data.data.map(item => (
                                    <div className='location__content' key={item.id}>
                                        <div className='location__contentLeft'>
                                            <p>
                                                Ev ünvanım:
                                                <span>
                                                    {
                                                        item.address
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                <img src={require('../../images/newPin.png').default} alt='' />
                                            </p>
                                        </div>
                                        <div className='location__contentRight'>
                                            <span className='changeInfo' data-id={item.id} onClick={(event) => {
                                                document.querySelector('.openUpdatedPopup').style.display = 'block';
                                                setId(Number(event.target.getAttribute('data-id')))
                                            }}>
                                                DÜZƏLİŞ ET
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )
                        }

                    </div>
                    <div className='login__sendBtn infoSend'>
                        <button
                            onClick={() => {
                                document.querySelector('.openAddPopup').style.display = 'block';
                            }}
                        >
                            ÜNVAN ƏLAVƏ ET
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

export default LoginLocation;
