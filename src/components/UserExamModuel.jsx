import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Typography, Box, Grid2 } from '@mui/material';
import QuestionPanel from './exam/QuestionPanel';
import StatusPanel from './exam/StatusPanel';
import { questionData } from '../utils/jsonData';
import Countdown from 'react-countdown';
import ResultComponent from './exam/ResultComponent';

const UserExamModule = () => {
    const [questions, setQuestions] = useState(questionData); // State to store questions
    const [activeQuestion, setActiveQuestion] = useState(questions[0]); // Current active question

    // Convert 19 minutes and 14 seconds into milliseconds
    const totalTimeInMilliseconds = (30 * 60) * 1000; // 19 minutes and 14 seconds

    // Handle when the user selects an answer
    const handleAnswer = (questionId, selectedOption) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, selectedOption, answered: true } : q
        );
        setQuestions(updatedQuestions);
    };

    // Handle marking a question for review
    const handleMarkForReview = (questionId) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, markedForReview: true, visited: true } : q
        );
        setQuestions(updatedQuestions);
        handleNextQuestion(questionId + 1);
    };

    // Handle clearing the selected response for a question
    const handleClearResponse = (questionId) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, selectedOption: null, answered: false } : q
        );
        setQuestions(updatedQuestions);
    };

    // Handle navigating to the next question and mark it as visited
    const handleNextQuestion = (nextQuestionId) => {
        const nextQuestion = questions.find(q => q.id === nextQuestionId);
        if (nextQuestion) {
            setQuestions(prevQuestions =>
                prevQuestions.map(q =>
                    q.id === nextQuestionId ? { ...q, visited: true } : q
                )
            );
            setActiveQuestion(nextQuestion); // Set next question as active
        }
    };

    // Handle submitting the quiz
    const handleSubmitQuiz = () => {
        const answers = questions.map(q => ({
            id: q.id,
            selectedOption: q.selectedOption
        }));
        console.log("Quiz submitted with answers:", answers);
        // You can send the answers to your server here
    };

    // Renderer for the countdown
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Time's up!</span>; // Show "Time's up!" when the countdown finishes
        } else {
            // Show the timer in HH:MM:SS format
            return <span> {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
        }
    };

    return (
        <Box sx={{ width: '100%', bgcolor: '#f4f5f7' }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: '#f97316', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography variant="h6" sx={{ color: 'white', ml: 2, fontWeight: 'bold' }}>
                    Nov PD Test 22
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Time Left:
                    <Countdown
                        date={Date.now() + totalTimeInMilliseconds} // Set countdown timer
                        renderer={renderer} // Custom renderer to format the timer
                    />
                </Typography>
                <Button onClick={() => { }}>
                    <CloseIcon sx={{ color: 'white' }} />
                </Button>
            </Box>

            {/* Main Content Section */}
            <Grid2 container spacing={0} sx={{ height: `calc(100vh - 52px)` }}>
                {/* Left: Question Panel */}
                <Grid2 item size={9} sx={{ p: 0 }}>
                    <QuestionPanel
                        question={activeQuestion}
                        onAnswer={handleAnswer}
                        onNext={handleNextQuestion}
                        onMarkForReview={handleMarkForReview}
                        onClearResponse={handleClearResponse}
                        totalQuestions={questions.length}
                    />
                    {/* <ResultComponent /> */}
                </Grid2>

                {/* Right: Status Panel */}
                <Grid2 item size={3} sx={{ bgcolor: 'white', p: 0, borderLeft: '1px solid #e0e0e0' }}>
                    <StatusPanel
                        questions={questions}
                        activeQuestion={activeQuestion}
                        onQuestionChange={handleNextQuestion}
                        onSubmitQuiz={handleSubmitQuiz}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default UserExamModule;
