import { create } from "zustand";
import API from "../../../api/axios.js";

export const pollStore=create((set)=>({
    poll:[],

    getPoll:async()=>{

        try {
            const res=await API.get('/poll/get')
            set({poll:res.data.poll})
        } catch (error) {
            
        }

    }
}))