import { useContext, useEffect, useState } from 'react';
import './question.css';
import { Context } from '../Context';
// import QuestionModal from './QuestionModal';


function Question({ data }) {
  const [isOpened, setIsOpened] = useState(data.isOpened);
  const [isAnswered, setIsAnswered] = useState(data.isAnswered);
  const { setSelectedPoints, selectedPoints, setTries, tries, handleModalOpen, modalObject, setModalObject } = useContext(Context);
  // data=questionList

  useEffect(() => {
    setIsOpened(data.isOpened);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  function onOpenQuestion(data) {
    if(data.id!==modalObject.id){
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
        handleModalOpen();
      } else {
        alert('You reached limit of tries');
      }
    } else {
      handleModalOpen();
    }

  }

  return (
    <div onClick={() => onOpenQuestion(data)} className={"box box-" + data.points + (isOpened ? ' opened' : '')}>
      {data.points}
      {/* <QuestionModal data={data} /> */}
    </div>
  );
}

export default Question;
