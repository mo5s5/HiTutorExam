import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context';
import Question from './Question';
// import { onSnapshot, collection } from 'firebase/firestore';
// import { doc, getDoc, getDocs, collection, onSnapshot, query, where } from 'firebase/firestore';
import CountDownTimer from './CountDownTimer';
import QuestionModal from './QuestionModal';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addExamQuestionsReducer, closeUpdateQuestionsReducer } from '../redux/examSlice';


export default function ExamPage() {

    const { examQuestions, onFinish } = useContext(Context);
    const dispatch = useDispatch();
    const questions = useSelector(state => state.addExamQuestionsReducer.examQuestions);

    const { tries,
        selectedPoints, setSelectedPoints,
        score, getExamQuestions,
        examFirstMount, setExamFirstMount, setExamQuestions
    } = useContext(Context);
    //  const[examFirstMount, setExamFirstMount]=useState(true);

    // const localQuestions = useSelector(state => state.addExamQuestionReducer)

    //getting exam questions from friestore when component mount and  set data into examQuestions 
    useEffect(() => {
        const firstMount = localStorage.getItem('examFirstMount');
        if (!firstMount) {
            getExamQuestions();
        } else {
            console.log('Second Mount');
            const localQuestions = JSON.parse(localStorage.getItem('questions'))
            setExamQuestions(localQuestions);
            const localSelectedPoints = JSON.parse(localStorage.getItem('selctedPoints'))
            setSelectedPoints(localSelectedPoints);
        }

        // dispatch(addExamQuestionsReducer( examQuestions ))
        // setExamFirstMount(false);

        //     console.log('fisrt mount');
        //     localStorage.setItem('examFirstMount', JSON.stringify('inch vor ban '))


        //     // console.log(localStorage.getItem('firstMount'));
        // }
        // else {
        //     // console.log(firstMount);
        //     console.log('Second Mount');
        //     localStorage.getItem()
        // }


    }, [])

    return (
        <div style={{ marginLeft: 100, maxWidth: 900 }}>
            <CountDownTimer />
            <h2>Tries left: {tries}</h2>
            <h2>Total score:  <span className='gray'>{selectedPoints}</span> / {score}</h2>
            <Button
                variant='contained'
                color='error'
                sx={{
                    position: "fixed",
                    top: 70,
                    right: 40,
                    // backgroundcolor :'red'
                }}
                onClick={() => onFinish()}
            >
                Finish</Button>
            <div className="question-container">
                {examQuestions.map((question) => {
                    return <Question key={question.id} data={question}  ></Question>
                })
                }
            </div>
            <QuestionModal />
        </div>
    )
}
