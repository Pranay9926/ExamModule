import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import Grid from '@mui/material/Grid'; // Use the standard Grid for layout

const StatusPanel = ({ questions, activeQuestion, onQuestionChange, onSubmitQuiz }) => {
    const answeredCount = questions.filter(q => q.answered && !q.markedForReview).length;
    const notAnsweredCount = questions.filter(q => !q.answered && q.visited).length;
    const markedForReviewCount = questions.filter(q => q.markedForReview && !q.answered).length;
    const answeredMarkedForReviewCount = questions.filter(q => q.answered && q.markedForReview).length;
    const notVisitedCount = questions.filter(q => !q.visited).length;
    const userDetails = JSON.parse(localStorage.getItem('userdetails'));

    const profile = {
        name: userDetails?.name,
        avatarUrl: userDetails?.avatar_url,
    };

    const statusSummary = {
        answered: { id: 1, label: "Answered", count: answeredCount, color: "#22c55e", borderRadius: "0 0 20px 20px" },
        notAnswered: { id: 2, label: "Not Answered", count: notAnsweredCount, color: "#c11e1b", borderRadius: "20px 20px 0px 0px" },
        markedForReview: { id: 3, label: "Marked for Review", count: markedForReviewCount, color: "#ab00ab", borderRadius: "13px" },
        answeredMarkedForReview: { id: 4, label: "Answered & Marked for Review", count: answeredMarkedForReviewCount, color: "#ab00ab", borderRadius: "13px" },
        notVisited: { id: 5, label: "Not Visited", count: notVisitedCount, color: "#878787", borderRadius: "6px" }
    };


    const getInitials = (name) => {
        return name
            ? name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
            : '';
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", height: '100%' }}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: '16px', py: 1, borderBottom: '2px solid #ddd' }}>
                    {profile.img ? (
                        <Avatar src={profile.img} sx={{ width: "35px", height: '35px', mr: 2 }} />
                    ) : (
                        <Avatar sx={{ width: "40px", height: '40px', backgroundColor: '#f97316', mr: 2, fontSize: '18px', fontWeight: 'bold' }}>
                            {getInitials(profile.name)}
                        </Avatar>
                    )}
                    <Box >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {profile.name}
                        </Typography>
                    </Box>

                </Box>

                <Box sx={{ mb: 2, p: 2 }}>
                    {Object.entries(statusSummary).map(([key, status]) => (
                        <Box
                            key={key}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1.5,
                                position: 'relative'
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: status.color,
                                    borderRadius: status.borderRadius,
                                    width: 30,
                                    height: 30,
                                    mr: 1,
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {status.count}
                            </Avatar>
                            {status.id === 4 && <Box
                                sx={{
                                    position: 'absolute',
                                    top: { xs: 3, lg: -3, xl: -3 },
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

                    <Box sx={{ px: 2, mt: 7 }}>
                        <Grid container spacing={1} sx={{
                            gap: { md: '11px', xs: '4px', lg: '2px' }, '@media (min-width: 599px) and (max-width: 764px)': {
                                gap: '12px',
                            }, ml: '-20px'
                        }}>
                            {questions.map((question, index = 0) => (
                                <Grid item xs={2.2} key={question.id}>
                                    <Box sx={{
                                        position: 'relative', display: 'flex', gap: 8,
                                    }}>
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
                                                width: 35,
                                                height: 35,
                                                '&:hover': { bgcolor: '#f97316' }
                                            }}
                                            onClick={() => onQuestionChange(question.id)}
                                        >
                                            {index + 1}
                                        </Avatar>

                                        {question.answered && question.markedForReview && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: -4,
                                                    left: 3,
                                                    width: 11,
                                                    height: 23,
                                                    backgroundColor: '#25e32ef0',
                                                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 44%, 0 70%) '
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
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