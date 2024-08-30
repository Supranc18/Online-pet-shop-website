
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  
    setuser: (state,action) => {
      state.value =action.payload
    },
  
  },
})

export const { setuser } = userSlice.actions

export default userSlice.reducer