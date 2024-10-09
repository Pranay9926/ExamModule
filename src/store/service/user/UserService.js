// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '..'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUserExamData: builder.query({
            query: ({ userId, ExamType, page, rowsPerPage }) => `student/${userId}/exams?examType=${ExamType}&size=${rowsPerPage}&page=${page}`,
        }),
        getAttemptedId: builder.query({
            query: ({ userId, examId }) => `student/${userId}/exam/${examId}/initiateExam`,
        }),
        getExamQuestions: builder.mutation({
            query: ({ userId, examAttemptId, partId, rowsPerPage, page }) => ({
                url: `student/${userId}/examQuestions?examAttemptId=${examAttemptId}&partId=${partId}&page=${page}&size=${rowsPerPage}`,
                method: 'GET',
            })
        }),
        UploadExamQuestions: builder.mutation({
            query: ({ userId, payloadData }) => ({
                url: `student/${userId}/examQuestions`,
                method: 'POST',
                body: payloadData
            })
        }),
        AddExamData: builder.mutation({
            query: (payload) => ({
                url: 'exams',
                method: 'POST',
                body: payload
            })
        }),
        UpdateExamData: builder.mutation({
            query: ({ data, id }) => ({
                url: `exams/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        getExamResult: builder.mutation({
            query: ({ userId, examId, examAttemptId }) => ({
                url: `student/${userId}/exam/${examId}/submitExam?attemptId=${examAttemptId}`,
                method: 'POST'
            })
        }),
        getReviewAnswerSheet: builder.mutation({
            query: () => ({
                url: `student/7/exam/105/reviewExam?partId=B&size=1`,
                method: 'GET'
            })
        }),
        getReviewExamQuestion: builder.mutation({
            query: ({ userId, examId }) => ({
                url: `student/${userId}/exam/${examId}/reviewExam?partId=B&size=1&review=1`,
                method: 'GET'
            })
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserExamDataQuery, useGetAttemptedIdQuery, useGetExamQuestionsMutation, useUploadExamQuestionsMutation, useAddExamDataMutation, useUpdateExamDataMutation, useGetExamResultMutation, useGetReviewAnswerSheetMutation, useGetReviewExamQuestionMutation } = userApi