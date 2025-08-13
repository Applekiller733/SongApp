import { darkTheme } from "../../themes/themes";
import { ThemeProvider } from "@emotion/react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router";
import './signup.css';

export default function Signup() {

    function handleSubmit() {
        console.log("Signup not implemented")
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Box className="signup-page">
                <Paper elevation={6} className="signup-card">
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign up
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className="field"
                        />

                        <TextField
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className="field"
                        />

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className="field"
                        />

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className="field"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="signup-button"
                        >
                            Sign up
                        </Button>
                        <Link to='../login'>Already have an account? Log in here</Link>
                    </form>
                </Paper>
                {/* {status === 'successful' && <Alert severity="success">
                    Successful Signup.
                </Alert>}
                {status === 'failed' && <Alert severity="error">
                    Signup failed. Invalid credentials.
                </Alert>} */}
                {/* <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={status === 'loading'}
                >
                    <CircularProgress color="inherit" />
                </Backdrop> */}
            </Box>
        </ThemeProvider>
    );
}