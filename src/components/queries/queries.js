
// axios
import axios from 'axios';

// baseUrl
import { baseUrl } from '../api/api';

// include

import { category } from '../api/include';

export const homeSlider = async (key) => {

    const res = await axios.get(baseUrl + 'slider' + key.queryKey[1]);

    return res.data
}


export const categories = async (key) => {

    const res = await axios.get(baseUrl + `category?include=${category.toString()}` + key.queryKey[1]);

    return res.data
}



export const blogs = async (key) => {

    const res = await axios.get(baseUrl + `blog/` + key.queryKey[1]);

    return res.data
}



export const loginOrder = async (key) => {

    const res = await axios.get(baseUrl + `order/` + key.queryKey[1]);

    return res.data
}



export const user = async (key) => {

    const res = await axios.get(baseUrl + `user/` + key.queryKey[1]);

    return res.data
}