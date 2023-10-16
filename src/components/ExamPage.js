import React, { useContext, useEffect} from 'react'
import { Context } from '../Context';
import Question from './Question';
// import { onSnapshot, collection } from 'firebase/firestore';
// import { doc, getDoc, getDocs, collection, onSnapshot, query, where } from 'firebase/firestore';
import CountDownTimer from './CountDownTimer';
import QuestionModal from './QuestionModal';

// import db from '../Firebase';
// import Firebase from '../Firebase';

export default function ExamPage() {



    // const [data, setData]=useState([]);

    const { examQuestions } = useContext(Context);
    // useEffect(() => {
    //     getStudents()




    //     // db.collection('questions').onSnapshot((snapshot) => {
    //     //     console.log(snapshot);
    //     //     // const questionData = [];
    //     //     // snapshot.array.forEach((doc) => questionData.push({ ...doc.data(), id: doc.id }))
    //     //     // console.log(questionData);
    //     // });

    //     //  ********************

    //     // const students = async () => {
    //     //     const querySnapshot = await getDocs(collectionRef);
    //     //     return querySnapshot
    //     // }

    //     // //        console.log(Array.isArray(querySnapshot._snapshot.docChanges));//  true
    //     // students.forEach(doc => {
    //     //     console.log(doc.data());
    //     // })
    //     // **********************

    // }, []);

    const { tries, selectedPoints, score, getExamQuestions, } = useContext(Context);

    useEffect(() => {
        getExamQuestions();
    }, [])

    return (
        <div>
            <CountDownTimer />
            <h2>Tries left: {tries}</h2>
            <h2>Total score:  <span className='gray'>{selectedPoints}</span> / {score}</h2>
            <div className="question-container">
                {examQuestions.map((question) => {
                    return <Question key={question.id} data={question}  ></Question>
                })
                }
            </div>
            <QuestionModal/>
        </div>
    )
}
