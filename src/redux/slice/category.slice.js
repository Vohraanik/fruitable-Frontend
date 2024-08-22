import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import axios from 'axios'
import {  ECOMMERCE_URL } from '../../utils/baseUrl'
import axiosInstance from '../../utils/axiosInstance'

const initialState = {
    isLoading: false,
    category: [],
    error: null
}


export const getcategory = createAsyncThunk(
    'category/get',
    async (_,thunkAPI) => {
        try {
            const response = await axiosInstance.get("categories/list-categories");
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addcategory = createAsyncThunk(
    'category/add',
    async (data,thunkAPI) => {
        try {
            const response = await axiosInstance.post('categories/add-categories', data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }

)

export const editcategory = createAsyncThunk(
    'category/edit',
    async (data, thunkAPI) => {
        console.log(data);
        
        try {
            const response = await axiosInstance.put('categories/update-categories/' + data._id, data);
            console.log(response.data);
            
            return response.data
    
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deletecategory = createAsyncThunk(
    'category/delete',
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete('categories/delete-categories/' + id);
            return id
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getcategory.fulfilled, (state, action) => {
            state.category = action.payload.data
            state.isLoading = false;
        })
        
        builder.addCase(getcategory.rejected,(state,action)=>{
            state.error = action.payload
            state.isLoading = false;
        })

        builder.addCase(getcategory.pending,(state,action)=>{
            state.isLoading = true; 
            state.error = null           
        })


        builder.addCase(addcategory.fulfilled, (state, action) => {
            state.category = state.category.concat(action.payload.data)
            state.isLoading = false;
        })

        builder.addCase(addcategory.rejected,(state,action)=>{
            state.error = action.payload
            state.isLoading = false;
        })

        builder.addCase(addcategory.pending,(state,action)=>{
            state.isLoading = true; 
            state.error = null           
        })

        builder.addCase(editcategory.fulfilled, (state, action) => {
            console.log(action.payload);
            
            state.category = state.category.map((v) => {
                if (v._id === action.payload.data._id) {
                    return action.payload.data;
                } else {
                    return v;
                }
            })
            state.isLoading = false;
            state.isLoading = false;
        })

        builder.addCase(editcategory.rejected,(state,action)=>{
            state.error = action.payload
            state.isLoading = false;
        })

        builder.addCase(editcategory.pending,(state,action)=>{
            state.isLoading = true; 
            state.error = null           
        })

        builder.addCase(deletecategory.fulfilled,(state,action)=>{
            state.category = state.category.filter((v)=>v._id !== action.payload)
        })

        .addCase(deletecategory.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false;
        })

        builder.addCase(deletecategory.pending,(state,action)=>{
            state.isLoading = true; 
            state.error = null           
        })
    }
})
export default categorySlice.reducer;