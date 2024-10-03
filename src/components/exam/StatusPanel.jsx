import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import Grid from '@mui/material/Grid'; // Use the standard Grid for layout

const StatusPanel = ({ questions, activeQuestion, onQuestionChange, onSubmitQuiz }) => {
    const answeredCount = questions.filter(q => q.answered && !q.markedForReview).length;
    const notAnsweredCount = questions.filter(q => !q.answered && q.visited).length;
    const markedForReviewCount = questions.filter(q => q.markedForReview && !q.answered).length;
    const answeredMarkedForReviewCount = questions.filter(q => q.answered && q.markedForReview).length;
    const notVisitedCount = questions.filter(q => !q.visited).length;

    const statusSummary = {
        answered: { id: 1, label: "Answered", count: answeredCount, color: "#22c55e", borderRadius: "0 0 20px 20px" },
        notAnswered: { id: 2, label: "Not Answered", count: notAnsweredCount, color: "#c11e1b", borderRadius: "20px 20px 0px 0px" },
        markedForReview: { id: 3, label: "Marked for Review", count: markedForReviewCount, color: "#ab00ab", borderRadius: "13px" },
        answeredMarkedForReview: { id: 4, label: "Answered & Marked for Review", count: answeredMarkedForReviewCount, color: "#ab00ab", borderRadius: "13px" },
        notVisited: { id: 5, label: "Not Visited", count: notVisitedCount, color: "#878787", borderRadius: "6px" }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", height: '100%' }}>
            {/* Question status summary */}
            <Box>
                <Box sx={{ mb: 2, p: 2 }}>
                    {Object.entries(statusSummary).map(([key, status]) => (
                        <Box
                            key={key}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1.5, // Margin for spacing between items
                                position: 'relative'
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: status.color,
                                    borderRadius: status.borderRadius,
                                    width: 30, // Size for the circle
                                    height: 30,
                                    mr: 1, // Space between circle and text
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {status.count}
                            </Avatar>
                            {status.id === 4 && <Box
                                sx={{
                                    position: 'absolute',
                                    top: -3,
                                    left: 3,
                                    width: 11,
                                    height: 20,
                                    backgroundColor: '#25e32ef0',
                                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 44%, 0 70%) '// Green triangle for answered & marked
                                }}
                            />}
                            <Typography variant="subtitle2" sx={{ color: '#333', fontWeight: 'bold' }}>
                                {status.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                {/* {/ Question number grid /} */}
                <Box sx={{ px: 2, mt: 4 }}>
                    <Grid container spacing={1}>
                        {questions.map((question) => (
                            <Grid item xs={2.2} key={question.id}>
                                <Box sx={{ position: 'relative', display: 'flex', gap: 8 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: question.answered && question.markedForReview ? '#ab00ab'
                                                : question.answered ? '#22c55e'
                                                    : question.markedForReview ? '#ab00ab'
                                                        : question.visited ? '#c11e1b' : '#e0e0e0',
                                            color: 'white',
                                            cursor: 'pointer',
                                            borderRadius: question.answered && question.markedForReview ? '16px'
                                                : question.answered ? '0 0 20px 20px'
                                                    : question.markedForReview ? '16px'
                                                        : question.visited ? '20px 20px 0 0' : '6px',
                                            width: 35, // Ensure size matches the image example
                                            height: 35, // Ensure size matches the image example
                                            '&:hover': { bgcolor: '#f97316' }
                                        }}
                                        onClick={() => onQuestionChange(question.id)}
                                    >
                                        {question.id}
                                    </Avatar>

                                    {/* Small triangle icon for "Answered & Marked for Review" */}
                                    {question.answered && question.markedForReview && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -4,
                                                left: 3,
                                                width: 11,
                                                height: 23,
                                                backgroundColor: '#25e32ef0',
                                                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 44%, 0 70%) '// Green triangle for answered & marked
                                            }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* Submit button */}
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