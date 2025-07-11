import {atom} from 'recoil'

export const sidebarOpenState = atom({
    key:'sidebarOpenState',
    default:false,
})


export const amountState = atom({
    key: 'amountState',
    default : 0
})

export const transactionState = atom({
    key: 'transaction',
    default:[]
})