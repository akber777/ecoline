import React, { useLayoutEffect, useState } from 'react';



// rectstrap
import { Col, Container, Row } from 'reactstrap';

// map
import Map from '../map/map';
import { NavLink, useHistory } from 'react-router-dom';


// recoil
import {
    useRecoilState,
} from 'recoil';


// atoms
import { basket } from '../../atoms/atoms';


// query
import { useQuery } from 'react-query';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';

const OrderComplete = () => {



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


    let [product, setProduct] = useState([])

    let [myBasket, setMyBasket] = useRecoilState(basket)


    let [total] = useState([])


    // determinet  basket value

    let history = useHistory()




    if (JSON.parse(localStorage.getItem('items')) !== null) {
        product = JSON.parse(localStorage.getItem('items'));
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

                event.target.parentNode.parentNode.children[2].children[1].textContent = endRes[0].count * Number(endRes[0].price)
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
            event.target.parentNode.parentNode.children[2].children[1].textContent = endRes[0].count * Number(endRes[0].price)

            if (endRes !== 0) {
                event.target.nextElementSibling.style.display = 'block'
                event.target.nextElementSibling.textContent = endRes[0].count
            }
        }

        total.push(Number(value.price))
        window.localStorage.setItem('total', JSON.stringify(total))


    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    useLayoutEffect(() => {

        if (total.length === 0) {
            history.push({
                pathname: '/order'
            })
        }
    })


    return (
        <main className='complete'>
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
                    <span>
                        SİFARİŞ
                    </span>
                    <span className='activCrumbs' >
                        SİFARİŞLƏRİM
                    </span>
                </div>
                <div className='oder__content home__priceBox'>
                    <Row>
                        {
                            JSON.parse(window.localStorage.getItem('items')) !== null && (
                                JSON.parse(window.localStorage.getItem('items')).map(pro => (

                                    <Col md='6' lg='2' key={pro.id}>
                                        <div className='order__itemBox'>
                                            <div className='order__itemBox--img'>
                                                <img src={require('../../images/3.png').default} alt='' />
                                                <button className='minus' data-id={pro.id} onClick={(event) => {
                                                    sendMinus({
                                                        id: pro.id,
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
                                            {/* <span>{item.name}</span> */}
                                            <div className='flex'>
                                                <p className='priceBtn'>
                                                    <span>
                                                        {
                                                            pro.price
                                                        }
                                                    </span>
                                                    <i>
                                                        13%
                                                    </i>
                                                </p>
                                                <p className='setCount'>
                                                    {
                                                        pro.price * Number(product.filter(id => id.id === pro.id)[0].count) + ' AZN'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            )
                        }
                    </Row >
                </div>
                <div className='order__result'>
                    <p>
                        ÜMUMİ MƏBLƏĞ:
                        <span className='res'>
                            {
                                total.length !== 0 && (

                                    total.reduce(reducer) + ' AZN'
                                )
                            }
                        </span>
                    </p>
                    <div className='btnBoxs'>
                        <NavLink to={'/order'}>
                            <button className='success'>
                                Prev
                            </button>
                        </NavLink>
                        <NavLink to={'/location'}>
                            <button className='success'>
                                Next
                            </button>
                        </NavLink>
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
        </main >
    );
}

export default OrderComplete;
