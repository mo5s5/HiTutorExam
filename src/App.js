import { useEffect, useState } from 'react';
import './App.css';
import { Context } from './Context';

import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import db from './Firebase';
import { addDoc, getDocs, collection, getFirestore, doc, updateDoc } from 'firebase/firestore';
import Start from './components/Start';
import ExamPage from './components/ExamPage';



function App() {

  const navigate = useNavigate();                     // for navigation between pages without <a> or <Link> tag

  const [tries, setTries] = useState(5);
  const [selectedPoints, setSelectedPoints] = useState(0)
  const [score, setScore] = useState(0);
  // const [questionOpenState,setQuestionOpenState] = useState(false)
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [examQuestions, setExamQuestions] = useState([]);
  const [modalObject, setModalObject] = useState({});

  const studentsRef = collection(db, "students");                  // make ref for firebase
  const questionsRef = collection(db, 'questions');

  const [answer, setAnswer] = useState('');


  const [studentObject, setStudentObject] = useState({                    // in student object we will store all data about student. later we will show to teacher information from this object  
    email: "",
    name: "",
    questions: [{}]
  })



  const [modalState, setModalState] = useState(false);  // state to decide open modal or not
  const handleModalOpen = () => {
    setModalState(true);
  }
  const handleModalClose = () => {
    setModalObject({});                                 // make  modalObject plain because if otherwise nex time it will open the same modal 
    setAnswer('');
    setModalState(false);                                 // close modal window

  }


  useEffect(() => {
    getStudents();
  }, []);


  const uploadAndNavigate = async () => {
    await addDoc(studentsRef, studentObject);
    // getStudents();

    // console.log({ studentObject });
    navigate('/start')
  }


  const getStudents = async () => {
    const querySnapshot = await getDocs(studentsRef);
    const studentsArray = [];
    querySnapshot.forEach(doc => {
      studentsArray.push(doc.data());
    })

    // setExamQuestions(studentsArray)
  }

  const getExamQuestions = async () => {
    const querySnapshot = await getDocs(questionsRef);
    const examQuestionsArray = [];
    querySnapshot.forEach(doc => {
      examQuestionsArray.push({ ...doc.data(), id: doc.id });
      setExamQuestions(examQuestionsArray);
    })
    // console.log({ examQuestionsArray });
  }


  const closeAnswer = () => {
    let updateExamQuestion = examQuestions.map((q) => {
      if (q.id === modalObject.id) {
        return { ...q, isOpened: true };
      }
      return q
    })
    setExamQuestions(updateExamQuestion)
    handleModalClose();

  }

  const submitAnswer = () => {
    // console.log({ answer });
    // debugger
    console.log({ studentObject });
    let q = studentObject.questions;
    console.log({ q });
    // studentObject => ({ ...studentObject, ...modalObject })
    // setStudentObject(...studentObject,studentObject.questions.push({
    setStudentObject(studentObject=>({...studentObject,...studentObject.questions.push({

      question: modalObject,
      answer: answer
    })}))
    console.log({studentObject});
    handleModalClose();

  }



  return (
    <Context.Provider value={{
      tries, setTries, selectedPoints, setSelectedPoints, score,
      // onStart,
      uploadAndNavigate,
      studentName, studentEmail, setStudentEmail, studentObject, setStudentObject, studentsRef, examQuestions,
      setStudentName, getExamQuestions, modalState, setModalState,
      handleModalClose, handleModalOpen, modalObject, setModalObject,
      closeAnswer, submitAnswer, answer, setAnswer
    }}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/start' element={<Start />} />
          <Route path='/exam-page' element={<ExamPage />} />
        </Routes>
      </div>
    </Context.Provider>

  );
}

export default App;
