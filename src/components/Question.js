import { useContext, useEffect, useState } from 'react';
import './question.css';
import { Context } from '../Context';
// import QuestionModal from './QuestionModal';


function Question({ data }) {
  const [isOpened, setIsOpened] = useState(data.isOpened);
  // const [isAnswered, setIsAnswered] = useState(data.isAnswered);

  const {
    // inProcessQuestion,setInProcessQuestion,
    // isOpened,setIsOpened,
    handleConfirmDialogOpen, examQuestions,
    setSelectedPoints, selectedPoints,
    setTries, tries,
    handleQuestionModalOpen,
    questionModalState, setDataQ, dataQ,
    onOpenQuestion,
    // countDown, setCountDown,
    modalObject, setModalObject,
    // studentObject,
    setStudentObject,
    // handleConfirmModalOpen,
    // handleConfirmModalClose
  } = useContext(Context);
  // data=questionList

  // setIsOpened(data.isOpened);

  // useEffect(() => {
  //   // console.log(examQuestions);
  //   setIsOpened(data.isOpened);
  //   // }, [examQuestions]);
  // }, []);

  // const timerRefreshForAlert = () => {
  //   // debugger
  //   let pauseTime = new Date().getTime();
  //   let start = JSON.parse(localStorage.getItem('startTime'));
  //   const difference = Math.floor((pauseTime - start) / 1000);
  //   let newTimer = Math.round(countDown - difference);
  //   setCountDown(newTimer);
  // }
  // useEffect(() => {

  // }, [questionModalState])

  // function onOpenQuestion(data) {
  //   console.log({ data });
  //   if (!data.isAnswered) {
  //     if (data.id !== modalObject.id) {
  //       setModalObject(data);
  //     }

  //     if (!data.isOpened) {

  //       if (tries >= 1) {
  //         // setInProcessQuestion(data)
  //         handleConfirmDialogOpen();

  //         // // eslint-disable-next-line no-restricted-globals
  //         // // if (!confirm('Are you sure you want to open this question?')) {
  //         // //   timerRefreshForAlert();
  //         // //   return;
  //         // // } 


  //         // true && console.log('sdsdsdsdsdsdsdsds');

  //         setIsOpened(true);
  //         setSelectedPoints(selectedPoints + data.points)
  //         setTries(tries - 1);
  //         // // console.log({ modalObject });
  //         // // console.log({ studentObject });
  //         // // 1
  //         setStudentObject(studentObject => ({ ...studentObject, ...modalObject }))

  //         // timerRefreshForAlert()
  //         // handleConfirmModalOpen();

  //         // handleQuestionModalOpen();
  //       } else {
  //         alert('You reached limit of tries');
  //       }
  //     } else {
  //       handleQuestionModalOpen();
  //     }

  //   } else { alert('You already answered to this question') }

  // }
  function onOpen() {
    setDataQ({ ...data });
    //  handleConfirmDialogOpen();
    onOpenQuestion();
  }




  return (
    <div onClick={() => onOpen(data)} className={"box box-" + data.points + (isOpened ? ' opened' : '')}>
      {data.points}
      {/* <QuestionModal data={data} /> */}
    </div>
  );
}

export default Question;
