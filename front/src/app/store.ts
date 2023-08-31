// frontend/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import carsReducer from '../features/Car/carSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer
  },
});

export default store;

