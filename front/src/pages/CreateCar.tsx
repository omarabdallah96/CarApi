import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCar, updateCar } from '../features/Car/CarActions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  make: Yup.string().required('Make is required'),
  model: Yup.string().required('Model is required'),
  year: Yup.number()
    .typeError('Year must be a number')
    .required('Year is required'),
  color: Yup.string().required('Color is required'),
  mileage: Yup.number()
    .typeError('Mileage must be a number')
    .required('Mileage is required'),
});

const NewCarForm = () => {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const cars = useSelector((state) => state.cars.cars);

  // Find the car to edit or create an empty object for adding
  const carToEdit = carId
    ? cars.find((car) => car._id === carId)
    : {
        make: '',
        model: '',
        year: '',
        color: '',
        mileage: '',
      };

  const handleSubmit = (values) => {
    if (carId) {
      dispatch(updateCar({ carId, ...values }));
    } else {
      dispatch(createCar(values));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">{carId ? 'Edit' : 'Add a New'} Car</Typography>
      <Formik
        initialValues={carToEdit}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="make"
                  label="Make"
                  variant="outlined"
                  fullWidth
                  error={touched.make && !!errors.make}
                  helperText={touched.make && errors.make}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="model"
                  label="Model"
                  variant="outlined"
                  fullWidth
                  error={touched.model && !!errors.model}
                  helperText={touched.model && errors.model}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="year"
                  label="Year"
                  variant="outlined"
                  fullWidth
                  error={touched.year && !!errors.year}
                  helperText={touched.year && errors.year}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="color"
                  label="Color"
                  variant="outlined"
                  fullWidth
                  error={touched.color && !!errors.color}
                  helperText={touched.color && errors.color}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="mileage"
                  label="Mileage"
                  variant="outlined"
                  type="number"
                  fullWidth
                  error={touched.mileage && !!errors.mileage}
                  helperText={touched.mileage && errors.mileage}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} marginTop={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {carId ? 'Save Changes' : 'Add Car'}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewCarForm;
