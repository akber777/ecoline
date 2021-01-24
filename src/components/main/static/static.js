import React, { useLayoutEffect } from 'react';


// tools

// rectstrap
import { Container } from 'reactstrap';

// components
import WhyUs from '../whyUs/whyUs';
import News from '../news/news';
import Map from '../map/map';


// react router dom
import { useLocation } from 'react-router-dom';

const mapLocate = [
    ['<div><span>Gəncə</span><p>Gəncə şəhəri, Gəncə-Şəmkir şossesi 2-ci km.</p> <p>Tel: (044) 222 11 16</p> <p>İş saatları<br>Həftə içi günlər - 09:00-18:00<br>Şənbə günləri - 09:00-18:00<br>Bazar günləri - İşləmir</p></div>', 41.015137, 28.979530, 'Gəncə'],
];

const Static = () => {

    useLayoutEffect(() => {

        window.scrollTo({
            top: 0
        })

    })


    let pathname = useLocation().pathname.split('/')[useLocation().pathname.split('/').length - 1]


    function checkedurl(pathname) {

        if (pathname === 'rules') {

            return {
                name: 'Qaydalar',
                subname: 'SAYTDAN İSTİFADƏ QAYDALARI'
            }
        }


        if (pathname === 'aboutus') {

            return {
                name: 'HAQQIMIZDA',
                subname: 'HAQQIMIZDA'
            }
        }

        if (pathname === 'services') {

            return {
                name: 'XİDMƏTLƏR',
                subname: 'XİDMƏTLƏR'
            }
        }


        if (pathname === 'price') {

            return {
                name: 'QİYMƏTLƏR',
                subname: 'QİYMƏTLƏR'
            }
        }

        if (pathname === 'blog') {

            return {
                name: 'BLOG',
                subname: 'BLOG'
            }
        }

        if (pathname === 'contact') {

            return {
                name: 'ƏLAQƏ',
                subname: 'ƏLAQƏ'
            }
        }
    }



    return (
        <main className='rules'>
            <div className='rules__banner' style={{ backgroundImage: `url(${require('../../images/rules.png').default})` }}>
                {/* <img src={require('../../images/rules.png').default} alt='' /> */}
                <Container>
                    <h4 className='rules__title'>
                        {
                            checkedurl(pathname).name
                        }
                    </h4>
                </Container>
            </div>
            <div className='rules__content'>
                <Container>
                    <h4>
                        {
                            checkedurl(pathname).subname
                        }
                    </h4>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        </p>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        </p>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        </p>
                </Container>
            </div>
            <WhyUs />
            <News />
            <div id='map'>
                <Map locations={mapLocate} />
            </div>
        </main>
    );
}

export default Static;
