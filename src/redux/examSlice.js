import { createSlice } from '@reduxjs/toolkit';



// const examSlice = createSlice({
//     name: 'examQuestions',
//     initialState: {
//         examQuestions: []
//     }, reducers: {
//         addExamQuestionsReducer(state, action) {
//             state.examQuestions.push({
//                 id: new Date().toISOString(),
//                 questions: [...action.payload],
//             });

//             console.log(state.examQuestions);
//         }
//     }
// })

const examSlice = createSlice({
    name: 'examQuestions',
    initialState: {
        examQuestions: [],
    },
    reducers: {
        addExamQuestionsReducer(state, action) {
            // const newQuestion = {
            //     id: new Date().toISOString(),
            //     // questions: [...action.payload.examQuestionsArray],
            //     questions: [...action.payload.examQuestions],

            // };
            return { ...state, examQuestions: [...state.examQuestions, ...action.payload] }
            // state.examQuestions = [...state.examQuestions, ...newQuestion];
            // console.log(state.examQuestions);
        },
        closeUpdateQuestionsReducer(state, action) {
            // const newQuestion = {
            //     id: new Date().toISOString(),
            //     questions: [...action.payload.examQuestion],
            // };
            return { ...state, examQuestions: [...state.examQuestions, ...action.payload] }
            // state.examQuestions = [...state.examQuestions, ...newQuestion];

        }


    }
})


export const { addExamQuestionsReducer, closeUpdateQuestionsReducer } = examSlice.actions;
export default examSlice.reducer;