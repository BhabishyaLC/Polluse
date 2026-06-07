import {create} from 'zustand'
import API from '../../../api/axios.js'

export const userStore=create((set)=>({
    user:null,

    getUser:async()=>{
        try {
            const res=await API.get('/me')

            set({user:res.data.user})
            console.log(res.data.user)
        } catch (error) {
            set({user:null})
        }
    }
}))