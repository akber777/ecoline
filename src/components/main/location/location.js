import React from 'react';

// css
import "./css/_location.scss";

// tools

// rectstrap
import { Container, Button, Input } from 'reactstrap';

// react router dom
// import { NavLink } from 'react-router-dom';

// map

import Map from '../map/map';

// react router dom
import { NavLink, useHistory } from 'react-router-dom';


// modal
import Modal from 'react-bootstrap/Modal';

// query
import { useQuery } from 'react-query';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';

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


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ÜNVAN ƏLAVƏ ET
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type='text' />
                    <Button style={{ marginTop: 20 }}>Gonder</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }


    const [modalShow, setModalShow] = React.useState(false);

    return (
        <main className='location'>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
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
                    <div className='location__content'>
                        <div className='location__contentLeft'>
                            <p>
                                Ev ünvanım:
                            <span>
                                    Əliskəndər İskəndərov 3/3, Nəsimi Rayonu, 4-cü mikraryon, Bakı,
                            </span>
                            </p>
                            <p>
                                <img src={require('../../images/newPin.png').default} alt='' />
                            </p>
                        </div>
                        <div className='location__contentRight'>
                            <span>
                                SEÇ
                            </span>
                        </div>
                    </div>
                    <div className='location__content'>
                        <div className='location__contentLeft'>
                            <p>
                                Ev ünvanım:
                            <span>
                                    Əliskəndər İskəndərov 3/3, Nəsimi Rayonu, 4-cü mikraryon, Bakı,
                            </span>
                            </p>
                            <p>
                                <img src={require('../../images/newPin.png').default} alt='' />
                            </p>
                        </div>
                        <div className='location__contentRight'>
                            <span>
                                SEÇ
                            </span>
                        </div>
                    </div>
                    <div className='order__result'>
                        <button className='success' onClick={() => setModalShow(true)}>
                            ÜNVAN ƏLAVƏ ET
                        </button>

                        <div className='btnBoxs'>
                            <NavLink to={'/ordercomplete'}>
                                <button className='success'>
                                    Prev
                                </button>
                            </NavLink>
                            <NavLink to={'/payment'}>
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
