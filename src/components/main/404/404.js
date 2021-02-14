import React from 'react';

const NotFound = () => {
    return (
        <main className='notFound' style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={require('../../images/404.png').default} alt='' />
        </main>
    );
}

export default NotFound;
