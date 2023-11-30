import { useEffect, useState } from 'react';
import './App.css';
import { Context } from './Context';

import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import db from './Firebase';
import { addDoc, getDocs, collection, getFirestore, doc, updateDoc } from 'firebase/firestore';
import Start from './components/Start';
import ExamPage from './components/ExamPage';
import EndPage from './components/EndPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminPage from './components/admin/AdminPage';
// import { useDispatch, useSelector } from 'react-redux';
// import { addExamQuestionsReducer, closeUpdateQuestionsReducer } from './redux/examSlice';
// import storage from 'redux-persist/lib/storage';



function App() {

  // const dispatch = useDispatch();
  // const examQuestionSelector = useSelector(state => state.addExamQuestionsReducer.examQuestions)

  const navigate = useNavigate();                     // for navigation between pages without <a> or <Link> tag
  const [countDown, setCountDown] = useState(3600);
  const [tries, setTries] = useState(5);
  const [selectedPoints, setSelectedPoints] = useState(0)
  const [score, setScore] = useState(0);
  // const [questionOpenState,setQuestionOpenState] = useState(false)
  const [studentName, setStudentName] = useState('');
  // const [studentEmail, setStudentEmail] = useState('');
  const [examQuestions, setExamQuestions] = useState([]);
  const [modalObject, setModalObject] = useState({});

  const studentsRef = collection(db, "students");                  // make ref for firebase
  const questionsRef = collection(db, 'questions');

  const [answer, setAnswer] = useState('');
  // const [examFirstMount, setExamFirstMount] = useState(true);

  // const [confirmModalState, setConfirmModalState] = useState(false);


  const [studentObject, setStudentObject] = useState({                    // in student object we will store all data about student. later we will show to teacher information from this object  
    email: "",
    name: "",
    questions: [{}]
  })



  const [questionModalState, setQuestionModalState] = useState(false);  // state to decide open modal or not





  /// Alert Dialog Part

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAnswer, setConfirmDialogAnswer] = useState(false);
  // const [isOpened, setIsOpened] = useState();
  const [inProcessQuestion, setInProcessQuestion] = useState({});
  const [dataQ, setDataQ] = useState({});

  const onOpenQuestion = () => {
    console.log({ dataQ });
    if (!dataQ.isAnswered) {
      if (dataQ.id !== modalObject.id) {
        setModalObject(dataQ);
      }
      if (!dataQ.isOpened) {
        if (tries >= 1) {
          handleConfirmDialogOpen();
        } else {
          alert('You reached limit of tries');
        }
      } else {
        handleQuestionModalOpen();
      }
    } else { alert('You already answered to this question') }

  }


  const onSubmitDialog = () => {
    refreshParameters();
    handleConfirmDialogClose();
    // let dt = { ...dataQ, isOpened: true };
    // setDataQ(dt);
    // refreshParameters()


    handleQuestionModalOpen();

    // onOpenQuestion();
  }


  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    // setTries(tries+1)                           // ************* KASTIL *******************
    setConfirmDialogOpen(false);
  };

  const refreshParameters = () => {
    // setIsOpened(true);
    // debugger;
    setSelectedPoints(selectedPoints + dataQ.points)
    setTries(tries - 1);
    setStudentObject(studentObject => ({ ...studentObject, ...modalObject }))

    // for (let i = 0; i < examQuestions.length; i++) {
    //   if (dataQ.id === examQuestions[i].id) {
    //     // let dt = { ...dataQ, isOpened: true };
    //     let dt = { ...dataQ };
    //     dt.isOpened = true;
    //     console.log({ dt });
    //     setDataQ({ ...dt })
    //     let eX = [...examQuestions];
    //     eX[i] = { ...dataQ };
    //     console.log({ dataQ });
    //     console.log({ eX });
    //     setExamQuestions([...eX]);
    //     // setExamQuestions(examQuestions[i])
    //     console.log(examQuestions);
    //   }
    // }
    const updatedQuestions = examQuestions.map(question => {
      if (question.id === dataQ.id) {
        return { ...question, isOpened: true };
      } else {
        return question;
      }
    });
    setExamQuestions(updatedQuestions);
    handleQuestionModalOpen();
  }

  ////

  const handleQuestionModalOpen = () => {
    // if (!modalObject.isOpened) {
    //   setInProcessQuestion({ ...inProcessQuestion, isOpened: true });
    //   setSelectedPoints(selectedPoints + inProcessQuestion.points);
    //   setTries(tries - 1);
    //   setStudentObject(studentObject => ({ ...studentObject, ...modalObject }))
    // }

    localStorage.setItem('tries', JSON.stringify(tries));
    setQuestionModalState(true);
  }

  const handleQuestionModalClose = () => {
    setModalObject({});                                 // make  modalObject plain because otherwise next time it will open the same modal 
    setAnswer('');
    setQuestionModalState(false);                                 // close modal window
  }


  useEffect(() => {
    getStudents();
  }, []);


  const getStudents = async () => {
    const querySnapshot = await getDocs(studentsRef);
    const studentsArray = [];
    querySnapshot.forEach(doc => {
      studentsArray.push(doc.data());
    })
  }

  const getExamQuestions = async () => {
    // const firstMount = localStorage.getItem('examFirstMount');
    // if (!firstMount) {
    const querySnapshot = await getDocs(questionsRef);
    const examQuestionsArray = [];
    querySnapshot.forEach(doc => {
      examQuestionsArray.push({ ...doc.data(), id: doc.id });
      // dispatch(addExamQuestionsReducer({ payload: examQuestionsArray }))
      setExamQuestions(examQuestionsArray);
      // console.log({...examQuestionSelector});
      localStorage.setItem('questions', JSON.stringify(examQuestionsArray.map(item => item)))
    })
    console.log('fisrt mount');
    localStorage.setItem('examFirstMount', JSON.stringify('inch vor ban '));

  }


  const closeAnswer = () => {
    let updateExamQuestion = examQuestions.map((q) => {
      if (q.id === modalObject.id) {
        return { ...q, isOpened: true };
      }
      return q
    })
    setExamQuestions(updateExamQuestion);
    // dispatch(closeUpdateQuestionsReducer({ updateExamQuestion }))
    localStorage.setItem('questions', JSON.stringify(updateExamQuestion));                                                //refresh localQuestions
    localStorage.setItem('selectedPoints', JSON.stringify(selectedPoints));

    // localStorage.setItem('score', JSON.stringify(score));
    handleQuestionModalClose();

  }

  const submitAnswer = () => {
    console.log({ studentObject });
    console.log({ modalObject });
    let updateScore = score + modalObject.points
    setScore(updateScore);
    localStorage.setItem('score', JSON.stringify(updateScore));
    let q = studentObject.questions;
    // console.log({ q });

    setStudentObject(studentObject => ({
      ...studentObject, ...studentObject.questions.push({
        question: modalObject,
        answer: answer
      })
    }))
    console.log({ studentObject });
    setModalObject({ ...modalObject, isAnswered: true })
    let updateExamQuestion = examQuestions.map((q) => {
      if (q.id === modalObject.id) {
        return { ...q, isOpened: true, isAnswered: true };
      }
      return q
    })
    setExamQuestions(updateExamQuestion);
    localStorage.setItem('questions', JSON.stringify(updateExamQuestion));
    // debugger;            
    console.log({ score });                                       //refresh localQuestions

    localStorage.setItem('selectedPoints', JSON.stringify(selectedPoints));
    localStorage.setItem('tries', JSON.stringify(tries));
    handleQuestionModalClose();

  }

  const onFinish = async () => {
    //shift firts object of studentObject.questions[]
    // update studentObject in firebase
    // stop countdown or move to another page 
    let updateStudentobject = studentObject;
    updateStudentobject.questions.shift();
    setStudentObject({ updateStudentobject })
    // console.log(studentObject);
    await addDoc(studentsRef, updateStudentobject);
    navigate('/end-page')
  }




  return (
    <Context.Provider value={{
      dataQ, setDataQ, onOpenQuestion, refreshParameters, onSubmitDialog,
      confirmDialogOpen, setConfirmDialogOpen, handleConfirmDialogOpen, handleConfirmDialogClose, confirmDialogAnswer, setConfirmDialogAnswer,
      // isOpened, setIsOpened, 
      inProcessQuestion, setInProcessQuestion,
      tries, setTries,
      selectedPoints, setSelectedPoints,
      score, setScore,
      countDown, setCountDown,
      // countDownRefresh,
      // confirmModalState, setConfirmModalState,
      // handleConfirmModalOpen, handleConfirmModalClose,
      // onStart,
      // navigateToStart,
      studentName, setStudentName,
      // studentEmail, setStudentEmail,
      // examFirstMount, setExamFirstMount,
      studentObject, setStudentObject, studentsRef,
      setExamQuestions, examQuestions,
      getExamQuestions, questionModalState, setQuestionModalState,
      handleQuestionModalClose, handleQuestionModalOpen, modalObject, setModalObject,
      closeAnswer, submitAnswer, answer, setAnswer, onFinish,
      navigate
    }}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/start' element={<Start />} />
          <Route path='/exam-page' element={<ExamPage />} />
          <Route path='/end-page' element={<EndPage />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-page' element={<AdminPage />} />
        </Routes>
      </div>
    </Context.Provider>

  );
}

export default App;
