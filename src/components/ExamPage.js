import React, { useContext, useEffect } from 'react'
import { Context } from '../Context';
import Question from './Question';
// import { onSnapshot, collection } from 'firebase/firestore';
// import { doc, getDoc, getDocs, collection, onSnapshot, query, where } from 'firebase/firestore';
import CountDownTimer from './CountDownTimer';
import QuestionModal from './QuestionModal';
import { Button } from '@mui/material';

export default function ExamPage() {

    const { examQuestions, onFinish } = useContext(Context);

    const { tries, selectedPoints, score, getExamQuestions, } = useContext(Context);

    //getting exam questions from friestore when component mount and  set data into examQuestions 
    useEffect(() => {
        getExamQuestions();
    }, [])

    return (
        <div>
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
