import React, { useLayoutEffect, useState } from 'react';

// css

import './css/_loginOrder.scss';


// tools
import { NavLink, useHistory } from 'react-router-dom';

// reactstrap
import { Container, Col, Row, Input } from 'reactstrap';

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

// map
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// mapStyle
import mapStyle from '../map/mapStyle';


const LoginOrder = () => {

    let history = useHistory()

    let { data, isLoading } = useQuery(['loginOrder', ''], loginOrder, {
        refetchOnWindowFocus: false,
        cacheTime: localStorage.getItem('token') && localStorage.getItem('user') === null ? 0 : 5000
    })


    useLayoutEffect(() => {

        $('.showPin').on('click', function () {

            $('.openMapPopup').show();


            $('.infoPopup').css({
                opacity: 0,
                zIndex: -1
            })


            $('.openMapPopup').css({
                opacity: 1,
                zIndex: 5555
            })

        })

        $('.closeModalMap').on('click', function () {


            $('.infoPopup').css({
                opacity: 1,
                zIndex: 55555
            })


            $('.openMapPopup').hide();

        })


        $('.sendInfoMap').on('click', function () {


            $('.infoPopup').css({
                opacity: 1,
                zIndex: 55555
            })


            $('.openMapPopup').hide();

        })


        $('.orderLogin__top').on('click', function () {

            $(this).next().stop().slideToggle()

        })

    }, [data])



    if (localStorage.getItem('token') === null) {
        history.push({
            pathname: '/signin'
        })
    }


    let [adress, setAdress] = useState();

    let [lati, setLati] = useState(null)
    let [lang, setLang] = useState(null)


    // map

    const [state, setState] = useState({
        showingInfoWindow: false,
        activeMarker: '',
        zoomMap: 7,
        selectedPlace: '',
        center:
        {
            lat: Number(lati),
            lng: Number(lang)
        },
        show: false,
        positions: '',
        langlat: null
    });



    const mapContainerStyle = {
        height: '409px',
        width: '100%',

    }


    // map style and checkking controls
    const mapOptions = {
        styles: mapStyle,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,

    };

    return (
        <main className='info order loginLocation'>
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
                {/* map popup */}
                <div className='infoPopup openMapPopup'>
                    <div className='info__WrapperModal'>
                        <button className='closeModal closeModalMap' onClick={(event) => {
                            document.querySelector('.openMapPopup').style.display = 'none'
                        }}>
                            x
                            </button>
                        <h4>Xəritə</h4>
                        <LoadScript
                            googleMapsApiKey='AIzaSyANektuMKczEQdzMI82zHlFnMTVSmT55Vw'>
                            <GoogleMap
                                id='mapCoordinate'
                                mapContainerStyle={mapContainerStyle}
                                zoom={state.zoomMap}
                                center={{
                                    lat: Number(lati),
                                    lng: Number(lang)
                                }}
                                options={mapOptions}
                            >
                                <Marker
                                    draggable={false}
                                    onDrag={(event) => {
                                        setLang(event.latLng.lng())
                                        setLati(event.latLng.lat())
                                    }}
                                    icon={{
                                        url: require('../../images/pin.png').default,
                                        // size: { width: 30, height: 30, }
                                    }}

                                    position={
                                        {
                                            lat: Number(lati),
                                            lng: Number(lang)
                                        }
                                    }
                                    animation={2}
                                />
                            </GoogleMap>
                        </LoadScript>
                        <button className='sendInfoMap'>
                            Bağla
                        </button>
                    </div>
                </div>
                {/* info popup */}
                <div className='infoPopup openUpdatedPopup'>
                    <div className='info__WrapperModal'>
                        <button className='closeModal' onClick={(event) => {
                            document.querySelector('.openUpdatedPopup').style.display = 'none'
                        }}>
                            x
                            </button>
                        <h4>Teslimat Unvani</h4>
                        <div className='formBox'>
                            <div className='formItem'>
                                <span>Ad:</span>
                                <Input type='text'
                                    value={adress !== undefined ? adress.name : ''} />
                            </div>
                            <div className='formItem'>
                                <span>Telefon:</span>
                                <Input type='phone'
                                    value={adress !== undefined ? adress.phone : ''}
                                />
                            </div>
                            <div className='formItem fromLocate'>
                                <span>Ünvan:</span>
                                <Input type='text'
                                    value={adress !== undefined ? adress.address : ''}
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
                                <Input type='text'
                                    value={adress !== undefined ? adress.city.data.name : ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isLoading === false && data != undefined && (
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
                                        <NavLink
                                            data-index={index}
                                            to={'#'}
                                            onClick={(event) => {
                                                document.querySelector('.openUpdatedPopup').style.display = 'block';
                                                setAdress(isLoading === false && data !== undefined && (data.data[event.target.getAttribute('data-index')].address.data))
                                                setLati(isLoading === false && data !== undefined && (data.data[event.target.getAttribute('data-index')].address.data.lat))
                                                setLang(isLoading === false && data !== undefined && (data.data[event.target.getAttribute('data-index')].address.data.lang))
                                            }}
                                        >
                                            TƏSLİMAT ÜNVANI
                                        </NavLink>
                                        {/* <NavLink to={'#'}>
                                            SİFARİŞİ QIYMƏTLƏNDİR
                                        </NavLink> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </Container>
        </main >
    );
}

export default LoginOrder;
