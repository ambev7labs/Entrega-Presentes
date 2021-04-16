import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Feedback(props) {
    const { handleClose, open, data } = props;
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="alert-dialog-slide-title">{"Feedback"}</DialogTitle>
        <DialogContent style={{ width: '300px' }}>
          <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
            {data === undefined ?
              <CircularProgress />
              :
              <>
                {data.msg}
              </>
            }
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
}