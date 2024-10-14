import React, { useEffect, useState } from 'react';
import { Box, Button, Grid2, Typography, IconButton, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu'; // Toggle button icon
import Countdown from 'react-countdown';
import { useParams } from 'react-router-dom';
import { useGetExamQuestionsMutation, useGetReviewExamQuestionMutation } from '../store/service/user/UserService';
import QuestionPanel from './exam/QuestionPanel';
import ResultComponent from './exam/ResultComponent';
import ResultStatus from './exam/ResultStatus';
import StatusPanel from './exam/StatusPanel';
import SubmissionPage from '../common/SubmissionPage';

const UserExamModule = () => {
    const [questions, setQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState();
    const [startTime, setStartTime] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [openStatusPanel, setOpenStatusPanel] = useState(false);
    const [examDuration, setExamDuration] = useState("00:00");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    // const [partId, setPartId] = useState("");
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [partIds, setPartIds] = useState([])
    const [isSubmission, setIsSubmission] = useState(false)
    const [submitButton, setSubmitButton] = useState(false)
    const [getExamQuestions] = useGetExamQuestionsMutation();
    const { userId, examId, examAttemptId } = useParams();
    const [getReviewExamQuestion] = useGetReviewExamQuestionMutation();

    useEffect(() => {
        getData();
    }, [page]);


    const getData = async (partId = "") => {
        try {
            let result = await getExamQuestions({ userId, examAttemptId, partId, page, rowsPerPage });
            const { data } = result;
            setPartIds(data?.partIds);
            if (data && data?.data?.length > 0) {
                const updatedQuestions = data?.data?.map((q, index) =>
                    index === 0 ? { ...q, visited: true } : q
                );
                setQuestions(updatedQuestions);
                setActiveQuestion(data?.data[0]);
            }
        } catch (e) {
            console.log(e);
        }
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

    useEffect(() => {
        const examDetails = JSON.parse(localStorage.getItem('examDetails'));
        const currentTime = new Date();

        if (examDetails) {
            const [endHours, endMinutes] = examDetails.ends_at.split(':').map(Number);

            const examEndTime = new Date();
            examEndTime.setHours(endHours);
            examEndTime.setMinutes(endMinutes);
            examEndTime.setSeconds(0);

            const timeLeftInMs = examEndTime.getTime() - currentTime.getTime();

            if (timeLeftInMs > 0) {
                setExamDuration(timeLeftInMs);
                setStartTime(currentTime);
            } else {
                console.log('Exam has already ended.');
            }
        }
    }, []);

    const getExamEndTime = () => {
        if (startTime && examDuration) {
            return new Date(startTime.getTime() + examDuration);
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
        console.log("openStatusPanel", openStatusPanel);
        setOpenStatusPanel(false)
        setIsSubmit(!isSubmit);
        localStorage.removeItem('examStartTime');
        console.log("isSubmission11111", isSubmission);
        setIsSubmission(!isSubmission)
    };


    const handleReviewQuestion = async (obj) => {
        setIsReviewMode(true);
        setIsSubmit(false);
        console.log("this is your data", obj);
        try {
            const resultData = await getReviewExamQuestion(obj);
            const { data } = resultData;
            if (data && data.data.length > 0) {
                const updatedQuestions = data.data.map((q, index) =>
                    index === 0 ? { ...q, visited: true } : q
                );
                setQuestions(updatedQuestions);
                setActiveQuestion(data.data[0]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Time's up!</span>;
        } else {
            return <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
        }
    };

    const toggleStatusPanel = (open) => () => {
        setOpenStatusPanel(open);
    };

    return (
        <>
            {/* {questions ? */}
            <Box sx={{
                width: '100%', bgcolor: '#f4f5f7', height: '100vh', '@media (min-width: 0px) and (max-width: 425px)': {
                    height: '101vh', // change height for this range
                },
            }}>
                {/* Header Section */}
                <Box sx={{ bgcolor: '#f97316' }}>
                    <Box sx={{
                        bgcolor: '#f97316', display: {
                            sm: 'flex',
                        }, alignItems: 'center', p: 1, justifyContent: "space-between", width: "60%",
                    }}>
                        <Typography sx={{ fontSize: { xs: '15px', md: '17px', lg: '20px' }, color: 'white', ml: '1.5px', fontWeight: 'bold' }}>
                            Nov PD Test 22
                        </Typography>
                        <Typography sx={{ fontSize: { xs: '15px', md: '17px', lg: '20px' }, color: 'white', fontWeight: 'bold' }}>
                            Time Left:
                            {startTime && (
                                <Countdown
                                    date={getExamEndTime()}
                                    renderer={renderer}
                                    onComplete={handleSubmitQuiz}
                                />
                            )}
                        </Typography>
                    </Box>
                    <Button onClick={() => { }} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </Button>
                </Box>
                {/* Main Content Section */}
                <Grid2 container spacing={0} sx={{ height: `calc(100vh - 52px)` }}>
                    <Grid2 item size={{ xs: 12, sm: 8, md: 9 }} sx={{ p: 0 }}>
                        {
                            isSubmission ? (
                                <SubmissionPage userId={userId} examId={examId} examAttemptId={examAttemptId} setIsSubmit={setIsSubmit} setIsSubmission={setIsSubmission} setSubmitButton={setSubmitButton} />
                            ) : isSubmit ? (
                                <ResultComponent userId={userId} examId={examId} examAttemptId={examAttemptId} handleReviewQuestion={handleReviewQuestion} />
                            ) : (
                                <QuestionPanel
                                    question={activeQuestion}
                                    onAnswer={handleAnswer}
                                    onNext={handleNextQuestion}
                                    onMarkForReview={handleMarkForReview}
                                    onClearResponse={handleClearResponse}
                                    totalQuestions={questions.length}
                                    isReviewMode={isReviewMode}
                                    partIds={partIds}
                                    getSection={getData}
                                />
                            )}
                    </Grid2>

                    {/* Right: Status Panel (Visible on larger screens, toggle on small screens) */}
                    <Grid2 item size={{ sm: 4, md: 3 }} sx={{ bgcolor: 'white', p: 0, borderLeft: '1px solid #e0e0e0', display: { xs: 'none', sm: 'block' } }}>

                        {isSubmit && !isSubmission ? (
                            <ResultStatus onSubmitQuiz={handleSubmitQuiz} userId={userId} examId={examId} submitButton={submitButton} />
                        ) : (
                            <StatusPanel
                                questions={questions}
                                activeQuestion={activeQuestion}
                                onQuestionChange={handleNextQuestion}
                                onSubmitQuiz={handleSubmitQuiz}
                                isSubmission={isSubmission}

                            />
                        )}
                    </Grid2>
                </Grid2>

                {/* Toggle Button for Status Panel on Small Screens */}
                <Box sx={{
                    display: { xs: 'block', sm: 'none' }, position: 'fixed', bottom: 16, right: 16, '@media (min-width: 350px) and (max-width: 463px)': {
                        bottom: '65px',
                    }
                }}>
                    <IconButton onClick={toggleStatusPanel(true)} sx={{ bgcolor: '#f97316', color: 'white' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Drawer for Status Panel on Small Screens */}
                <Drawer
                    anchor="right"
                    open={openStatusPanel}
                    onClose={toggleStatusPanel(false)}
                    sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton onClick={toggleStatusPanel(false)} sx={{ position: 'fixed', color: 'black', p: '3px' }}>
                        <CloseIcon sx={{ fontWeight: '700', borderRadius: '2px' }} />
                    </IconButton>
                    <Box sx={{ width: 300, p: 2, height: '100%' }}>
                        {isSubmit && !isSubmission ? (
                            <ResultStatus onSubmitQuiz={handleSubmitQuiz} userId={userId} examId={examId} submitButton={submitButton} />
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
            {/* : <>
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', height: `calc(100vh - 60px)`
                    }}>
                        <CircularProgress />
            </Box>
                </>} */}
        </>
    );
};

export default UserExamModule;
