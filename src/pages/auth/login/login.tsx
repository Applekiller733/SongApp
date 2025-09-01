import { useSelector } from "react-redux";
// import { updateUser, updateToken } from "../../stores/slices/currentuserslice";
import './login.css';
import { fetchUsers, selectAllUsers } from "../../../stores/slices/userdataslice";
import { updateCurrentUser } from "../../../stores/slices/userdataslice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { Box, Paper, Typography, TextField, Button, Backdrop, CircularProgress, Alert } from '@mui/material';
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from '../../../themes/themes';
import { Link } from "react-router";
import { useFormik } from 'formik';


export default function Login() {
    const users = useSelector(selectAllUsers);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState('init');

    useEffect(() => {
        // dispatch(fetchUsers());

        //   userstore.subscribe(() => {
        //       localStorage.setItem('token', JSON.stringify(userstore.getState().currentuser.token)),
        //           localStorage.setItem('currentuser', JSON.stringify(userstore.getState().currentuser.user))
        //   });

    }, [])


    function handleSubmit(username: string, password: string) {
        // let username = 
        // e.preventDefault();
        // let form = e.currentTarget;
        // let username = (form.elements.namedItem('username') as HTMLInputElement).value as string;
        // let password = (form.elements.namedItem('password') as HTMLInputElement).value as string;
       
        // setStatus('loading');
        // if (checkCredentials(username, password)) {
        //     console.log('logged in');
        //     dispatch(updateCurrentUser({
        //         id: '4',
        //         username: username,
        //         password: password,
        //     }));
        //     // dispatch(updateToken('FAJFAHFJAJFJJHFHAJFHAJFHA'));
        //     setTimeout(() => setStatus('successful'), 300);
        // }
        // else {
        //     console.log(`login failed`);
        //     setStatus('failed');
        // }
    }

    // function checkCredentials(username: string, password: string) {
    //     if (users.find(u => u.username === username && u.password === password) !== undefined) {
    //         return true;
    //     }
    //     return false;
    // }

    const LoginFormik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        //validation schema?
        onSubmit: (values) => { handleSubmit(values.username, values.password) }
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <Box className="login-page">
                <Paper elevation={6} className="login-card">
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={LoginFormik.handleSubmit}>
                        <TextField
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className="field"
                            value={LoginFormik.values.username}
                            onChange={LoginFormik.handleChange}
                            error={LoginFormik.touched.username && Boolean(LoginFormik.errors.username)}
                            helperText={LoginFormik.touched.username && LoginFormik.errors.username}
                        ></TextField>

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className="field"
                            value={LoginFormik.values.password}
                            onChange={LoginFormik.handleChange}
                            error={LoginFormik.touched.password && Boolean(LoginFormik.errors.password)}
                            helperText={LoginFormik.touched.password && LoginFormik.errors.password}
                        ></TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="login-button"
                        >
                            Login
                        </Button>
                    </form>
                    <Link to='../'>Forgot your password? Reset it here</Link>
                    <Link to='../signup'>Not yet registered? Create an account here</Link>
                </Paper>
                {status === 'successful' && <Alert severity="success">
                    Successful Login.
                </Alert>}
                {status === 'failed' && <Alert severity="error">
                    Login failed. Invalid credentials.
                </Alert>}
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={status === 'loading'}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </ThemeProvider>
    );
}