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
  const [tries, setTries] = useState(5);
  const [selectedPoints, setSelectedPoints] = useState(0)
  const [score, setScore] = useState(0);
  // const [questionOpenState,setQuestionOpenState] = useState(false)
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [examQuestions, setExamQuestions] = useState([]);
  const [modalObject, setModalObject] = useState({});

  const studentsRef = collection(db, "students");
  const questionsRef = collection(db, 'questions');

  const [answer, setAnswer] = useState('');


  const [studentObject, setStudentObject] = useState({
    email: "",
    name: "",
    questions: [{}]
  })



  const [modalState, setModalState] = useState(false);
  const handleModalOpen = () => setModalState(true);
  const handleModalClose = () => {
    setModalObject({});
    setAnswer('');
    setModalState(false);

  }

  const navigate = useNavigate();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  useEffect(() => {
    getStudents();
  }, []);


  const uploadAndNavigate= async()=> {
    await addDoc(studentsRef, studentObject);
                // getStudents();

                console.log({ studentObject });
                navigate('/start')
  }

  // const onStart = async (studentName, studentEmail) => {
  //   if (studentName && studentEmail) {
  //     if (!emailPattern.test(studentEmail)) { alert('email required') }
  //     else {
  //       const student = {
  //         name: studentName,
  //         email: studentEmail
  //       }
  //       setStudentObject(studentObject.name = studentName)
  //       setStudentObject(studentObject.email = studentEmail)
  //       console.log({ student });
  //       await addDoc(studentsRef, student);
  //       // getStudents();

  //       console.log({ studentObject });
  //       navigate('/start')
  //     }
  //   }
  //   else console.log('please fill the fields');
  // }

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
    console.log({ examQuestionsArray });
  }

  // function onOpenQuestion(data) {
  //   if (!data.isAnswered) {
  //     setSelectedPoints(selectedPoints + data.points)
  //     setTries(tries - 1);
  //   }
  //   handleModalOpen();
  // }

  const closeAnswer = () => {
    let updateExamQuestion = examQuestions.map((q) => {
      if (q.id === modalObject.id) {
        return { ...q, isOpened: true };
      }
      return q
    })
    setExamQuestions(updateExamQuestion)
    handleModalClose();
    // let openedQuestion = examQuestions.filter((q) => q.id === modalObject.id)

    // const docRef = doc(db, "questions", modalObject.id)
    // // setModalObject(modalObject.isOpened = true)
    // const data = {
    //   isOpened: true
    // }
    // updateDoc(docRef, data).then(docRef => { console.log("doc updated") })
    //   .catch(error => { console.log(error); })
  }

  const submitAnswer = () => {
    // console.log({ answer });
    let q = studentObject.questions
    console.log({ q });
    setStudentObject(studentObject.questions.push({
      question: modalObject,
      answer: answer
    }))
    console.log(studentObject);
    handleModalClose();

  }



  return (
    <Context.Provider value={{
      tries, setTries, selectedPoints, setSelectedPoints, score, 
      // onStart,
      uploadAndNavigate,
      studentName, studentEmail, setStudentEmail, studentObject,setStudentObject, studentsRef, examQuestions,
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
