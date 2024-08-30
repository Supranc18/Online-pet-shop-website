import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    setcart: (state,action) => {
      let oldvalue = state.value.find((el) => el._id==action.payload._id);
      if (oldvalue) {
        oldvalue.quantity = oldvalue.quantity+1
      } else {
        state.value.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    setLocalCart: (state,action)=>{
      state.value=action.payload
    },
    changeQuantity: (state,action)=>{
      let { _id, type } = action.payload;
      let matchedCartItem = state.value.find((el) => el._id == _id);
      if (type == "increment") {
        matchedCartItem.quantity += 1;
      }
      else if (type == "decrement") {
        if (matchedCartItem.quantity > 1) {
          matchedCartItem.quantity -= 1;
        }
      }
    }

  }
})



export const { setcart , setLocalCart, changeQuantity} = cartSlice.actions

export default cartSlice.reducer