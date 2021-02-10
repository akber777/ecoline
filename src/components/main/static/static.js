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
                        Məqsədimiz təmizlik sektorunda ehtiyacınız olan bütün xidmətləri Sizə yüksək keyfiyyətlə təqdim etməkdir. Çünki keyfiyyətli xidmət əldə etmək hər bir kəsin haqqıdır. Buna nail olmaq üçün dörd əsas amilləri özümüzdə hər daim inkişaf etdiririk:

                        Texnologiya - Bu sektorda olan tanınmış və son texnologiya avadanlıqlarını əldə etməklə işə başlamaq və davamındada bu avadanlıqların inkişaf proseslərini, yenilənməsini və proqreslərini müntəzəm olaraq tətbiq etməyi prioritetimiz olaraq təyin etdik. Bunun sayəsində də Sizin bizə etibar etdiyiniz məhsullara diqqətlə yanaşaraq onları qorumağa çalışırıq.

                        Təmizlik - Qayğı ilə yanaşdığınız əşyalarınızın gigiyenik qaydalara uyğun olaraq, bütün ləkələrdən təmizlənmiş halda və mükəmməl şəkildə paketləşdirilərək Sizə təqdim olunması uğurlu olmağımız üçün əsas göstəricilərdəndir.

                        Keyfiyyət - Daimliyini şərt olaraq təyin etdiyimiz “keyfiyyət siyasətimizin" hər mərhələsini müntəzəm olaraq yoxlama nəticəsində hər zaman zirvədə tuta bilmək hədəflərimizin ən vacibidir.

                        Təqdimat - Fərah və ürək açan məkan, gülərüz personal, müştəriyə fərdi yanaşma, sərfəli qiymətlər və mütəmadi kompaniyalar, çatdırılma xidməti, zəmanət və müştərilərimizin məmnuyyətini və rahatlığını təmin edə biləcək digər yanaşmalar hər an diqqət mərkəzimizdədir.

                        Bizi seçdiyiniz üçün Sizə minnətdarıq!

                        EcoLine - Təmizliyə Sevgi Qatdıq!
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
