
import { Helmet } from 'react-helmet';
import React from 'react';

// recoil
import { useRecoilValue } from 'recoil';

// atoms
import { titleHelmet } from '../atoms/atoms';

const HelmetApp = () => {


    let title = useRecoilValue(titleHelmet)


    return (
        <div className="application" >
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div >
    );
};


export default HelmetApp