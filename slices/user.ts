import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { config } from 'config'
import { User } from 'interfaces/User'
import axios from 'libs/axios'

interface UserState {
  user: User | undefined
}

const initialState: UserState = { user: undefined }

export const getUser = createAsyncThunk<User>('user/getUser', async () => {
  const { data } = await axios.get<User>(config.login.GET_me)
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled.type, (state, action: PayloadAction<User>) => {
      state.user = action.payload
    })
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
