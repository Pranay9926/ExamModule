import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddQuestionBank from './components/AddQuestionBank';
import ResultComponent from './components/exam/ResultComponent';
import ExamScheduling from './components/ExamScheduling';
import ManageQuestionsComponent from './components/ManageQuestionsComponent';
import PermissionUserExam from './components/PermissionUserExam';
import QuestionBankComponent from './components/QuestionBankComponent';
import UserExamModuel from './components/UserExamModuel';
import AdminDashboard from './pages/AdminDashboard';
import ReviewPage from './pages/ReviewPage';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/ExamForm" element={<ExamScheduling />} />
        <Route path="/addquestion" element={<QuestionBankComponent />} />
        <Route path="/addQuestionBank" element={<AddQuestionBank />} />
        <Route path="/manageQuestions" element={<ManageQuestionsComponent />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/:userId/exam/:examId" element={<PermissionUserExam />} />
        <Route path="/user/:userId/exam/:examId/assessment/:examAttemptId" element={<UserExamModuel />} />
        <Route path="/user/:userId/exam/:examId/review" element={<ReviewPage />} />
        <Route path="/user/:userId/exam/:examId/result" element={<ResultComponent />} />

      </Routes>

    </div>
  );
}

export default App;
