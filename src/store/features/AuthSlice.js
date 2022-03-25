import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: !localStorage.getItem('token') ? false : true,
  profile: localStorage.getItem('profile'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setProfile: (state, action) => {
      state.username = action.payload
    },
  },
})

export const {setAuthenticated, setProfile} = authSlice.actions

export default authSlice.reducer
