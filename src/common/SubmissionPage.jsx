import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { useGetExamStatisticMutation } from '../store/service/user/UserService';

const tableHeaders = [
    { label: 'Section Name', accessor: 'partId', isPart: true },
    { label: 'No. of Questions', accessor: 'noOfQuestions' },
    { label: 'Max Questions Allowed', accessor: 'maxQuestionsAllowed' },
    { label: 'Answered', accessor: 'answered' },
    { label: 'Not Answered', accessor: 'notAnswered' },
    { label: 'Marked for Review', accessor: 'markForReview' },
    { label: 'Not Visited', accessor: 'notVisited' },
    { label: 'Time Taken', accessor: 'timeTaken' }
];

const SubmissionPage = ({ userId, examId, examAttemptId, setIsSubmission, setIsSubmit }) => {
    const [getExamStatistic] = useGetExamStatisticMutation();
    const [examStatisticData, setExamStatisticData] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let result = await getExamStatistic({ userId, examId, examAttemptId });
            setExamStatisticData(result?.data?.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmitQuiz = () => {
        setIsSubmit(true);
        setIsSubmission(false);
    };

    const handleQuitClick = () => {
        setIsSubmit(false);
        setIsSubmission(false);
    };

    return (
        <>
            {examStatisticData ? (
                <Box sx={{ alignItems: 'center' }}>
                    <TableContainer sx={{ marginTop: '100px', border: '1px solid rgba(0, 0, 0, 0.12)', mx: { xl: '50px', md: '40px', sm: '30px', xs: '20px' }, width: 'auto' }}>
                        <Table aria-label="quiz details table">
                            <TableHead>
                                <TableRow >
                                    {tableHeaders.map((header, index) => (
                                        <TableCell key={index} sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', fontWeight: 'bold', textAlign: 'center', fontSize: { xs: '11px', sm: '12px', md: '13px', xl: '14px', padding: '5px' } }}>{header.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {examStatisticData?.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {tableHeaders.map((header, colIndex) => (
                                            <TableCell key={colIndex} sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', fontSize: { xs: '9px', sm: '10px', md: '12px', xl: '14px' }, padding: '10px' }}>
                                                {header.isPart ? `Part ${row[header.accessor]}` : row[header.accessor]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '13px', sm: '15px', md: '17px', xl: '20px' }, marginTop: 2 }}>
                        Are you sure you want to submit?
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: 2 }}>
                        <Button variant="contained" sx={{ fontSize: { xs: '9px', sm: '10px', md: '12px', xl: '14px' } }} color="warning" onClick={handleSubmitQuiz}>
                            Submit
                        </Button>
                        <Button variant="outlined" sx={{ fontSize: { xs: '9px', sm: '10px', md: '12px', xl: '14px' } }} color="primary" onClick={handleQuitClick}>
                            No, Go Back To Quiz
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: `calc(100vh - 60px)` }}>
                    <CircularProgress />
                </Box>
            )}
        </>
    );
};

export default SubmissionPage;
