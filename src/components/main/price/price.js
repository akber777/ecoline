import React, { useLayoutEffect } from 'react';



// tools

// rectstrap
import { Col, Container, Row } from 'reactstrap';

// react router dom
import { NavLink } from 'react-router-dom';

// aos
import AOS from 'aos';
import "aos/dist/aos.css";

// propTypes
import PropTypes from 'prop-types';

// tabs
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

// atoms
import { myTab } from '../../atoms/atoms';

// recoil
import {
    useRecoilState,
} from 'recoil';

// jquery

import $ from 'jquery';


const Price = React.memo(function Price({
    ...props
}) {

    useLayoutEffect(() => {
        AOS.init({
            duration: 2000
        });

    }, []);


    let { data } = props.data


    let [tabKey, setTabKey] = useRecoilState(myTab)


    useLayoutEffect(() => {

        $('.nav-tabs > a').click(function () {

            let eventKey = $(this).attr('data-rb-event-key');

            setTabKey(eventKey)

        })


    }, [data])


    return (
        <div className='home__price' data-aos="fade-up">
            <Container>
                <div className='home__priceContent'>
                    <h4 className='title'>QİYMƏTLƏR VƏ ONLINE SİFARİŞ</h4>
                </div>
                <div className='home__priceBox '>
                    <Tabs defaultActiveKey={tabKey !== null ? tabKey : data[0].name} transition={false} id="noanim-tab-example">
                        {
                            data.map(item => (
                                <Tab eventKey={item.name} title={item.name} key={item.id} >
                                    <Row>
                                        {
                                            item.products.data.map(pro => (
                                                <Col lg='6' className='p-0' key={pro.id}>
                                                    <NavLink to={'/order/' + pro.slug}>
                                                        <div className='home__priceBox--item'>
                                                            <div className='layout'>
                                                                <img src={require('../../images/layer.png').default} alt='' />
                                                            </div>
                                                            <img src={require('../../images/item.png').default} alt='' />
                                                            <h4>
                                                                {
                                                                    pro.name
                                                                }
                                                                <strong>
                                                                    {
                                                                        parseInt(pro.price) + '% ENDİRİM'
                                                                    }
                                                                </strong>
                                                            </h4>
                                                        </div>
                                                    </NavLink>
                                                </Col>
                                            ))
                                        }
                                    </Row >
                                </Tab>
                            ))
                        }
                    </Tabs>
                </div>
            </Container>
        </div>
    );
})


Price.propTypes = {
    data: PropTypes.object.isRequired
}

export default Price;
