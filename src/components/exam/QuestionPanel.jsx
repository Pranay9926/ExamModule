import React, { useState, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const QuestionPanel = ({ question, onAnswer, onNext, onMarkForReview, onClearResponse, totalQuestions }) => {
    const [selectedOption, setSelectedOption] = useState(question.selectedOption || null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setSelectedOption(question.selectedOption || null); // Update selected option when question changes
    }, [question]);

    const handleOptionChange = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        onAnswer(question.id, selected); // Update the selected answer in the parent
    };

    const handleClearResponse = () => {
        setSelectedOption(null);
        onClearResponse(question.id);
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
                                <Box sx={{ bgcolor: "#4dc4ff", p: 1, ml: 2, borderRadius: 2 }}>Part A</Box>
                            </Box>
                            <Box><RefreshIcon onClick={handleRefresh} sx={{ fontSize: '30px', cursor: 'pointer' }} /> <CalculateOutlinedIcon sx={{ fontSize: '30px', cursor: 'pointer' }} /></Box>
                        </Box>

                        <Box sx={{ p: 2, height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }}>
                            <FormControl component="fieldset" sx={{ borderBottom: 2, borderColor: "#c0bfbf", pb: 8 }}>
                                <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                                    <Typography variant="h6" sx={{ mb: 3, borderTop: 1, borderBottom: 1, borderColor: "#c0bfbf", pt: 2, pb: 2, fontWeight: 'bold' }}>Question {question.id}</Typography>
                                    <Typography variant="h6" sx={{ mb: 3 }}> {question.question}</Typography>
                                    {question.options.map((option, index) => (
                                        <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                        {/* Mark for Review & Next */}
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#f97316',
                                borderColor: '#f97316',
                                borderRadius: '20px',
                                px: 3,
                                mr: 5,
                                '&:hover': { backgroundColor: '#f97316', color: '#fff' },
                            }}
                            onClick={() => onMarkForReview(question.id)}
                            disabled={question.id === totalQuestions}
                        >
                            Mark for Review & Next
                        </Button>

                        {/* Clear Response */}
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#f97316',
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
                                borderRadius: '20px',
                                px: 4,
                                '&:hover': { bgcolor: '#f97316' },
                            }}
                            onClick={() => onNext(question.id + 1)}
                            disabled={question.id === totalQuestions}
                        >
                            Save & Next
                        </Button>
                    </Box>
                </Box>}
        </>
    );
};

export default QuestionPanel;
