import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import ExamScheduling from './ExamScheduling';

const BasicDetailsComponent = () => {
    return (
        <Box sx={{ p: 2 }}>
            {/* <Typography variant="h6">Basic Details Form</Typography>
            <TextField
                label="Exam Title"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Duration (in minutes)"
                type="number"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Additional Instructions"
                fullWidth
                margin="normal"
                multiline
                rows={4}
            /> */}
            <ExamScheduling />
        </Box>
    );
};

export default BasicDetailsComponent;
