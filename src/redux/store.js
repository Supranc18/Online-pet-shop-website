import { configureStore } from '@reduxjs/toolkit'
import userReducer  from './slice/userSlice'
import productSlice from './slice/productSlice'
import cartReducer from './slice/cartSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    product:productSlice,
    cart: cartReducer,

  },
})
