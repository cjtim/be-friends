import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { config } from 'config'
import { Pet } from 'interfaces/Pet'
import axios from 'libs/axios'

interface PetState {
  pet?: Pet
  pets: Pet[]
}

const initialState: PetState = {
  pets: [],
}

export const getPets = createAsyncThunk<Pet[]>('pet/getPets', async () => {
  const { data } = await axios.get<Pet[]>(config.pet.GET_list)
  return data
})

export const getPetById = createAsyncThunk('pet/getPetById', async (petId: string) => {
  const { data } = await axios.get<Pet>(config.pet.GET_details.replace(':pet_id', petId))
  return data
})

const userSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPets.fulfilled.type, (state, action: PayloadAction<Pet[]>) => {
        state.pets = action.payload
      })
      .addCase(getPetById.fulfilled.type, (state, action: PayloadAction<Pet>) => {
        state.pet = action.payload
      })
  },
})

export const {} = userSlice.actions
export default userSlice.reducer
