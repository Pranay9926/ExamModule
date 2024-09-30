import React, { useState, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button } from '@mui/material';

const QuestionPanel = ({ question, onAnswer, onNext, onMarkForReview, onClearResponse, totalQuestions }) => {
    const [selectedOption, setSelectedOption] = useState(question.selectedOption || null);

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

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }} >
            <Box>
                <Box sx={{ bgcolor: '#d5d5d599', p: 1, mb: 3, display: 'flex', alignItems: "center" }}>
                    <Typography variant="h8" sx={{ fontWeight: 'bold' }}>SECTIONS: </Typography>
                    <Box sx={{ bgcolor: "#4dc4ff", p: 1, ml: 2, borderRadius: 2 }}>Part A</Box>
                </Box>

                <Box sx={{ p: 2, height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
        </Box>
    );
};

export default QuestionPanel;
