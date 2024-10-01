import React from 'react';
import { Box, Typography, Grid, Avatar, Button, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ResultComponent = ({ result }) => {
    // Mock data in case props aren't passed
    const mockResult = {
        name: 'Vamsi Kumar',
        attemptId: '442349',
        marksScored: '-0.50 / 15',
        percentage: '-3.33%',
        grade: '-',
        accuracy: '25%',
        sectionName: 'Part A',
        sectionMarks: '-0.5 / 15',
        sectionTime: '00:30:00',
        totalTimeTaken: '00:30:00',
        questionsAttempted: 4,
        questionsSkipped: 11,
        answeredCorrect: 1,
        answeredWrong: 3
    };

    const finalResult = result || mockResult;

    return (
        <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', my: 5, p: 3, bgcolor: 'white', boxShadow: 2, borderRadius: 2 }}>
            {/* Header Section */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon sx={{ color: 'green', fontSize: 32 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Quiz Submitted
                        </Typography>
                    </Box>
                    <Typography>Your Quiz has been submitted.</Typography>
                </Grid>
                <Grid item>
                    <Typography>Name: <strong>{finalResult.name}</strong></Typography>
                    <Typography>Attempt ID: <strong>{finalResult.attemptId}</strong></Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Score Summary */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                    <Typography variant="h6">Marks Scored</Typography>
                    <Typography>{finalResult.marksScored}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Percentage</Typography>
                    <Typography>{finalResult.percentage}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Grade</Typography>
                    <Typography>{finalResult.grade}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Accuracy</Typography>
                    <Typography>{finalResult.accuracy}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Section Information */}
            <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
                <Grid item>
                    <Typography variant="h6">Section Name</Typography>
                    <Typography>{finalResult.sectionName}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Section Marks</Typography>
                    <Typography>{finalResult.sectionMarks}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Section Time</Typography>
                    <Typography>{finalResult.sectionTime}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Time Taken and Question Summary */}
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTimeIcon sx={{ fontSize: 28, mr: 1 }} />
                        <Typography variant="h6">Time Taken</Typography>
                    </Box>
                    <Typography>{finalResult.totalTimeTaken}</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>Questions Attempted: <strong>{finalResult.questionsAttempted}</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Questions Skipped: <strong>{finalResult.questionsSkipped}</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ color: 'green' }}>Answered Correct: <strong>{finalResult.answeredCorrect}</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ color: 'red' }}>Answered Wrong: <strong>{finalResult.answeredWrong}</strong></Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Review Questions Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="warning" sx={{ px: 5, py: 1.5 }}>
                    Review Questions
                </Button>
            </Box>
        </Box>
    );
};

export default ResultComponent;
