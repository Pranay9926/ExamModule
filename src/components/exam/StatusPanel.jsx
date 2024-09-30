import React from 'react';
import { Box, Typography, Grid, Avatar, Button } from '@mui/material';

const StatusPanel = ({ questions, activeQuestion, onQuestionChange, onSubmitQuiz }) => {
    const answeredCount = questions.filter(q => q.answered && !q.markedForReview).length;
    const notAnsweredCount = questions.filter(q => !q.answered && q.visited).length;
    const markedForReviewCount = questions.filter(q => q.markedForReview && !q.answered).length;
    const answeredMarkedForReviewCount = questions.filter(q => q.answered && q.markedForReview).length;
    const notVisitedCount = questions.filter(q => !q.visited).length;

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", height: '100%' }}>
            {/* Question status */}
            <Box>
                <Box sx={{ mb: 2, p: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#22c55e' }}>Answered: {answeredCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#e53935' }}>Not Answered: {notAnsweredCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'purple' }}>Marked for Review: {markedForReviewCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#ff00ff' }}>Answered & Marked for Review: {answeredMarkedForReviewCount}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#878787' }}>Not Visited: {notVisitedCount}</Typography>
                </Box>

                {/* Question number grid */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 2 }}>
                    {questions.map((question) => (
                        <Box key={question.id} sx={{}} >
                            <Avatar
                                sx={{
                                    bgcolor: question.answered && question.markedForReview ? '#ff00ff'
                                        : question.answered ? '#22c55e'
                                            : question.markedForReview ? 'purple'
                                                : question.visited ? '#e53935' : '#e0e0e0',
                                    color: 'white',
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: '#f97316' }
                                }}
                                onClick={() => onQuestionChange(question.id)}
                            >
                                {question.id}
                            </Avatar>
                        </Box>
                    ))}
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
