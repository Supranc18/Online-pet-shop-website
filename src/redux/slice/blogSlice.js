
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: ([]),
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
  
    setblog: (state, action) => {
  state.value.push(action.payload);
},
  },
})

export const { setblog } = blogSlice.actions

export default blogSlice.reducer