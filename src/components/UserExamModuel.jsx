import React, { useEffect, useState } from 'react';
import { Box, Button, Grid2, Typography, IconButton, Drawer, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu'; // Toggle button icon
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { questionData } from '../utils/jsonData';
import QuestionPanel from './exam/QuestionPanel';
import ResultComponent from './exam/ResultComponent';
import StatusPanel from './exam/StatusPanel';
import StatusResultPanel from './exam/StatusResultPanel';

const UserExamModule = () => {
    const [questions, setQuestions] = useState(questionData);
    const [activeQuestion, setActiveQuestion] = useState(questions[0]);
    const [startTime, setStartTime] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [openStatusPanel, setOpenStatusPanel] = useState(false); // For toggle status panel
    const examDurationInMinutes = 30;
    const nav = useNavigate();

    useEffect(() => {
        const updatedQuestions = questions.map((q, index) =>
            index === 0 ? { ...q, visited: true } : q
        );
        setQuestions(updatedQuestions);
    }, []);

    useEffect(() => {
        const savedStartTime = localStorage.getItem('examStartTime');
        if (savedStartTime) {
            setStartTime(new Date(savedStartTime));
        } else {
            const currentTime = new Date();
            setStartTime(currentTime);
            localStorage.setItem('examStartTime', currentTime);
        }
    }, []);

    const getExamEndTime = () => {
        if (startTime) {
            return new Date(startTime.getTime() + examDurationInMinutes * 60 * 1000);
        }
        return null;
    };

    const handleAnswer = (questionId, selectedOption) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, selectedOption, answered: true } : q
        );
        setQuestions(updatedQuestions);
    };

    const handleMarkForReview = (questionId) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, markedForReview: true, visited: true } : q
        );
        setQuestions(updatedQuestions);
        handleNextQuestion(questionId + 1);
    };

    const handleClearResponse = (questionId) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, selectedOption: null, answered: false } : q
        );
        setQuestions(updatedQuestions);
    };

    const handleNextQuestion = (nextQuestionId) => {
        const nextQuestion = questions.find(q => q.id === nextQuestionId);
        if (nextQuestion) {
            setQuestions(prevQuestions =>
                prevQuestions.map(q =>
                    q.id === nextQuestionId ? { ...q, visited: true } : q
                )
            );
            setActiveQuestion(nextQuestion);
        }
    };

    const handleSubmitQuiz = () => {
        const answers = questions.map(q => ({
            id: q.id,
            selectedOption: q.selectedOption
        }));
        console.log("Quiz submitted with answers:", answers);
        setIsSubmit(!isSubmit);
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Time's up!</span>;
        } else {
            return <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
        }
    };

    // Handle toggle for Status Panel
    const toggleStatusPanel = (open) => () => {
        setOpenStatusPanel(open);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: '#f4f5f7', }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: '#f97316', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography variant="h6" sx={{ color: 'white', ml: 2, fontWeight: 'bold' }}>
                    Nov PD Test 22
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Time Left:
                    {startTime && (
                        <Countdown
                            date={getExamEndTime()}
                            renderer={renderer}
                            onComplete={handleSubmitQuiz}
                        />
                    )}
                </Typography>
                <Button onClick={() => { }}>
                    <CloseIcon sx={{ color: 'white' }} />
                </Button>
            </Box>

            {/* Main Content Section */}
            <Grid2 container spacing={0} sx={{ height: `calc(100vh - 52px)` }}>

                {/* Left: Question Panel */}
                <Grid2 item size={{ xs: 12, sm: 8, md: 9 }} sx={{ p: 0 }}>
                    {isSubmit ? (
                        <ResultComponent />
                    ) : (
                        <QuestionPanel
                            question={activeQuestion}
                            onAnswer={handleAnswer}
                            onNext={handleNextQuestion}
                            onMarkForReview={handleMarkForReview}
                            onClearResponse={handleClearResponse}
                            totalQuestions={questions.length}
                        />
                    )}
                </Grid2>

                {/* Right: Status Panel (Visible on larger screens, toggle on small screens) */}
                <Grid2 item size={{ sm: 4, md: 3 }} sx={{ bgcolor: 'white', p: 0, borderLeft: '1px solid #e0e0e0', display: { xs: 'none', sm: 'block' } }}>

                    {isSubmit ? (
                        <StatusResultPanel onSubmitQuiz={handleSubmitQuiz} />
                    ) : (
                        <StatusPanel
                            questions={questions}
                            activeQuestion={activeQuestion}
                            onQuestionChange={handleNextQuestion}
                            onSubmitQuiz={handleSubmitQuiz}
                        />
                    )}
                </Grid2>
            </Grid2>

            {/* Toggle Button for Status Panel on Small Screens */}
            <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'fixed', bottom: 16, right: 16 }}>
                <IconButton onClick={toggleStatusPanel(true)} sx={{ bgcolor: '#f97316', color: 'white' }}>
                    <MenuIcon />
                </IconButton>
            </Box>

            {/* Drawer for Status Panel on Small Screens */}
            <Drawer
                anchor="right"
                open={openStatusPanel}
                onClose={toggleStatusPanel(false)}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <IconButton onClick={toggleStatusPanel(false)} sx={{ position: 'fixed', color: 'black', p: '2px' }}>
                    <CloseIcon sx={{ fontWeight: '700', backgroundColor: '#aea6a67a', borderRadius: '2px' }} />
                </IconButton>
                <Box sx={{ width: 300, p: 2 }}>
                    {isSubmit ? (
                        <StatusResultPanel onSubmitQuiz={handleSubmitQuiz} />
                    ) : (
                        <StatusPanel
                            questions={questions}
                            activeQuestion={activeQuestion}
                            onQuestionChange={handleNextQuestion}
                            onSubmitQuiz={handleSubmitQuiz}
                        />
                    )}

                </Box>
            </Drawer>
        </Box>
    );
};

export default UserExamModule;
