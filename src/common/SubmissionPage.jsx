import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { useGetExamStatisticMutation } from '../store/service/user/UserService';
// import ResultComponent from '../exam/ResultComponent';  // Import ResultComponent

const tableHeaders = [
    { label: 'Section Name', accessor: 'partId', isPart: true },
    { label: 'No. of Questions', accessor: 'noOfQuestions' },
    { label: 'Answered', accessor: 'answered' },
    { label: 'Not Answered', accessor: 'notAnswered' },
    { label: 'Marked for Review', accessor: 'markForReview' },
    { label: 'Answered & Marked for Review', accessor: 'answeredAndMarkForReview' },
    { label: 'Not Visited', accessor: 'notVisited' },
    { label: 'Time Taken', accessor: 'timeTaken' }
];

const SubmissionPage = ({
    userId, examId, examAttemptId, setIsSubmission, setIsSubmit, setTimeLeft, setIsTimeOver }) => {
    const [getExamStatistic] = useGetExamStatisticMutation()
    const [examStatisticData, setExamStatisticData] = useState();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            let result = await getExamStatistic({ userId, examId, examAttemptId });
            setExamStatisticData(result?.data?.data)
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmitQuiz = () => {
        setTimeLeft(0); // Reset countdown to 00:00
        setIsTimeOver(true); // Mark exam as over
        setIsSubmit(true);
        setIsSubmission(false);
        // setSubmitButton(true)
    };

    const handleQuitClick = () => {
        console.log('click')
        setIsSubmit(false);
        setIsSubmission(false);
    };

    return (
        <>
            {examStatisticData ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', gap: 4 }}>
                    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                        <Table aria-label="quiz details table">
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header, index) => (
                                        <TableCell key={index}>{header.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {examStatisticData?.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {tableHeaders.map((header, colIndex) => (
                                            <TableCell key={colIndex}>
                                                {header.isPart ? `Part ${row[header.accessor]}` : row[header.accessor]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h6" align="center">
                        Are you sure you want to submit?
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" color="warning" onClick={handleSubmitQuiz}>
                            Submit
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleQuitClick}>
                            No, Go Back To Quiz
                        </Button>
                    </Box>

                    {/* {showQuitConfirmation && (
                        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <ErrorOutlineIcon sx={{ fontSize: 50, color: '#f44336', marginBottom: '20px' }} />
                            <Typography variant="body1" gutterBottom>
                                Quitting will automatically submit the assessment. Do you really want to quit?
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                                <Button variant="outlined" color="error" >
                                    Quit
                                </Button>
                                <Button variant="contained" color="warning" onClick={handleCloseQuitConfirmation}>
                                    No, Go Back To Quiz
                                </Button>
                            </Box>
                        </Box>
                    )} */}

                    {/* {isSubmit && (
                <ResultComponent userId={userId} examId={examId} examAttemptId={examAttemptId} />
            )} */}
                </Box>
                : <Box sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: `calc(100vh - 60px)`
                }}>
                    <CircularProgress />
                </Box>}
        </>
    );
};

export default SubmissionPage;