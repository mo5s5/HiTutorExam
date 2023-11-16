import { useContext, useEffect, useState } from 'react';
import './question.css';
import { Context } from '../Context';
// import QuestionModal from './QuestionModal';


function Question({ data }) {
  const [isOpened, setIsOpened] = useState(data.isOpened);
  const [isAnswered, setIsAnswered] = useState(data.isAnswered);
  const { setSelectedPoints, selectedPoints,
    setTries, tries,
    handleModalOpen,
    countDown, setCountDown,
    modalObject, setModalObject,
    studentObject, setStudentObject } = useContext(Context);
  // data=questionList

  useEffect(() => {
    setIsOpened(data.isOpened);
  }, []);

  const timerRefreshForAlert = () => {
    debugger
    let pauseTime = new Date().getTime();
    let start = JSON.parse(localStorage.getItem('startTime'));
    const difference = Math.floor((pauseTime - start) / 1000);
    let newTimer = Math.round(countDown - difference);
    setCountDown(newTimer);
  }


  function onOpenQuestion(data) {
    console.log({ data });
    if (!data.isAnswered) {
      if (data.id !== modalObject.id) {
        setModalObject(data);
      }

      if (!data.isOpened) {
        if (tries >= 1) {


          // eslint-disable-next-line no-restricted-globals
          if (!confirm('Are you sure you want to open this question?')) {
            timerRefreshForAlert();
            return;
          }
          setIsOpened(true);
          setSelectedPoints(selectedPoints + data.points)
          setTries(tries - 1);
          // console.log({ modalObject });
          // console.log({ studentObject });
          // 1
          setStudentObject(studentObject => ({ ...studentObject, ...modalObject }))

          timerRefreshForAlert()
          handleModalOpen();
        } else {
          alert('You reached limit of tries');
        }
      } else {
        handleModalOpen();
      }

    } else { alert('You already answered to this question') }

    

  }

  return (
    <div onClick={() => onOpenQuestion(data)} className={"box box-" + data.points + (isOpened ? ' opened' : '')}>
      {data.points}
      {/* <QuestionModal data={data} /> */}
    </div>
  );
}

export default Question;
