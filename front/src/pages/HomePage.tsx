import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/Car/carSlice';
import { fetchCars, DeleteCar } from '../features/Car/CarActions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Pagination } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const carsState = useSelector((state: RootState) => state.cars);
  const { cars, totalCount, totalPages } = carsState;
  const pageSize = 5; // Number of rows per page
  const pageCount = Math.ceil(cars.length / pageSize);
  useEffect(() => {
    dispatch(fetchCars(page));
  }, [dispatch, page]);
  const columns: GridColDef[] = [
    { field: 'make', headerName: 'Make', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'color', headerName: 'Color', width: 100 },
    { field: 'mileage', headerName: 'Mileage', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => {

            dispatch(DeleteCar(params.row._id))
          }}>
            <DeleteOutline

              style={{ color: 'red' }}
            />
          </Button>
          <Button onClick={() => { navigate(`/edit-car/${params.row._id}`) }}>
            <EditOutlined
              style={{ color: 'green' }}
            />
          </Button>
        </>


      ),
    },
  ];
  const handlePageChange = (params) => {
    setPage(params.page);
  };



  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={cars}
        // checkboxSelection={}
        columns={columns}
        getRowId={(row) => row._id}
        pagination
        initialState={{
          ...cars.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, newPage) => handlePageChange({ page: newPage })}
      />
    </div>
  );
};

export default HomeScreen;
