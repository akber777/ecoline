import React from 'react';


// reactstrap
import { Container } from 'reactstrap';

// scss
import './css/_contact.scss';


// components
import WhyUs from '../whyUs/whyUs';


// query
import { useQuery } from 'react-query';

// baseUrl
import { baseUrl } from '../../api/api';

// axios
import axios from 'axios';

// map
import MapContainer from '../map/map';


const Contact = () => {




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
        <main className='contact'>
            <Container>
                <div class="container">
                    <h1>ƏLAQƏ</h1>
                    <form id="contact" action="" method="post">
                        <fieldset>
                            <input placeholder="Ad" type="text" tabindex="1" required autofocus />
                        </fieldset>
                        <fieldset>
                            <input placeholder="Soyad" type="email" tabindex="2" required />
                        </fieldset>
                        <fieldset>
                            <input placeholder="Nömrə" type="tel" tabindex="3" required />
                        </fieldset>
                        <fieldset>
                            <textarea placeholder="Mesajınız...." tabindex="5" required></textarea>
                        </fieldset>
                        <fieldset>
                            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Gonder</button>
                        </fieldset>
                    </form>
                </div>
            </Container>
            <WhyUs />
            <div id='map'>
                {
                    settings.isLoading === false && (
                        <MapContainer locations={locate} />
                    )
                }
            </div>
        </main >
    );
}

export default Contact;
