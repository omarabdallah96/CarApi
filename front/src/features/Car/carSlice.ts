// src/reducers/carReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, DeleteCar } from './CarActions';

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [], // Initialize with an empty array
    // ...other state properties
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      return action.payload; // Update the state with fetched cars
    });
    builder.addCase(DeleteCar.fulfilled, (state, action) => {
      console.log(
      state.cars = state.cars.filter((car:any) => car._id !== action.payload.data._id));


    })
  },
});

export default carSlice.reducer;
