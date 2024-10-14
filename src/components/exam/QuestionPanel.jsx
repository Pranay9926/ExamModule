import React, { useState, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import { useUploadExamQuestionsMutation } from '../../store/service/user/UserService';
import { useParams } from 'react-router-dom';

const QuestionPanel = ({ question, onAnswer, onNext, onMarkForReview, onClearResponse, totalQuestions, getSection, isReviewMode }) => {
    const [selectedOption, setSelectedOption] = useState(question?.selectedOption || null);
    const [loading, setLoading] = useState(false)
    const [UploadExamQuestions] = useUploadExamQuestionsMutation();
    const { userId, examAttemptId } = useParams();
    console.log(selectedOption, 'selectedOption')

    // console.log("this is data", question);
    useEffect(() => {
        setSelectedOption(isReviewMode ? question?.answer?.selectedOption || null : null);  // Use selected answer if present in review mode
    }, [question, isReviewMode]);


    const handleOptionChange = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        onAnswer(question?.id, selected); // Update the selected answer in the parent
    };

    const handleSave = async () => {
        let statusCode;
        console.log('SAVE api hit')
        if (selectedOption && question?.markedForReview) {
            statusCode = 3; // Answered and Marked for Review
        } else if (selectedOption) {
            statusCode = 1; // Answered
        } else if (question?.markedForReview) {
            statusCode = 4; // Marked for Review
        } else {
            statusCode = 2; // Not Answered
        }
        onNext(question?.id + 1)

        const payloadData = {
            data: {
                questionId: question?.question_id,
                answerId: selectedOption,
                examAttemptId: examAttemptId,
                statusCode: statusCode
            }
        }
        try {
            let result = await UploadExamQuestions({ userId, payloadData: payloadData });
            console.log("API result:", result);
        } catch (e) {
            console.log(e);
        }
        console.log('Save api hitted////')
    }

    const getOptionStyles = (optionId) => {
        if (!isReviewMode) return {}; // No special styles if not in review mode

        if (optionId === question?.correctOption) {
            return { backgroundColor: '#dff0d8', color: 'white' };  // Correct answer highlighted green
        }
        if (optionId === selectedOption && optionId !== question?.correctOption) {
            return { backgroundColor: 'gray', color: 'white' };  // Incorrect answer highlighted gray
        }
        return {}; // Default style
    };

    const handleClearResponse = () => {
        setSelectedOption(null);
        onClearResponse(question?.id);
    };

    const handleRefresh = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <>
            {loading ? <Box>
                <Box sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: `calc(100vh - 60px)`
                }}>
                    <CircularProgress />
                </Box>
            </Box> :
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }} >
                    <Box>
                        <Box sx={{ bgcolor: '#d5d5d599', p: 1, mb: 3, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: "center", }}>
                                <Typography variant="h8" sx={{ fontWeight: 'bold' }}>SECTIONS: </Typography>
                                <Box onClick={() => getSection("Hello")} sx={{ bgcolor: "#4dc4ff", p: 1, ml: 2, borderRadius: 2, cursor: 'pointer' }}>Part A</Box>
                            </Box>
                            <Box><RefreshIcon onClick={handleRefresh} sx={{ fontSize: '30px', cursor: 'pointer' }} /> <CalculateOutlinedIcon sx={{ fontSize: '30px', cursor: 'pointer' }} /></Box>
                        </Box>

                        <Box sx={{ p: 2, height: 'calc(100vh - 289px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }}>
                            <FormControl component="fieldset" sx={{ borderBottom: 2, borderColor: "#c0bfbf", pb: 4 }}>
                                <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                                    <Typography sx={{ fontSize: { xs: '16px', md: '18px', lg: '20px' }, mb: 3, borderTop: 1, borderBottom: 1, borderColor: "#c0bfbf", pt: 2, pb: 2, fontWeight: 'bold' }}>Question {question?.id}</Typography>
                                    <Typography sx={{ fontSize: { xs: '16px', md: '18px', lg: '19px' }, mb: 3 }}>  {<div dangerouslySetInnerHTML={{ __html: question?.question }} />}</Typography>
                                    {question?.meta.map((option, index) => (
                                        <FormControlLabel

                                            key={index}
                                            value={option.id}
                                            control={<Radio />}
                                            disabled={isReviewMode}
                                            label={<Box dangerouslySetInnerHTML={{ __html: option.option }} sx={{ fontSize: { xs: '14px', md: '16px', xl: '17px' } }} />}
                                            sx={getOptionStyles(option.id)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, p: 2 }}>
                        {/* Mark for Review & Next */}
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#f97316',
                                fontSize: '12px',
                                borderColor: '#f97316',
                                borderRadius: '20px',
                                px: 3,
                                mr: 5,
                                '&:hover': { backgroundColor: '#f97316', color: '#fff' },
                            }}
                            onClick={() => onMarkForReview(question?.id)}
                            disabled={question?.id === totalQuestions}
                        >
                            Mark for Review & Next
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                color: '#f97316',
                                fontSize: '12px',
                                borderColor: '#f97316',
                                borderRadius: '20px',
                                px: 3,
                                '&:hover': { backgroundColor: '#f97316', color: '#fff' },
                            }}
                            onClick={handleClearResponse}
                        >
                            Clear Response
                        </Button>

                        {/* Save & Next */}
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#f97316',
                                color: '#fff',
                                fontSize: '12px',
                                borderRadius: '20px',
                                px: 4,
                                '&:hover': { bgcolor: '#f97316' },
                            }}
                            onClick={handleSave}
                            disabled={question?.id === totalQuestions}
                        >
                            Save & Next
                        </Button>
                    </Box>
                </Box >
            }
        </>
    );
};

export default QuestionPanel;
