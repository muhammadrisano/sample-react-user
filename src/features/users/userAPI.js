import axios from "axios"

export const fetchUserAPI = async (params)=>{
     const response = await  axios.get('https://randomuser.me/api/',{
            params:{
                ...params
            }})
    return response.data
}