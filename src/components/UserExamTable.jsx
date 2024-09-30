import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ComputerIcon from '@mui/icons-material/Computer';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CommonTable from '../common/CommonTable';
import PermissionUserExam from './PermissionUserExam';

const UserExamTable = ({ Value }) => {


    const [openModal, setOpenModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    const handleOpenModal = (exam) => {
        setSelectedExam(exam);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedExam(null);
    };



    // Define headers for the table
    const headers = [
        { label: '', accessor: 'index' },
        { label: 'Exam Name', accessor: 'examNameWithStatus' },
        // { label: '', accessor: 'statusIcons' }, // Mode and Time Icons
        { label: 'Status', accessor: 'status' },
        { label: '', accessor: 'actions' } // Actions (Attempt, Past Attempts)
    ];
    console.log("in", Value);
    // Sample data for the exams
    const data = [
        {
            examName: 'March DV Test',
            subjectName: "Maths",
            time: 'Anytime',
            mode: 'Online',
            duration: '00:30:00',
            status: 'Available'
        },
        {
            examName: 'March PD 1 & PD2 Test 9',
            subjectName: "English",
            time: 'ByToday',
            mode: 'Online',
            duration: '00:45:00',
            status: 'Available'
        },
        {
            examName: 'Nov PD Test 24',
            subjectName: "Hindi",
            time: 'Anytime',
            mode: 'Online',
            duration: '00:30:00',
            status: 'Available'
        }
    ];

    const handleAttempt = (e) => {
        console.log(e);
    }

    // Render the action buttons
    const renderActions = (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, p: 3 }}>
            {Value === 0 ? <>
                <Box
                    component="a"
                    href={`/user/${1}/exam/${1}`} // The dynamic URL
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practices for new tabs
                    sx={{
                        display: 'inline-block',
                        textDecoration: 'none',
                        border: '1px solid #f97316',
                        color: '#f97316', // Orange color
                        borderRadius: '20px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        '&:hover': {
                            backgroundColor: '#f97316',
                            color: '#fff',
                        },
                    }}
                >
                    Attempt
                </Box>
            </> : <>
                <Button
                    variant="text"
                    color="warning"
                    size="small"
                    onClick={() => handleAttempt(row)}
                    sx={{ color: '#f97316' }} // Orange color
                >
                    Review
                </Button>
            </>}

        </Box>
    );

    // Render the status icons
    const renderStatusIcons = (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#777' }}>
            <PendingActionsIcon sx={{ color: '#f97316', fontSize: '18px' }} />
            <Typography variant="body2">{row.time}</Typography>
            <ComputerIcon sx={{ color: '#f97316', fontSize: '18px' }} />
            <Typography variant="body2">{row.mode}</Typography>
            <AccessTimeIcon sx={{ color: '#f97316', fontSize: '18px' }} />
            <Typography variant="body2">{row.duration}</Typography>
        </Box>
    );

    // Combine exam name and status in one column
    const renderExamNameWithStatus = (row) => (
        <Box>
            <Typography variant="h6" sx={{ color: '#1e293b', mb: 1 }}>
                {row.examName}
            </Typography>
            <Typography sx={{ color: '#1e293b', mb: 2 }}>
                {row.subjectName}
            </Typography>
            {renderStatusIcons(row)} {/* Status icons displayed under exam name */}
        </Box>
    );

    // Transform the data to fit the table requirements
    const transformedData = data.map((exam, index) => ({
        index: `${index + 1}.`,
        examNameWithStatus: renderExamNameWithStatus(exam), // Combine exam name and status
        ...exam,
        actions: renderActions(exam),
    }));

    return (
        <>
            <Box>
                <CommonTable
                    headers={headers}
                    data={transformedData}
                    totalRecords={data.length}
                    page={0}
                    rowsPerPage={10}
                    onPageChange={() => { }} // Pagination handler
                    onRowsPerPageChange={() => { }} // Rows per page change handler
                    style={{
                        paper: { boxShadow: 'none' },
                        headerCell: { fontWeight: 'bold', color: '#f97316', backgroundColor: '#fef4e9' },
                        bodyCell: { color: '#333' }
                    }}
                />
            </Box>
            <Box>
                {selectedExam && (
                    <PermissionUserExam
                        open={openModal}
                        handleClose={handleCloseModal}
                        exam={selectedExam}
                    />
                )}
            </Box>
        </>
    );
};

export default UserExamTable;
