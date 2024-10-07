import React from 'react';
import { Box, Typography, Avatar, Button, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const ResultComponent = ({ result }) => {
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
        questionsAttempted: 29,
        questionsSkipped: 1,
        answeredCorrect: 6,
        answeredWrong: 4
    };

    const finalResult = result || mockResult;

    const summaryData = [
        { label: 'Marks Scored', value: finalResult.marksScored },
        { label: 'Percentage', value: finalResult.percentage },
        // { label: 'Grade', value: finalResult.grade },
        { label: 'Accuracy', value: finalResult.accuracy }
    ];

    const questionSummary = [
        { label: 'Questions Attempted', value: finalResult.questionsAttempted, icon: <RadioButtonUncheckedIcon sx={{ border: '4px solid #80808030' }} />, color: '#a8a8a8' },
        { label: 'Questions Skipped', value: finalResult.questionsSkipped, icon: <RadioButtonUncheckedIcon sx={{ border: '4px solid #80808030' }} />, color: '#a8a8a8' },
        { label: 'Answered Correct', value: finalResult.answeredCorrect, icon: <CheckCircleOutlineIcon sx={{ border: '4px solid green' }} />, color: 'green' },
        { label: 'Answered Wrong', value: finalResult.answeredWrong, icon: <CancelIcon sx={{ border: '4px solid red' }} />, color: 'red' }
    ];

    return (
        <Box sx={{ width: '100%', height: { xl: '94vh', lg: '94vh', md: '93vh', xs: '93vh' }, overflow: 'auto', mx: 'auto', px: 2.5, py: { xs: 1, md: '22px' }, bgcolor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '80%' }, height: '100%' }}>

                {/* Quiz Submitted Confirmation Section */}
                <Box sx={{ display: { xs: 'grid', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center', mb: 2, border: '1px solid #e0e0e0', py: 2, px: { xs: 2, md: 4 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Quiz Submitted  <CheckCircleIcon sx={{ color: 'green', fontSize: 25 }} />
                        </Typography>
                        <Typography variant="h8" sx={{ fontSize: 15 }}>
                            Your Quiz have been submitted
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography>Name:</Typography>
                        <strong>{finalResult.name}</strong>
                        <Typography>Attempt ID: </Typography>
                        <strong>{finalResult.attemptId}</strong>
                    </Box>
                </Box>

                {/* Marks and Performance Summary */}
                <Box sx={{ border: '1px solid #e0e0e0', mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3, py: 2, px: 4, flexWrap: 'wrap', gap: '13px' }}>
                        {summaryData.map((item, index) => (
                            <Box key={index} sx={{ textAlign: 'center' }}>
                                <Typography variant="h7" sx={{ fontWeight: '700', color: '#2f2c2c', fontSize: { xs: 13 } }}>{item.label}</Typography>
                                <Typography sx={{ fontSize: { md: 25, xs: 17 }, fontWeight: '600' }}>{item.value}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Divider />

                    {/* Time and Question Summary */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, px: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ fontSize: 22, mr: 1 }} />
                            <Typography sx={{ fontSize: { xs: '15px', md: '20px' } }}>Time Taken</Typography>
                        </Box>
                        <Typography>{finalResult.totalTimeTaken}</Typography>
                    </Box>

                    {/* Question Attempt Summary */}
                    <Box sx={{ borderTop: '1px solid #e0e0e0', py: 2, px: 2 }}>
                        {questionSummary.map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar sx={{ width: 20, height: 20, bgcolor: item.color, mr: 1 }}>{item.icon}</Avatar>
                                <Typography sx={{ flex: 1, color: item.color }}>{item.label}</Typography>
                                <Typography><strong>{item.value > 0 ? item.value : 'N/A'}</strong></Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Section Information */}
                <Box sx={{ pb: 2 }}>
                    <Box sx={{ border: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3, py: 2, px: 4, flexWrap: 'wrap', gap: '13px' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h7" sx={{ fontWeight: '700', color: 'gray', fontSize: { xs: 13 } }}>Section Name</Typography>
                                <Typography sx={{ fontSize: { md: 25, xs: 17 }, fontWeight: '600' }}>{finalResult.sectionName}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h7" sx={{ fontWeight: '700', color: 'gray', fontSize: { xs: 13 } }}>Section Marks</Typography>
                                <Typography sx={{ fontSize: { md: 25, xs: 17 }, fontWeight: '600' }}>{finalResult.sectionMarks}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h7" sx={{ fontWeight: '700', color: 'gray', fontSize: { xs: 13 } }}>Percentage</Typography>
                                <Typography sx={{ fontSize: { md: 25, xs: 17 }, fontWeight: '600' }}>{finalResult.percentage}</Typography>
                            </Box>
                        </Box>
                        <Divider />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, px: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ fontSize: 22, mr: 1 }} />
                                <Typography sx={{ fontSize: { xs: '15px', md: '20px' } }}>Time Taken</Typography>
                            </Box>
                            <Typography>{finalResult.totalTimeTaken}</Typography>
                        </Box>
                        {/* Question Attempt Summary */}
                        <Box sx={{ borderTop: '1px solid #e0e0e0', py: 2, px: 2 }}>
                            {questionSummary.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Avatar sx={{ width: 20, height: 20, bgcolor: item.color, mr: 1 }}>{item.icon}</Avatar>
                                    <Typography sx={{ flex: 1, color: item.color }}>{item.label}</Typography>
                                    <Typography><strong>{item.value > 0 ? item.value : 'N/A'}</strong></Typography>
                                </Box>
                            ))}
                        </Box>
                        {/* Review Questions Button */}
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' }, px: 4, py: 2 }}>
                            <Button variant="contained" color="warning" sx={{ p: { xs: '10px', md: '15px' }, fontSize: '12px' }}>
                                Review Questions
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default ResultComponent;
