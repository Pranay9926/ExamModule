import React from 'react';
import { Box, Button, Typography, Stack, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const QuitConfirmation = ({ setQuitConfirmation, setIsSubmission, setIsSubmit }) => {
    const handleQuit = () => {
        setQuitConfirmation(false)
        setIsSubmission(false)
        setIsSubmit(true)
    }
    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#f4f5f7',
                px: 2
            }}
        >



            {/* Quit Confirmation Content */}
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 600,
                    width: '100%',
                    padding: '30px',
                    textAlign: 'center'
                }}
            >
                <ErrorOutlineIcon sx={{ fontSize: 50, color: '#f44336', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                    Quitting will automatically submit the assessment.
                </Typography>
                <Typography variant="body1" mb={4}>
                    Do you really want to quit?
                </Typography>

                {/* Buttons for Quit and Go Back */}
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <Button variant="contained" color="error" onClick={handleQuit} >
                        Quit
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => setQuitConfirmation(false)}>
                        No, Go Back To Quiz
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default QuitConfirmation;

