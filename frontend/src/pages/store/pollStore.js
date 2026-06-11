import { create } from "zustand";
import API from "../../../api/axios.js";

export const pollStore=create((set)=>({
    polls:[],

    getPoll:async()=>{

        try {
            const res=await API.get('/poll/get')
            set({polls:res.data.poll})
        } catch (error) {
            
        }

    }
}))