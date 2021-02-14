import React from 'react';

// price
import Price from '../price/price';


// query
import { useQuery } from 'react-query';
import { categories } from '../../queries/queries';


const Services = () => {


    let category = useQuery(['category', ''], categories, {
        refetchOnWindowFocus: false
    })

    return (
        <main className='services'>
            <div className='home__priceContent'>
                <h4 className='title'>QİYMƏTLƏR VƏ ONLINE SİFARİŞ</h4>
            </div>
            {
                category.isLoading === false && (
                    <Price data={category.data} />
                )
            }
        </main>
    );
}

export default Services;
