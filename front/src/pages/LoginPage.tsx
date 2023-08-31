import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync, selectIsAuthenticated } from '../features/authSlice';



// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() : JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            username: data.get('email'),
            password: data.get('password'),
        }

        dispatch(loginAsync(body ))
            .then(() => {
                navigate('/home'); // Navigate to home upon successful login
            })
            .catch((error: any) => {
                console.error('Login error:', error);
                // Handle login error if needed
            });      //if authenticated

        //select user


    };

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }

    }, [isAuthenticated]);
    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="off"
                            autoFocus
                            defaultValue={'1'}
                        />
                        <TextField
                            defaultValue={'123456'}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="off"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
            </Container>
    );
}