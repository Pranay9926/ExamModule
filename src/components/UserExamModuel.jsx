import React, { useEffect, useState } from 'react';
import { Box, Button, Grid2, Typography, IconButton, Drawer, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu'; // Toggle button icon
import Countdown from 'react-countdown';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExamQuestionsMutation } from '../store/service/user/UserService';
import { questionData } from '../utils/jsonData';
import QuestionPanel from './exam/QuestionPanel';
import ResultComponent from './exam/ResultComponent';
import ResultStatus from './exam/ResultStatus';
import StatusPanel from './exam/StatusPanel';

// const UserExamModule = () => {
//     const [questions, setQuestions] = useState(questionData); // State to store questions
//     const [activeQuestion, setActiveQuestion] = useState(questions[0]); // Current active question
//     const [startTime, setStartTime] = useState(null); // Store exam start time
//     const [isSubmit, setIsSubmit] = useState(false)
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(25);
//     const [partId, setPartId] = useState("")
//     const [getExamQuestions] = useGetExamQuestionsMutation()
//     const examDurationInMinutes = 30; // Dynamic Exam Duration (can be fetched from server)
//     const nav = useNavigate();
//     const { userId, examAttemptId } = useParams();


//     // Mark the first question as visited when the component is mounted
//     useEffect(() => {

//         getData()
//         console.log("Data", examAttemptId);
//     }, []); // This useEffect will run only once when the component mounts

//     const getData = async () => {
//         let result = await getExamQuestions({ userId, examAttemptId, partId, page, rowsPerPage })
//         console.log(result)
//     }

//     useEffect(() => {
//         console.log("data2");

//         const updatedQuestions = questions.map((q, index) =>
//             index === 0 ? { ...q, visited: true } : q
//         );
//         setQuestions(updatedQuestions);


//         // Check if exam start time exists in localStorage
//         const savedStartTime = localStorage.getItem('examStartTime');

//         if (savedStartTime) {
//             // Use the saved start time if it exists
//             setStartTime(new Date(savedStartTime));
//         } else {
//             // Initialize start time and save it to localStorage
//             const currentTime = new Date();
//             setStartTime(currentTime);
//             localStorage.setItem('examStartTime', currentTime);
//         }

//     }, []);

//     // Calculate the total exam time dynamically
//     const getExamEndTime = () => {
//         if (startTime) {
//             // Add the exam duration to the start time
//             return new Date(startTime.getTime() + examDurationInMinutes * 60 * 1000);
//         }
//         return null;
//     };


//     // useEffect(() => {
//     //     const handleBeforeUnload = (event) => {
//     //         event.preventDefault();
//     //         event.returnValue = '';  // This triggers the browser's confirmation dialog
//     //     };

//     //     // Add the event listener for the beforeunload event
//     //     window.addEventListener('beforeunload', handleBeforeUnload);

//     //     return () => {
//     //         // Cleanup the event listener when the component is unmounted
//     //         window.removeEventListener('beforeunload', handleBeforeUnload);
//     //     };
//     // }, []);




//     // Convert 19 minutes and 14 seconds into milliseconds
//     // const totalTimeInMilliseconds = (30 * 60) * 1000; // 19 minutes and 14 seconds

//     const getSection = (e) => {
//         console.log(e)
//         setPartId(e)
//     }

//     // Handle when the user selects an answer
//     const handleAnswer = (questionId, selectedOption) => {
//         const updatedQuestions = questions.map(q =>
//             q.id === questionId ? { ...q, selectedOption, answered: true } : q
//         );
//         setQuestions(updatedQuestions);
//     };

//     // Handle marking a question for review
//     const handleMarkForReview = (questionId) => {
//         const updatedQuestions = questions.map(q =>
//             q.id === questionId ? { ...q, markedForReview: true, visited: true } : q
//         );
//         setQuestions(updatedQuestions);
//         handleNextQuestion(questionId + 1);
//     };

//     // Handle clearing the selected response for a question
//     const handleClearResponse = (questionId) => {
//         const updatedQuestions = questions.map(q =>
//             q.id === questionId ? { ...q, selectedOption: null, answered: false } : q
//         );
//         setQuestions(updatedQuestions);
//     };

//     // Handle navigating to the next question and mark it as visited
//     const handleNextQuestion = (nextQuestionId) => {
//         const nextQuestion = questions.find(q => q.id === nextQuestionId);
//         if (nextQuestion) {
//             setQuestions(prevQuestions =>
//                 prevQuestions.map(q =>
//                     q.id === nextQuestionId ? { ...q, visited: true } : q
//                 )
//             );
//             setActiveQuestion(nextQuestion); // Set next question as active
//         }
//     };

//     // Handle submitting the quiz
//     const handleSubmitQuiz = () => {
//         const answers = questions.map(q => ({
//             id: q.id,
//             selectedOption: q.selectedOption
//         }));
//         console.log("Quiz submitted with answers:", questions);
//         setIsSubmit(!isSubmit)
//         // nav(`/user/${1}/exam/${1}/result`)
//         // You can send the answers to your server here
//     };

//     // Renderer for the countdown
//     const renderer = ({ hours, minutes, seconds, completed }) => {
//         if (completed) {
//             return <span>Time's up!</span>; // Show "Time's up!" when the countdown finishes
//         } else {
//             // Show the timer in HH:MM:SS format
//             return <span> {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
//         }
//     };

//     return (
//         <Box sx={{ width: '100%', bgcolor: '#f4f5f7' }}>
//             {/* Header Section */}
//             <Box sx={{ bgcolor: '#f97316', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
//                 <Typography variant="h6" sx={{ color: 'white', ml: 2, fontWeight: 'bold' }}>
//                     Nov PD Test 22
//                 </Typography>
//                 <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
//                     Time Left:
//                     {startTime && (
//                         <Countdown
//                             date={getExamEndTime()} // Use dynamically calculated end time
//                             renderer={renderer} // Custom renderer to format the timer
//                         // onComplete={handleSubmitQuiz} // Submit the quiz when time is up
//                         />
//                     )}
//                 </Typography>
//                 <Button onClick={() => { }}>
//                     <CloseIcon sx={{ color: 'white' }} />
//                 </Button>
//             </Box>

//             {/* Main Content Section */}
//             <Grid2 container spacing={0} sx={{ height: `calc(100vh - 52px)` }}>
//                 {/* Left: Question Panel */}
//                 <Grid2 item size={9} sx={{ p: 0 }}>
//                     {isSubmit ?
//                         <ResultComponent />
//                         :
//                         <QuestionPanel
//                             question={activeQuestion}
//                             onAnswer={handleAnswer}
//                             onNext={handleNextQuestion}
//                             onMarkForReview={handleMarkForReview}
//                             onClearResponse={handleClearResponse}
//                             totalQuestions={questions.length}
//                             getSection={getSection}
//                         />
//                     }

//                 </Grid2>

//                 {/* Right: Status Panel */}
//                 <Grid2 item size={3} sx={{ bgcolor: 'white', p: 0, borderLeft: '1px solid #e0e0e0' }}>
//                     {isSubmit ? <ResultStatus onSubmitQuiz={handleSubmitQuiz} /> :
//                         <StatusPanel
//                             questions={questions}
//                             activeQuestion={activeQuestion}
//                             onQuestionChange={handleNextQuestion}
//                             onSubmitQuiz={handleSubmitQuiz}
//                         />
//                     }
//                 </Grid2>
//             </Grid2>
//         </Box>
//     );
// };

// export default UserExamModule;







const UserExamModule = () => {
    const [questions, setQuestions] = useState(questionData); // State to store questions
    const [activeQuestion, setActiveQuestion] = useState(questions[0]); // Current active question
    const [startTime, setStartTime] = useState(null); // Store exam start time
    const [isSubmit, setIsSubmit] = useState(false);
    const [openStatusPanel, setOpenStatusPanel] = useState(false); // For toggle status panel
    const [examDuration, setExamDuration] = useState("30:00"); // Mock exam duration in format mm:ss
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [partId, setPartId] = useState("");
    const [getExamQuestions] = useGetExamQuestionsMutation();
    const nav = useNavigate();
    const { userId, examAttemptId } = useParams();


    // Parse the "30:15" format into milliseconds
    const parseTimeToMilliseconds = (time) => {
        console.log("time", time);
        // if (time !== null) {

        const [minutes, seconds] = time.split(':').map(Number);
        return (minutes * 60 + seconds) * 1000; // Convert to milliseconds
        // }
    };

    // Mark the first question as visited when the component is mounted
    useEffect(() => {
        getData();
        // console.log("Data", examAttemptId);
    }, []); // This useEffect will run only once when the component mounts

    const getData = async () => {
        let result = await getExamQuestions({ userId, examAttemptId, partId, page, rowsPerPage });
        console.log(result);
    };

    //     // useEffect(() => {
    //     //     const handleBeforeUnload = (event) => {
    //     //         event.preventDefault();
    //     //         event.returnValue = '';  // This triggers the browser's confirmation dialog
    //     //     };

    //     //     // Add the event listener for the beforeunload event
    //     //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     //     return () => {
    //     //         // Cleanup the event listener when the component is unmounted
    //     //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     //     };
    //     // }, []);

    useEffect(() => {
        // console.log("data2");

        const updatedQuestions = questions.map((q, index) =>
            index === 0 ? { ...q, visited: true } : q
        );
        setQuestions(updatedQuestions);

        // Check if exam start time exists in localStorage
        const savedStartTime = localStorage.getItem('examStartTime');
        console.log(typeof localStorage.getItem('timeLeft'));
        // setExamDuration(localStorage.getItem('timeLeft'))

        if (savedStartTime) {
            setStartTime(new Date(savedStartTime));
        } else {
            const currentTime = new Date();
            setStartTime(currentTime);
            localStorage.setItem('examStartTime', currentTime);
        }
    }, []);

    // Calculate the exam end time using the parsed exam duration
    const getExamEndTime = () => {
        if (startTime) {
            // Parse the duration string and convert it to milliseconds
            const durationInMilliseconds = parseTimeToMilliseconds(examDuration);
            return new Date(startTime.getTime() + durationInMilliseconds);
        }
        return null;
    };

    // Handle when the user selects an answer
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
        console.log("Quiz submitted with answers:", questions);
        setIsSubmit(!isSubmit);
        localStorage.clear("examStartTime")
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Time's up!</span>;
        } else {
            // Show the timer in HH:MM:SS format
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
                        <ResultStatus onSubmitQuiz={handleSubmitQuiz} />
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
                <IconButton onClick={toggleStatusPanel(false)} sx={{ position: 'fixed', color: 'black', p: '3px' }}>
                    <CloseIcon sx={{ fontWeight: '700', borderRadius: '2px' }} />
                </IconButton>
                <Box sx={{ width: 300, p: 2, height: '100%' }}>
                    {isSubmit ? (
                        <ResultStatus onSubmitQuiz={handleSubmitQuiz} />
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
