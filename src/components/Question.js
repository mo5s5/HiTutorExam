import { useContext, useEffect, useState } from 'react';
import './question.css';
import { Context } from '../Context';
// import QuestionModal from './QuestionModal';


function Question({ data }) {
  const [isOpened, setIsOpened] = useState(data.isOpened);
  const [isAnswered, setIsAnswered] = useState(data.isAnswered);
  const { setSelectedPoints, selectedPoints, setTries, tries, handleModalOpen, modalObject, setModalObject, studentObject, setStudentObject } = useContext(Context);
  // data=questionList

  useEffect(() => {
    setIsOpened(data.isOpened);
  }, []);


  function onOpenQuestion(data) {

    if(!data.isAnswered){
      if (data.id !== modalObject.id) {
        setModalObject(data);
      }
  
      if (!data.isOpened) {
        if (tries >= 1) {
          // eslint-disable-next-line no-restricted-globals
          if (!confirm('Are you sure you want to open this question?')) {
            return;
          }
          setIsOpened(true);
          setSelectedPoints(selectedPoints + data.points)
          setTries(tries - 1);
          console.log({ modalObject });
          console.log({ studentObject });
          // debugger
          // 1
          setStudentObject(studentObject => ({ ...studentObject, ...modalObject }))
          
          // 2
          // setStudentObject(...studentObject, studentObject['questions'].push(modalObject))       
          
          // 3
          // setStudentObject({ ...studentObject, questions: [...studentObject.questions, modalObject] })
  
          handleModalOpen();
        } else {
          alert('You reached limit of tries');
        }
      } else {
        handleModalOpen();
      }
     
    } else {alert('You almost answered to this question')}
    

  }

  return (
    <div onClick={() => onOpenQuestion(data)} className={"box box-" + data.points + (isOpened ? ' opened' : '')}>
      {data.points}
      {/* <QuestionModal data={data} /> */}
    </div>
  );
}

export default Question;
