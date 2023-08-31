// carActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import carApi from '../../api/carsApi';

export const fetchCars = createAsyncThunk('cars/fetchCars', async (page: number) => {
    const response = await carApi.getCars(page);
    return response.data;
});

export const createCar = createAsyncThunk('cars/createCar', async (car) => {
    const response = await carApi.createCar(car);
    return response.data;
});
//deleteCar
export const DeleteCar = createAsyncThunk('cars/Delete', async (car) => {
    const response = await carApi.deleteCar(car);
    return response.data;
});

export const updateCar = createAsyncThunk('cars/updateCar', async (car) => {
    const response = await carApi.updateCar(car._id, car);
    return response.data;
})



// Add similar action for updating a car
