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
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserExamDataQuery, useGetAttemptedIdQuery, useGetExamQuestionsMutation, useAddExamDataMutation, useUpdateExamDataMutation, } = userApi