import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Context } from '../Context';
import { useContext } from 'react';

export default function ConfirmDialog() {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const { confirmDialogOpen, handleConfirmDialogClose, onSubmitDialog, onOpenQuestion, handleQuestionModalOpen, refreshParameters } = useContext(Context);



  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleConfirmDialogOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose}>Disagree</Button>
          <Button onClick={() => onSubmitDialog()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}




// import React, { useContext, useState } from 'react'

// import { Button, Modal } from '@mui/material';
// import { Context } from '../Context';



// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 900,
//     height: 600,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };


// export default function ConfirmModal() {
//     const { setConfirmModalState, confirmModalState, handleConfirmModalClose, handleConfirmModalOpen,
//         handleQuestionModalOpen } = useContext(Context)



//     return (
//         <div>
//             <Modal
//                 open={confirmModalState}
//                 onClose={handleConfirmModalClose}
//             >
//                 <span>Are You Sure You Want To Open This Question?</span>
//                 <Button onClick={() => { handleQuestionModalOpen() }}>Yes</Button>
//                 <Button onClick={() => { handleConfirmModalClose() }}>No</Button>

//             </Modal>
//         </div>
//     )
// }


