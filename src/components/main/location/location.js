import React, { useLayoutEffect, useState } from 'react';

// css
import "./css/_location.scss";

// tools

// rectstrap
import { Container, Input } from 'reactstrap';

// react router dom
// import { NavLink } from 'react-router-dom';

// map

import Map from '../map/map';

// react router dom
import { NavLink, useHistory } from 'react-router-dom';


// query
import { useQuery, useMutation } from 'react-query';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

//  jquery
import $ from 'jquery';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';

// atoms

import { order } from '../../atoms/atoms';

const Location = () => {


    let history = useHistory()


    if (JSON.parse(localStorage.getItem('items')) === null) {
        history.push({
            pathname: '/order'
        })
    }



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


    let [updatedPage, setUpdatedPage] = useState(true)




    let { data, isLoading } = useQuery(['infoLocation'], async (key) => {

        const res = axios.get(baseUrl + 'selectable?include=cities')

        return res;

    }, {
        refetchOnWindowFocus: false
    })





    let [name, setName] = useState()
    let [phone, setPhone] = useState()
    let [address, setAddress] = useState()
    let [city_id, setCity] = useState(isLoading === false && (data.data.data.cities.data[0].name))



    let params = {
        name: name,
        phone: phone,
        address: address,
        city_id: city_id
    }


    // register
    const mutationAdd = useMutation(up => axios.post(baseUrl + 'address/add', up))

    const mutationUpdated = useMutation(up => axios.post(baseUrl + 'address/updated', up))



    let addressApi = useQuery(['addressApi', mutationAdd.data], async (key) => {

        const res = axios.get(baseUrl + 'address')

        return res;

    }, {
        refetchOnWindowFocus: false,
        cacheTime: localStorage.getItem('token') && localStorage.getItem('user') === null ? 0 : 5000
    })


    let [allOder, setOrder] = useRecoilState(order)

    let orderValue = useRecoilValue(order)


    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    useLayoutEffect(() => {

        $('.changeInfo').on('click', function () {

            setOrder({
                address_id: $(this).attr('data-id'),
                payment_method: orderValue!==null ? orderValue.payment_method:null,
                amount: JSON.parse(localStorage.getItem('total')) != null ? JSON.parse(localStorage.getItem('total')).reduce(reducer) : null,
                is_exspress: null,
                items: JSON.parse(localStorage.getItem('items'))
            })


            $('.changeInfo').show();
            $('.changeInfo').find('input').prop('checked', false);
            $('.changeInfo').next().css({
                opacity: 0
            })

            $(this).find('input').prop('checked', true);

            $(this).hide();

            $(this).next().css({
                opacity: 1
            })

        })


        $.each($('.changeInfo'),function(index,item){

            if(orderValue!==null)
            {
                if ($(item).attr('data-id')===orderValue.address_id)
                {
                    $(item).hide()
                    $(item).next().css({
                        opacity:1
                    })
                }
            }
            

        })


        $('.sendInfo').on('click',function(){

            $('.openAddPopup').hide()

        })


    }, [addressApi.data])


    return (
        <main className='location loginLocation'>
            <div className='rules__banner'>
                <img src={require('../../images/rules.png').default} alt='' />
                <Container>
                    <h4 className='rules__title'>
                        ONLİNE SİFARİŞ
                    </h4>
                </Container>
            </div>
            <div className='locationWrapper'>
                <Container>
                    <div className='order__breadCrumbs'>
                        <span>
                            SİFARİŞ
                         </span>
                        <span>
                            SİFARİŞLƏRİM
                        </span>
                        <span className='activCrumbs'>
                            ÜNVAN SEÇ
                        </span>
                    </div>
                    <div className='info__content'>
                        <div className='infoFlexFull'>
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
                                        onClick={() => {
                                            setUpdatedPage(true)
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
                                            setUpdatedPage(true)
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
                                                    <p onClick={(event) => {
                                                        document.querySelector('.openUpdatedPopup').style.display = 'block';
                                                    }}>
                                                        <img src={require('../../images/newPin.png').default} alt='' />
                                                    </p>
                                                </div>
                                                <div className='location__contentRight'>
                                                    <span className='changeInfo' data-id={item.id}>
                                                        SEÇ
                                                        <input name='address_id' type='radio' />
                                                    </span>
                                                    <i style={{ opacity: 0 }} className='checkedI'>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </i>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className='order__result'>
                        <div className='login__sendBtn infoSend'>
                            <button
                                onClick={() => {
                                    document.querySelector('.openAddPopup').style.display = 'block';
                                    setUpdatedPage(false)

                                }}
                            >
                                ÜNVAN ƏLAVƏ ET
                                </button>
                        </div>

                        <div className='btnBoxs'>
                            <NavLink to={'/ordercomplete'}>
                                <button className='success'>
                                    Prev
                                </button>
                            </NavLink>
                            <NavLink to={orderValue !== null ? (orderValue.address_id === null ? '/location' : '/payment') :'/location'}>
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
        </main>
    );
}

export default Location;
