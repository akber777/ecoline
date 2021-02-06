import React, { useState } from 'react';


// reactstrap
import { Container } from 'reactstrap';

// scss
import './css/_contact.scss';


// components
import WhyUs from '../whyUs/whyUs';


// query
import { useQuery, useMutation } from 'react-query';

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


    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [phone, setPhone] = useState(null);
    const [content, setContent] = useState(null);


    let params = {
        name: name,
        surname: surname,
        phone: phone,
        content: content

    }

    let mutation = useMutation(form => axios.post(baseUrl + 'contact', params))


    return (
        <main className='contact'>
            <Container>
                <div className="container">
                    <h1>ƏLAQƏ</h1>
                    <div id="contact" action="" method="post">
                        <fieldset>
                            <input placeholder="Ad" type="text" tabIndex="1" required autofocus
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                            />
                        </fieldset>
                        <fieldset>
                            <input placeholder="Soyad" type="email" tabIndex="2" required
                                onChange={(event) => {
                                    setSurname(event.target.value)
                                }}
                            />
                        </fieldset>
                        <fieldset>
                            <input placeholder="Nömrə" type="tel" tabIndex="3" required
                                onChange={(event) => {
                                    setPhone(event.target.value)
                                }}
                            />
                        </fieldset>
                        <fieldset>
                            <textarea placeholder="Mesajınız...." tabIndex="5" required
                                onChange={(event) => {
                                    setContent(event.target.value)
                                }}
                            ></textarea>
                        </fieldset>
                        <fieldset>
                            <button type="submit" id="contact-submit" data-submit="...Sending"
                                onClick={() => {
                                    mutation.mutate(params)
                                }}

                            >Gonder</button>
                        </fieldset>
                    </div>
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
