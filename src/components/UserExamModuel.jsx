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
import QuitConfirmation from '../common/QuitConfirmation';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsData } from '../store/slices/userSlice/UserExamSlice'

const UserExamModule = () => {
    const dispatch = useDispatch();
    const QuestionsData = useSelector(state => state?.UserExamReducer?.QuestionsData);
    const [questions, setQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState();
    const [startTime, setStartTime] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [openStatusPanel, setOpenStatusPanel] = useState(false);
    const [quitConfirmation, setQuitConfirmation] = useState(false);
    const [examDuration, setExamDuration] = useState("00:00");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [partIds, setPartIds] = useState([])
    const [activePartId, setActivePartId] = useState("")
    const [isSubmission, setIsSubmission] = useState(false)
    const [submitButton, setSubmitButton] = useState(false)
    const [getExamQuestions] = useGetExamQuestionsMutation();
    const { userId, examId, examAttemptId } = useParams();
    const [getReviewExamQuestion] = useGetReviewExamQuestionMutation();







    useEffect(() => {
        getData();
    }, [page]);

    // Main function to fetch questions data
    const getData = async (partId = "") => {
        if (QuestionsData[partId]) {
            setActivePartId(partId)
            setQuestions(QuestionsData[partId]);
            let activeIndex = QuestionsData[partId].findIndex(q => !q.answered)
            console.log("ACTIVE", activeIndex);
            setActiveQuestion(QuestionsData[partId][activeIndex]); // Set the first question as active
        } else {
            try {
                let result = await getExamQuestions({ userId, examAttemptId, partId, page, rowsPerPage });
                const { data } = result;
                setPartIds(data?.partIds);
                if (data && data?.data?.length > 0) {
                    const updatedQuestions = data?.data?.map((q, index) =>
                        index === 0 ? { ...q, visited: true } : q
                    );
                    if (partId === '') {
                        partId = data?.partIds[0]
                        setActivePartId(partId)
                    } else {
                        setActivePartId(partId)
                    }
                    let StoreData = { ...QuestionsData, [partId]: updatedQuestions }
                    // Step 3: Dispatch the fetched data to the Redux store
                    dispatch(getQuestionsData(StoreData));

                    // Update the local state
                    setQuestions(updatedQuestions);
                    setActiveQuestion(updatedQuestions[0]);
                }
            } catch (e) {
                console.error('Error fetching questions:', e);
            }
        }
    }








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
        setButtonDisable(false)
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

    // Updated handleAnswer to dispatch changes to Redux
    const handleAnswer = (questionId, selectedOption) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, selectedOption, answered: true } : q
        );
        setQuestions(updatedQuestions);

        console.log(QuestionsData, 'QuestionsData1223434', activePartId)

        // Update Redux with new answers for current partId
        dispatch(getQuestionsData({ ...QuestionsData, [activePartId]: updatedQuestions }));
    };

    // Updated handleMarkForReview to dispatch changes to Redux
    const handleMarkForReview = (questionId) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, markedForReview: true } : q
        );
        setQuestions(updatedQuestions);
        dispatch(getQuestionsData({ ...QuestionsData, [activePartId]: updatedQuestions })); // Update Redux
        handleNextQuestion(questionId + 1, updatedQuestions);

    };

    // Updated handleClearResponse to dispatch changes to Redux
    const handleClearResponse = (questionId) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, selectedOption: null, answered: false } : q
        );
        setQuestions(updatedQuestions);

        // Update Redux with cleared response
        dispatch(getQuestionsData({ ...QuestionsData, [activePartId]: updatedQuestions }));
    };

    // Updated handleNextQuestion to work with updated questions passed as argument
    const handleNextQuestion = (nextQuestionId, questionsData = questions) => {

        const nextQuestion = questionsData.find(q => q.id === nextQuestionId);
        if (nextQuestion) {
            setButtonDisable(false);
            const updatedQuestions = questionsData.map(q =>
                q.id === nextQuestionId ? { ...q, visited: true } : q
            );
            setQuestions(updatedQuestions);
            dispatch(getQuestionsData({ ...QuestionsData, [activePartId]: updatedQuestions }));
            setActiveQuestion(nextQuestion);
        } else {
            // Disable the "Next" button if no more questions are found
            setButtonDisable(true);
        }
    };

    // handleSubmitQuiz remains unchanged for now
    const handleSubmitQuiz = () => {
        const answers = questions.map(q => ({
            id: q.id,
            selectedOption: q.selectedOption
        }));
        console.log("questions", questions);
        setOpenStatusPanel(false);
        setIsSubmit(false);
        localStorage.removeItem('examStartTime');
        setIsSubmission(!isSubmission);
    };

    // handleReviewQuestion remains unchanged for now
    const handleReviewQuestion = async (obj) => {
        setIsReviewMode(true);
        setIsSubmit(false);
        setButtonDisable(false);
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
                    <Button onClick={() => setQuitConfirmation(true)} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </Button>
                </Box>
                {/* Main Content Section */}
                <Grid2 container spacing={0} sx={{ height: `calc(100vh - 52px)` }}>
                    <Grid2 item size={{ xs: 12, sm: 8, md: 9 }} sx={{ p: 0 }}>
                        {quitConfirmation ? <QuitConfirmation setQuitConfirmation={setQuitConfirmation} setIsSubmission={setIsSubmission}
                            setIsSubmit={setIsSubmit} /> : <>
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
                                        questions={questions}
                                        isReviewMode={isReviewMode}
                                        partIds={partIds}
                                        getSection={getData}
                                        buttonDisable={buttonDisable}
                                    />
                                )}
                        </>}
                    </Grid2>

                    {/* Right: Status Panel (Visible on larger screens, toggle on small screens) */}
                    <Grid2 item size={{ sm: 4, md: 3 }} sx={{ bgcolor: 'white', p: 0, borderLeft: '1px solid #e0e0e0', display: { xs: 'none', sm: 'block' } }}>
                        {(isSubmit && !isSubmission) || isReviewMode ? (
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
