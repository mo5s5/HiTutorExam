import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Context } from '../Context';
import { useContext } from 'react';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function QuestionModal() {


  const { handleModalClose, modalState, closeAnswer, submitAnswer, modalObject, answer, setAnswer } = useContext(Context)

  const handleAnswer = (event) => {
    setAnswer(event.target.value)

  }

  // console.log({studentObject});

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={modalState}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Answer to this Question
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalObject.text}
          </Typography>
          <TextField
            inputProps={{
              style: {
                // height: '400px',
                width: '870px'
              },
            }}
            multiline
            rows={15}
            onChange={handleAnswer}
            value={answer}>

          </TextField>
          <Stack direction={'row'} spacing={4} marginTop='1rem'>
            <Button onClick={() => closeAnswer()} variant='contained' color='error'>Close</Button>
            <Button onClick={() => submitAnswer()} variant='contained'
              disabled={!answer}
            >Submit</Button>
          </Stack>

        </Box>
      </Modal>
    </div>
  );
}