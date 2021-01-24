import React, { useLayoutEffect, useState } from 'react';

// css

import './css/_order.scss';

// tools

// rectstrap
import { Col, Container, Row } from 'reactstrap';

// react router dom
// import { NavLink } from 'react-router-dom';

// map

import Map from '../map/map';
import { NavLink } from 'react-router-dom';


// tabs
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// query
import { useQuery } from 'react-query';
import { categories } from '../../queries/queries';

// recoil
import {
    useRecoilState,
    useRecoilValue
} from 'recoil';

// atoms
import { basket, myTab } from '../../atoms/atoms';

// jquery
import $ from 'jquery';


// import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';



const Order = () => {

    const mapLocate = [
        [41.015137, 28.979530],
    ];



    let { data, isLoading } = useQuery(['category', ''], categories, {
        refetchOnWindowFocus: false
    })


    let [product, setProduct] = useState([])

    let [myBasket, setMyBasket] = useRecoilState(basket)

    let [changeTab, setChangeTab] = useRecoilState(myTab)


    useLayoutEffect(() => {

        $('.nav-tabs > a').click(function () {

            let eventKey = $(this).attr('data-rb-event-key');

            setChangeTab(eventKey)

        })


    }, [data])


    let myTabName = useRecoilValue(myTab)


    let [total] = useState([])


    if (JSON.parse(localStorage.getItem('items')) !== null) {
        product = JSON.parse(localStorage.getItem('items'))
        total = JSON.parse(localStorage.getItem('total'));
    }



    function sendMinus(value, event) {

        const endRes = product.filter(id => id.id === value.id)


        if (endRes[0] !== undefined) {
            if (endRes[0].count > 0) {

                endRes[0].count--
                localStorage.setItem('items', JSON.stringify(product.filter(count => count.count > 0)))
                event.target.nextElementSibling.nextElementSibling.style.display = 'block'
                event.target.nextElementSibling.nextElementSibling.textContent = endRes[0].count

                setMyBasket(JSON.parse(localStorage.getItem('items')))

                const index = total.indexOf(Number(value.price));

                if (index > -1) {
                    total.splice(index, 1);

                    window.localStorage.setItem('total', JSON.stringify(total))
                }
            }
        }
    }

    function sendPlus(value, event) {
        const res = product.some(id => id.id === value.id)

        if (res === false) {

            product.push(value)

            const endFinish = product.filter(id => id.id === value.id)

            localStorage.setItem('items', JSON.stringify(product))

            setMyBasket(JSON.parse(localStorage.getItem('items')))

            if (endFinish !== 0) {
                event.target.nextElementSibling.style.display = 'block'
                event.target.nextElementSibling.textContent = endFinish[0].count
            }

        } else {
            const endRes = product.filter(id => id.id === value.id)
            endRes[0].count++
            localStorage.setItem('items', JSON.stringify(product))
            setMyBasket(JSON.parse(localStorage.getItem('items')))

            if (endRes !== 0) {
                event.target.nextElementSibling.style.display = 'block'
                event.target.nextElementSibling.textContent = endRes[0].count
            }
        }

        total.push(Number(value.price))

        window.localStorage.setItem('total', JSON.stringify(total))

    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;



    window.addEventListener('beforeunload', function (e) {
        localStorage.clear()
    });

    return (
        <main className='order home__price'>
            <div className='rules__banner'>
                <img src={require('../../images/rules.png').default} alt='' />
                <Container>
                    <h4 className='rules__title'>
                        ONLİNE SİFARİŞ
                    </h4>
                </Container>
            </div>
            <Container>
                <div className='order__breadCrumbs'>
                    <NavLink to={'/order'} className='activCrumbs'>
                        SİFARİŞ
                    </NavLink>
                    <NavLink to={'/ordercomplete'} style={{ display: product.length !== 0 ? 'block' : 'none' }}>
                        SİFARİŞLƏRİM
                    </NavLink>
                    <NavLink to={'/location'}>
                        ÜNVAN SEÇ
                    </NavLink>
                    <NavLink to={'/payment'}>
                        ÖDƏNİŞ ET
                            </NavLink>
                    <NavLink to={'/delivery'}>
                        TƏSLİMAT
                    </NavLink>
                </div>
                <div className='oder__content home__priceBox'>
                    {
                        isLoading === false && (
                            <Tabs defaultActiveKey={myTabName !== null ? myTabName : data.data[0].name} transition={false} id="noanim-tab-example">
                                {
                                    data.data.map(item => (

                                        <Tab eventKey={item.name} title={item.name} key={item.id}>
                                            <Row>
                                                {
                                                    item.products.data.map(pro => (
                                                        <Col md='6' lg='2' key={pro.id}>
                                                            <div className='order__itemBox'>
                                                                <div className='order__itemBox--img'>
                                                                    <img src={require('../../images/3.png').default} alt='' />
                                                                    <button className='minus' data-id={pro.id} onClick={(event) => {
                                                                        sendMinus({
                                                                            id: pro.id,
                                                                            img: pro.img !== null ? pro.img.cover : '',
                                                                            name: pro.name,
                                                                            price: pro.price,
                                                                            count: 0
                                                                        }, event)
                                                                    }}>
                                                                        -
                                                                    </button>
                                                                    <button className='plus' data-id={pro.id} onClick={(event) => {
                                                                        sendPlus({
                                                                            id: pro.id,
                                                                            img: pro.img !== null ? pro.img.cover : '',
                                                                            price: pro.price,
                                                                            name: pro.name,
                                                                            count: 1
                                                                        }, event)
                                                                    }}>
                                                                        +
                                                                     </button>
                                                                    <div className="show" style={{
                                                                        display: product.filter(id => id.id === pro.id).length !== 0 ? 'block' : 'none'
                                                                    }}>
                                                                        {
                                                                            product.filter(id => id.id === pro.id).length !== 0
                                                                                ? product.filter(id => id.id === pro.id)[0].count : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <strong>{pro.name}</strong>
                                                                <span>{item.name}</span>
                                                                <div className='flex'>
                                                                    <p className='priceBtn'>
                                                                        <span>
                                                                            {
                                                                                pro.price
                                                                            }
                                                                        </span>
                                                                        {/* <i>
                                                                              13%
                                                                </i> */}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))
                                                }
                                            </Row >
                                        </Tab>
                                    ))
                                }
                            </Tabs>
                        )
                    }

                </div>
                <div className='order__result'>
                    <p>
                        ÜMUMİ MƏBLƏĞ:
                        <span className='res'>
                            {
                                total.length !== 0 ?
                                    total.reduce(reducer) + ' AZN'
                                    :
                                    0 + ' AZN'
                            }
                        </span>
                    </p>
                    <NavLink to={total.length !== 0 ? total.reduce(reducer) !== 0 ? `/ordercomplete` : '' : '/order'}>
                        <button className='success'>
                            SİFARİŞİ TƏSDİQLƏ
                        </button>
                    </NavLink>
                </div>
            </Container>
            <div id='map'>
                <Map locations={mapLocate} />
            </div>
        </main >
    );
}

export default Order;
