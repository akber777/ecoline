
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
    ket: 'mapCoordinates',
    default: null
})