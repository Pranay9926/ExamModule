import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { useGetReviewAnswerSheetMutation } from '../../store/service/user/UserService';

const ResultStatus = ({ onSubmitQuiz }) => {
    const [getReviewAnswerSheet] = useGetReviewAnswerSheetMutation();
    const [reviewData, setReviewData] = useState();
    const userDetails = JSON.parse(localStorage.getItem('userdetails'));

    const profile = {
        name: userDetails?.name,
        img: userDetails?.avatar_url, // Placeholder image
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const resultData = await getReviewAnswerSheet();
            setReviewData(resultData);
            console.log(resultData?.data?.data?.id, 'resultData11')
        } catch (e) {
            console.log(e)
        }
    }


    const statusSummary = {
        answered: { id: 6, label: "Correct", color: "#22c55e", borderRadius: "6px" },
        notVisited: { id: 0, label: "Unattempted", color: "#878787", borderRadius: "6px" },
        notAnswered: { id: 4, label: "Incorrect", color: "#c11e1b", borderRadius: "6px" },
    };

    // const profile = {
    //     name: "Vamsi Kumar",
    //     img: '', // Placeholder image
    // };

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
            {/* Question status summary */}
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
                <Box sx={{ mb: { xs: 3, md: 3, xl: 10, }, p: 2, display: 'flex', flexWrap: 'wrap', gap: { xl: '20px', md: '16px', xs: '8px' } }}>
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
                                {status.id}
                            </Avatar>
                            <Typography variant="subtitle2" sx={{ color: '#333', fontWeight: 'bold' }}>
                                {status.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Question number grid */}
                <Box sx={{
                    padding: '8px', height: { xl: '63vh', lg: '63vh', md: '52vh', xs: '60vh' }, overflowY: 'auto',
                    '@media (min-width: 599px) and (max-width: 763px)': {
                        height: '52vh', // change height for this range
                    },
                }}>
                    <Box sx={{ display: "flex", fontWeight: '700', justifyContent: 'space-around', mb: '6px' }}>
                        <Box>Q.No.</Box>
                        <Box>Type</Box>
                        <Box>Mark</Box>
                    </Box>
                    <Box sx={{ borderTop: '1px solid #00000024', mt: '10px' }}>
                        {reviewData && reviewData?.data?.data?.map((question, index) => (
                            <Box key={question.id} sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px', borderBottom: '1px solid #00000018', alignItems: 'center' }}>
                                <Avatar
                                    sx={{
                                        bgcolor: question.mark > 0 ? '#22c55e' : '#c11e1b',
                                        borderRadius: '6px',
                                        width: 35,
                                        height: 35,
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    }}

                                >
                                    {index + 1}

                                </Avatar>
                                {/* Type and Result */}
                                <Box sx={{ textAlign: 'center', display: 'grid' }}>
                                    <Typography variant="subtitle2" sx={{ color: '#333', fontWeight: 'bold' }}>
                                        {question.type}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#595454' }}>
                                        {question.questionStatus}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#595454' }}>
                                        Max. Marks: {question.maxMarks}
                                    </Typography>
                                </Box>
                                {/* Marks Button with Square Border */}
                                <Button
                                    variant="outlined"
                                    sx={{
                                        minWidth: 60,
                                        height: 35,
                                        border: '1px solid #00000094',
                                        borderRadius: '4px',
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}

                                >
                                    {question.obtainedMarks == null ? 0 : question.obtainedMarks}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Submit button */}

            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, borderTop: '2px solid #00000018' }}>
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

export default ResultStatus;

