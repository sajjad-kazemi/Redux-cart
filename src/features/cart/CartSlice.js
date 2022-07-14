import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from "axios"

const url =  '//course-api.com/react-useReducer-cart-project'


const initialState={
  cartItems:[],
  amount:4,
  total:0,
  isLoading:true
}


export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async ()=>{
    // return fetch(url).then(resp => resp.json().catch((er)=>console.error(er)))
    try {
      const resp = await axios.get(url)
      return resp.data
    } catch (err) {
      return thunkAPI.rejectWithValue('something went wrong!')
    }
  })

const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    clearCart: (state)=>{
      state.cartItems =[]
    },
    removeItem: (state,{payload})=>{
      state.cartItems = state.cartItems.filter(item => item.id !== payload)
      state.amount -= 1
    },
    increase:(state,{payload})=>{
      state.cartItems.find(item => item.id=== payload).amount+= 1
      state.total += +state.cartItems.find(item => item.id=== payload).price,2
    },
    decrease:(state,{payload})=>{
      state.cartItems.find(item => item.id=== payload).amount = ((amount)=>{
        if(amount>=1){
          return amount - 1
        }
        return amount
      }
      )(state.cartItems.find(item => item.id=== payload).amount);

      if(state.cartItems.find(item=>item.id===payload).amount>0){
        state.total -= +state.cartItems.find(item => item.id=== payload).price,2
      }
    },
    calculateTotal:(state)=>{
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount,2;
        total += item.amount * item.price,2;
      });
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers:{
    [getCartItems.pending]:(state)=>{
      state.isLoading = true
    },
    [getCartItems.fulfilled]:(state,action)=>{
      state.cartItems = action.payload
      state.isLoading = false
    },
    [getCartItems.rejected]:(state)=>{
      state.isLoading = false
    }
  }
});
export const  {clearCart,removeItem,increase,decrease,calculateTotal} = cartSlice.actions;
export default cartSlice.reducer;