// carApi.ts
import http from '../http/axiosApi';
const carApi = {
    getCars: (page: number) => http.get(`/cars?page=${page}`),
    createCar: (car: JSON) => http.post(`/cars`, car),
    deleteCar: (id: string) => http.delete(`/cars/${id}`),
    updateCar: (id: string, car: JSON) =>  http.put(`/cars/${id}`, car),
    // Add similar API calls for updating a car
};

export default carApi;
