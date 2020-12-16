import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SimpleDialog(props) {
    const { handleClose, open,data } = props;

    fetch('http://localhost:8080/').then(resp=>{
        console.log(resp);
    })

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="alert-dialog-slide-title">{"Feedback"}</DialogTitle>
            <DialogContent style={{ width: '300px' }}>
                <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                    {!data ?
                        <CircularProgress />
                        :
                        <>
                            Dados sobre a parada
                        </>
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>

            </DialogActions>
        </Dialog>
    );
}
