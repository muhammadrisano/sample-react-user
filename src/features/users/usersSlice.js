import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserAPI } from "./userAPI";


const initialState = {
    count: 0,
    users: [],
    isLoading: false,
    isError: false,
    message: ''
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', async(params, thunkAPI)=>{
    try {
       const res = await fetchUserAPI(params)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        increment(state){
            state.count++
        },
        decrement(state){
            state.count--
        }
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.isLoading = false
            state.users = action.payload.results
        })
        builder.addCase(fetchUsers.rejected, (state, action)=>{
            console.log(action.payload);
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {increment, decrement} = usersSlice.actions
export default usersSlice.reducer