import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useStyles from './styles.js';

import Feedback from './Feedback.js'
import CustomInput from './CustomInput.js';
import CustomSelect from './CustomSelect.js';
import Buttons from './Buttons.js';
import CustomRadio from './CustomRadio.js';

export default function App() {
  const classes = useStyles();

  const [id, setId] = React.useState('');
  const [area, setArea] = React.useState('');
  const [equipamento, setEquipamento] = React.useState('');
  const [descarteUm, setDescarteUm] = React.useState('');
  const [descarteDois, setDescarteDois] = React.useState('');
  const [descarteTres, setDescarteTres] = React.useState('');
  const [volumeTotal, setVolumeTotal] = React.useState('');
  const [tempo, setTempo] = React.useState('');
  const [totalDescartes, setTotalDescartes] = React.useState(1);
  const [concentracao, setConcentracao] = React.useState("")

  const [open, setOpen] = React.useState(false);

  const [idError, setIdError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [data, setData] = React.useState(undefined);

  async function fetchData() {
    const response = await fetch('https://prod-123.westus.logic.azure.com:443/workflows/0a2b6fcc7ae64dc3af2097d4078b7633/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ceBAuZzfKeSwm_9SE4FwAIGAgkO5JI_tR_MogQ6vT1M', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, area, equipamento, descarteUm, descarteDois, descarteTres, volumeTotal, tempo, data: Date.now(), concentracao })
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
    console.log('oi')
    event.preventDefault();
    if (!handleCheckError()) {
      setOpen(true);
      await fetchData();

      setId('');
      setArea('');
      setEquipamento('');
      setDescarteUm('');
      setDescarteDois('');
      setDescarteTres('');
      setVolumeTotal('');
      setTempo('');
      setTotalDescartes(1); 
      setConcentracao('');  
      window.scrollTo(0,0);   
    }

  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div style={{ background: '#008272', display: 'block', padding: '50px', fontSize: '38px', }}>

          <div style={{ color: 'white' }}>
            Descarte ETEI
          </div>
        </div>
        <div style={{ display: 'block', padding: '10%' }}>
          <CustomInput erro={idError} label={"ID"} questao={"1. Qual o seu ID?"} value={id} set={setId} mensagemErro={errorMessage} />
          <CustomSelect opcoes={["Brassagem 1","Brassagem 2","Filtração 1","Filtração 2","Adegas","CIP 796"]} erro={idError} questao={"2. Qual a sua área?"} set={setArea} value={area} mensagemErro={errorMessage}/>
          <CustomInput erro={idError} label={"Equipamento"} questao={"3. Qual o equipamento?"} value={equipamento} set={setEquipamento} mensagemErro={errorMessage} />
          <CustomInput erro={idError} label={"Descarte 1"} questao={"4.1 Produto descartado 1?"} value={descarteUm} set={setDescarteUm} mensagemErro={errorMessage} />

          {totalDescartes === 2 ?
            <CustomInput erro={idError} label={"Descarte 2"} questao={"4.2 Produto descartado 2?"} value={descarteDois} set={setDescarteDois} mensagemErro={errorMessage} />

            : totalDescartes === 3 ?
              <>
                <CustomInput erro={idError} label={"Descarte 2"} questao={"4.2 Produto descartado 2?"} value={descarteDois} set={setDescarteDois} mensagemErro={errorMessage} />
                <CustomInput erro={idError} label={"Descarte 3"} questao={"4.3 Produto descartado 3?"} value={descarteTres} set={setDescarteTres} mensagemErro={errorMessage} />
              </>
              :
              null
          }

          <Buttons total={totalDescartes} set={setTotalDescartes}/>

          <CustomInput erro={idError} label={"Volume"} questao={"5. Qual o volume total a ser descartado?"} value={volumeTotal} set={setVolumeTotal} mensagemErro={errorMessage} />

          <CustomRadio opcoes={["15 minutos","30 minutos","60 minutos", "90 minutos"]} questao={"6. Qual o tempo de descarte?"} erro={idError} value={tempo} set={setTempo} mensagemErro={errorMessage}/>
          <CustomInput erro={idError} label={"Concentração"} questao={"7. Qual a concentração?"} value={concentracao} set={setConcentracao} mensagemErro={errorMessage} />

          <div style={{ marginTop: "5%" }}>
            <Button variant="contained" type="submit" color="primary" style={{ color: "white" }} onClick={handleSubmit}>Enviar</Button>
            <Feedback handleClose={() => setOpen(false)} open={open} data={data} />
          </div>
        </div>
      </Paper>
    </div>
  );
}
