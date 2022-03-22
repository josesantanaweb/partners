import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: !localStorage.getItem('token') ? false : true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const {setAuthenticated} = authSlice.actions

export default authSlice.reducer
