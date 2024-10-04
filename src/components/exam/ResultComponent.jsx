// import React from 'react';
import { Box, Typography, Avatar, Button, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const ResultComponent = ({ result }) => {
    // Mock data in case props aren't passed
    const mockResult = {
        name: 'Vamsi Kumar',
        attemptId: '442349',
        marksScored: '4.00 / 10',
        percentage: '40%',
        grade: 'C',
        accuracy: '60%',
        sectionName: 'Part A',
        sectionMarks: '4 / 10',
        sectionTime: '00:30:00',
        totalTimeTaken: '00:24:46',
        questionsAttempted: 10,
        questionsSkipped: 0,
        answeredCorrect: 6,
        answeredWrong: 4
    };

    const finalResult = result || mockResult;

    return (
        <Box sx={{ width: '100%', height: `100%`, mx: 'auto', p: 5, bgcolor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: '80%', }}>

                {/* Quiz Submitted Confirmation Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, border: '1px solid #e0e0e0', py: 2, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, flexDirection: "column" }}>

                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Quiz Submitted  <CheckCircleIcon sx={{ color: 'green', fontSize: 25 }} />
                        </Typography>
                        <Typography variant="h8" sx={{ fontSize: 15 }}>
                            Your Quiz have been submitted
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>Name:</Typography>
                        <strong>{finalResult.name}</strong>
                        <Typography>Attempt ID: </Typography>
                        <strong>{finalResult.attemptId}</strong>
                    </Box>
                </Box>


                <Box sx={{ border: '1px solid #e0e0e0', }}>
                    {/* Marks and Performance Summary */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3, py: 2, px: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold', color: 'gray' }}>Marks Scored</Typography>
                            <Typography sx={{ fontSize: 30 }}>{finalResult.marksScored}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold', color: 'gray' }}>Percentage</Typography>
                            <Typography sx={{ fontSize: 30 }}>{finalResult.percentage}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold', color: 'gray' }}>Grade</Typography>
                            <Typography sx={{ fontSize: 30 }}>{finalResult.grade}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold', color: 'gray' }}>Accuracy</Typography>
                            <Typography sx={{ fontSize: 30 }}>{finalResult.accuracy}</Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Section Information */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3, py: 2, px: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold', color: 'gray' }}>Section Name</Typography>
                            <Typography sx={{ fontSize: 30 }}>{finalResult.sectionName}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold', color: 'gray' }}>Section Marks</Typography>
                            <Typography sx={{ fontSize: 30 }}>{finalResult.sectionMarks}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold', color: 'gray' }}>Section Time</Typography>
                            <Typography sx={{ fontSize: 30 }}>{finalResult.sectionTime}</Typography>
                        </Box>
                    </Box>

                    <Divider sx={{}} />

                    {/* Time and Question Summary */}
                    <Box sx={{ display: 'flex', justifyContent: "space-between", alignItem: 'center', py: 2, px: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ fontSize: 22, mr: 1 }} />
                            <Typography variant="h6" sx={{}}>Time Taken</Typography>
                        </Box>
                        <Typography>{finalResult.totalTimeTaken}</Typography>
                    </Box>

                    {/* Question Attempt Summary */}
                    <Box sx={{ borderTop: '1px solid #e0e0e0', py: 2, px: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ width: 20, height: 20, bgcolor: '#a8a8a8', mr: 1 }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 14 }} />
                            </Avatar>
                            <Typography sx={{ flex: 1 }}>Questions Attempted</Typography>
                            <Typography><strong>{finalResult.questionsAttempted}</strong></Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ width: 20, height: 20, bgcolor: '#a8a8a8', mr: 1 }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 14 }} />
                            </Avatar>
                            <Typography sx={{ flex: 1 }}>Questions Skipped</Typography>
                            <Typography><strong>{finalResult.questionsSkipped}</strong></Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ width: 20, height: 20, bgcolor: 'green', mr: 1 }}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
                            </Avatar>
                            <Typography sx={{ flex: 1, color: 'green' }}>Answered Correct</Typography>
                            <Typography><strong>{finalResult.answeredCorrect}</strong></Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 20, height: 20, bgcolor: 'red', mr: 1 }}>
                                <CancelIcon sx={{ fontSize: 14 }} />
                            </Avatar>
                            <Typography sx={{ flex: 1, color: 'red' }}>Answered Wrong</Typography>
                            <Typography><strong>{finalResult.answeredWrong}</strong></Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 0 }} />
                    {/* Review Questions Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'start', px: 4, py: 2 }}>
                        <Button variant="contained" color="warning" sx={{ px: 5, py: 1.5 }}>
                            Review Questions
                        </Button>
                    </Box>
                </Box>


            </Box>
        </Box>
    );
};

export default ResultComponent;
