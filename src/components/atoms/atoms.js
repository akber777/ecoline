
import {
    atom
} from 'recoil';



export let basket = atom({
    key: 'myBasket',
    default: []
})



export let myTab = atom({
    key: 'myTabEvent',
    default: null
})


export let order = atom({
    key: 'myOrder',
    default: null
})


export let error = atom({
    key: 'error',
    default: null
})


export let mapCoor = atom({
    key: 'mapCoordinates',
    default: null
})


export let titleHelmet = atom({
    key: 'titleHelmet',
    default: null
})


export let orderstatus = atom({
    key: 'orderstatus',
    default: null
})


export let orderTotal = atom({
    key: 'orderTotal',
    default: null
})