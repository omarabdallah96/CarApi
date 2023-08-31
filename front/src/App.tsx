// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import store from './app/store';
import HomePage from './pages/HomePage';
import CreateCar from './pages/CreateCar';

import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div style={{ display: 'flex' }}>
            <Sidebar />

            <div style={{ flex: 1, padding: '20px', marginLeft: '150px' }}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/add-car" element={<ProtectedRoute><CreateCar /> </ProtectedRoute>} />
                <Route path="/edit-car/:carId" element={<ProtectedRoute><CreateCar /> </ProtectedRoute>} />

              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
