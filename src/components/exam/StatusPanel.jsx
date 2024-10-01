import React from 'react';
import { Box, Typography, Grid2, Avatar, Button } from '@mui/material';




const StatusPanel = ({ questions, activeQuestion, onQuestionChange, onSubmitQuiz }) => {
    const answeredCount = questions.filter(q => q.answered && !q.markedForReview).length;
    const notAnsweredCount = questions.filter(q => !q.answered && q.visited).length;
    const markedForReviewCount = questions.filter(q => q.markedForReview && !q.answered).length;
    const answeredMarkedForReviewCount = questions.filter(q => q.answered && q.markedForReview).length;
    const notVisitedCount = questions.filter(q => !q.visited).length;

    const statusSummary = {
        answered: { label: "Answered", count: answeredCount, color: "#22c55e" },
        notAnswered: { label: "Not Answered", count: notAnsweredCount, color: "#e53935" },
        markedForReview: { label: "Marked for Review", count: markedForReviewCount, color: "purple" },
        answeredMarkedForReview: { label: "Answered & Marked for Review", count: answeredMarkedForReviewCount, color: "#ff00ff" },
        notVisited: { label: "Not Visited", count: notVisitedCount, color: "#878787" }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", height: '100%' }}>
            {/* Question status */}
            <Box>
                {/* <Box sx={{ mb: 2, p: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#22c55e' }}>Answered: {answeredCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#e53935' }}>Not Answered: {notAnsweredCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'purple' }}>Marked for Review: {markedForReviewCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#ff00ff' }}>Answered & Marked for Review: {answeredMarkedForReviewCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#878787' }}>Not Visited: {notVisitedCount}</Typography>
                </Box> */}


                {/* <Box sx={{ mb: 2, p: 2 }}>
                    {Object.entries(statusSummary).map(([key, status]) => (
                        <Typography key={key} variant="subtitle1" sx={{ color: status.color }}>
                            {status.label}: {status.count}
                        </Typography>
                    ))}
                </Box> */}


                <Box sx={{ mb: 5, p: 2 }}>
                    {Object.entries(statusSummary).map(([key, status]) => (
                        <Box
                            key={key}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1.5 // Margin for spacing between items
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: status.color,
                                    width: 28, // Size for the circle
                                    height: 28,
                                    mr: 1, // Space between circle and text
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {status.count}
                            </Avatar>
                            <Typography variant="subtitle2" sx={{ color: '#333', fontWeight: 'bold' }}>
                                {status.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Question number grid */}
                <Box sx={{ px: 5 }}>
                    <Grid2 container spacing={1}>
                        {questions.map((question) => (
                            <Grid2 item size={2.4} key={question.id}> {/* xs={2.4} ensures 5 items per row */}
                                <Avatar
                                    sx={{
                                        bgcolor: question.answered && question.markedForReview ? '#ff00ff'
                                            : question.answered ? '#22c55e'
                                                : question.markedForReview ? 'purple'
                                                    : question.visited ? '#e53935' : '#e0e0e0',
                                        color: 'white',
                                        cursor: 'pointer',
                                        width: 40, // Ensure size matches the image example
                                        height: 40, // Ensure size matches the image example
                                        '&:hover': { bgcolor: '#f97316' }
                                    }}
                                    onClick={() => onQuestionChange(question.id)}
                                >
                                    {question.id}
                                </Avatar>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>


            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    sx={{ borderRadius: '20px', bgcolor: '#22c55e', px: 4 }}
                    onClick={onSubmitQuiz}
                >
                    Submit Quiz
                </Button>
            </Box>
        </Box>
    );
};

export default StatusPanel;
