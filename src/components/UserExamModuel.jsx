import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { questionData } from '../utils/jsonData';
import QuestionPanel from './exam/QuestionPanel';
import ResultComponent from './exam/ResultComponent';
import StatusPanel from './exam/StatusPanel';

const UserExamModule = () => {
    const [questions, setQuestions] = useState(questionData); // State to store questions
    const [activeQuestion, setActiveQuestion] = useState(questions[0]); // Current active question
    const [startTime, setStartTime] = useState(null); // Store exam start time
    const [isSubmit, setIsSubmit] = useState(false)
    const examDurationInMinutes = 30; // Dynamic Exam Duration (can be fetched from server)
    const nav = useNavigate();


    // Mark the first question as visited when the component is mounted
    useEffect(() => {
        const updatedQuestions = questions.map((q, index) =>
            index === 0 ? { ...q, visited: true } : q
        );
        setQuestions(updatedQuestions);
    }, []); // This useEffect will run only once when the component mounts


    useEffect(() => {
        // Check if exam start time exists in localStorage
        const savedStartTime = localStorage.getItem('examStartTime');

        if (savedStartTime) {
            // Use the saved start time if it exists
            setStartTime(new Date(savedStartTime));
        } else {
            // Initialize start time and save it to localStorage
            const currentTime = new Date();
            setStartTime(currentTime);
            localStorage.setItem('examStartTime', currentTime);
        }
    }, []);

    // Calculate the total exam time dynamically
    const getExamEndTime = () => {
        if (startTime) {
            // Add the exam duration to the start time
            return new Date(startTime.getTime() + examDurationInMinutes * 60 * 1000);
        }
        return null;
    };


    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault();
    //         event.returnValue = '';  // This triggers the browser's confirmation dialog
    //     };

    //     // Add the event listener for the beforeunload event
    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         // Cleanup the event listener when the component is unmounted
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);




    // Convert 19 minutes and 14 seconds into milliseconds
    // const totalTimeInMilliseconds = (30 * 60) * 1000; // 19 minutes and 14 seconds

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
        setIsSubmit(!isSubmit)
        // nav(`/user/${1}/exam/${1}/result`)
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
                    {startTime && (
                        <Countdown
                            date={getExamEndTime()} // Use dynamically calculated end time
                            renderer={renderer} // Custom renderer to format the timer
                            onComplete={handleSubmitQuiz} // Submit the quiz when time is up
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
                <Grid2 item size={9} sx={{ p: 0 }}>
                    {isSubmit ?
                        <ResultComponent />
                        :
                        <QuestionPanel
                            question={activeQuestion}
                            onAnswer={handleAnswer}
                            onNext={handleNextQuestion}
                            onMarkForReview={handleMarkForReview}
                            onClearResponse={handleClearResponse}
                            totalQuestions={questions.length}
                        />
                    }

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
