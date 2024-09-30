// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     Button,
//     Box,
//     Typography,
//     Checkbox,
//     FormControlLabel,
//     Avatar,
//     Divider
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// // Avatar image (replace with your image import or a URL)
// import userImage from '../assets/images/userAvtar.png'; // Example placeholder

// const PermissionUserExam = ({ open, handleClose, exam }) => {
//     const [isChecked, setIsChecked] = useState(false);

//     // Handle checkbox toggle
//     const handleCheckboxChange = (event) => {
//         setIsChecked(event.target.checked);
//     };

//     return (
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" scroll="body">
//             {/* Header section */}
//             <Box sx={{ bgcolor: '#f97316' }}>
//                 <Button onClick={handleClose}>
//                     <CloseIcon sx={{ color: 'white' }} />
//                 </Button>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f97316', p: 2 }}>
//                 <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
//                     {exam.examName}
//                 </Typography>
//                 <Avatar src={userImage} alt="User Avatar" sx={{ width: 50, height: 50 }} />

//             </Box>

//             {/* Main Content */}
//             <DialogContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                         Total Duration:
//                     </Typography>
//                     <Typography sx={{ color: '#f97316', fontWeight: 'bold' }}>
//                         {exam.duration}
//                     </Typography>
//                 </Box>

//                 {/* Exam instructions or content */}
//                 <DialogContentText sx={{ textAlign: 'center', color: '#777', minHeight: '200px', border: '1px dashed #ddd', p: 2 }}>
//                     Exam Instructions and Guidelines will go here.
//                 </DialogContentText>

//                 {/* Declaration checkbox */}
//                 <Box sx={{ mt: 4 }}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
//                         Declaration:
//                     </Typography>
//                     <FormControlLabel
//                         control={
//                             <Checkbox
//                                 checked={isChecked}
//                                 onChange={handleCheckboxChange}
//                                 name="declaration"
//                                 sx={{
//                                     color: '#f97316',
//                                     '&.Mui-checked': { color: '#f97316' },
//                                 }}
//                             />
//                         }
//                         label="I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else’s advantage will lead to my immediate disqualification. The decision of the administrator will be final in these matters and cannot be appealed."
//                     />
//                 </Box>
//             </DialogContent>

//             <Divider />

//             {/* Footer buttons */}
//             <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
//                 {/* "I am ready to begin" Button */}
//                 <Button
//                     variant="contained"
//                     disabled={!isChecked} // Disable the button until the checkbox is checked
//                     sx={{
//                         bgcolor: isChecked ? '#f97316' : '#fbbf24',
//                         color: 'white',
//                         textTransform: 'none',
//                         borderRadius: '20px',
//                         px: 3,
//                         py: 1.5,
//                         fontWeight: 'bold',
//                         '&:hover': {
//                             bgcolor: isChecked ? '#f97316' : '#fbbf24',
//                         },
//                     }}
//                 >
//                     I am ready to begin
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default PermissionUserExam;











import React, { useState } from 'react';
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Avatar,
    Divider,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// Avatar image (replace with your image import or a URL)
import userImage from '../assets/images/userAvtar.png'; // Example placeholder

const exam = {
    examName: 'March DV Test',
    subjectName: "Maths",
    time: 'Anytime',
    mode: 'Online',
    duration: '00:30:00',
    status: 'Available'
}

const img = userImage;
const name = "pranay shukla";


const PermissionUserExam = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const getInitials = (name) => {
        return name
            ? name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
            : '';
    };

    // Handle checkbox toggle
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    // Handle exam start
    const handleStartExam = () => {
        if (isChecked) {
            // console.log(window.location.href, window.location.pathname)
            // Navigate to the exam page
            navigate(`${window.location.pathname}/assisment`); // Replace with your actual exam route
        }
    };

    return (
        <>
            <Box sx={{ bgcolor: '#f97316', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography variant="h7" sx={{ color: "white", fontWeight: 'bold' }}>
                    {exam.examName}
                </Typography>
                <Button onClick={() => navigate(-1)}>
                    <CloseIcon sx={{ color: 'white' }} />
                </Button>
            </Box>
            <Box sx={{ width: '100%', bgcolor: '#f4f5f7', height: `calc(100vh - 52px)`, p: 2 }}>
                {/* Header section */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {exam.examName}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Total Duration:
                        </Typography>
                        <Typography sx={{ color: '#f97316', fontWeight: 'bold' }}>
                            {exam.duration}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {img ? (
                            <Avatar src={img} sx={{ width: 60, height: 60 }} />
                        ) : (
                            <Avatar sx={{ width: 60, height: 60, backgroundColor: '#f97316', fontWeight: 'bold' }}>
                                {getInitials(name)}
                            </Avatar>
                        )}
                        <Box className='text-black text-start ml-2 hidden sm:block'>
                            <Typography className="text-[12px] xl:text-[14px] font-semibold 2xl:text-[16px]">
                                {name}
                            </Typography>
                            <Typography className="text-[10px] xl:text-[12px] 2xl:text-[12px] font-light">
                                {"pranay.shukla@hiteshi.com"}
                            </Typography>
                        </Box>

                    </Box>

                </Box>

                {/* Main Content */}
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Instructions :-
                        </Typography>
                        {/* <Typography sx={{ color: '#f97316', fontWeight: 'bold' }}>
                            {exam.duration}
                        </Typography> */}
                    </Box>

                    {/* Exam instructions or content */}
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: '#777',
                            minHeight: '400px',
                            border: '1px dashed #ddd',
                            p: 2,
                            mb: 3
                        }}
                    >
                        Exam Instructions and Guidelines will go here.
                    </Typography>

                    {/* Declaration checkbox */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Declaration:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    name="declaration"
                                    sx={{
                                        color: '#f97316',
                                        '&.Mui-checked': { color: '#f97316' },
                                    }}
                                />
                            }
                            label="I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else’s advantage will lead to my immediate disqualification. The decision of the administrator will be final in these matters and cannot be appealed."
                        />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Footer buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            disabled={!isChecked} // Disable the button until the checkbox is checked
                            sx={{
                                bgcolor: isChecked ? '#f97316' : '#fbbf24',
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: '20px',
                                px: 3,
                                py: 1.5,
                                fontWeight: 'bold',
                                '&:hover': {
                                    bgcolor: isChecked ? '#f97316' : '#fbbf24',
                                },
                            }}
                            onClick={handleStartExam}
                        >
                            I am ready to begin
                        </Button>
                    </Box>
                </Box>
            </Box >
        </>


    );
};

export default PermissionUserExam;
