import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useStyles from './styles.js';

import Feedback from './Feedback.js'
import CustomInput from './CustomInput.js';

const img = require("./Logo.png");

export default function App() {
  const classes = useStyles();

  const [id, setId] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const [idError, setIdError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [data, setData] = React.useState(undefined);

  async function fetchData() {
    const response = await fetch('https://prod-162.westus.logic.azure.com:443/workflows/f3153871e5734f82aa83fda144885ec4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PuTDh7VyQ-yMqN5K6fFJ70-y6T-SMHLMKqH0Ekw4nwE', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    const json = await response.json();
    console.log(json)
    setData(json);
  }

  const handleCheckError = () => {
    let hasError = false;
    if (id === '') {
      hasError = true;
      setIdError(true);
    }
    else {
      setIdError(false);
    }
    if (hasError) {
      setErrorMessage("Há opções que não foram marcadas!");
      return true;
    }
    else {
      setErrorMessage('');
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleCheckError()) {
      setOpen(true);
      await fetchData();
      setId('');;
      window.scrollTo(0, 0);
    }

  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div style={{ background: '#000', display: 'flex', padding: '50px', fontSize: '38px', }}>
          <div style={{ color: 'white', fontSize: "0.75em" }}>
            Entrega de Máscaras
          </div>
          <div style={{ margin: "0 0 0 auto" }}>
            <img src={img} style={{width: "1.5em"}} alt="7labs logo" />
          </div>
        </div>
        <div style={{ display: 'block', padding: '10%' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

            <CustomInput erro={idError} label={"ID"} questao={"1. Qual o seu ID?"} value={id} set={setId} mensagemErro={errorMessage} />
            <div style={{ marginTop: "5%" }}>
              <Button variant="contained" type="submit" color="primary" style={{ color: "white", backgroundColor: "rgb(0, 0, 0)" }} onClick={handleSubmit}>Enviar</Button>
              <Feedback handleClose={() => { setOpen(false); setData(undefined) }} open={open} data={data} />
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}
