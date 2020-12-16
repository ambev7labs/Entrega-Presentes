import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


export default function (props) {
    return (
        <div style={{ marginTop: '5%' }}>
            <FormControl fullWidth error={props.erro} component="fieldset">
                <FormLabel component="legend">{props.questao}{<span style={{ color: 'red' }}> *</span>}</FormLabel>
                <TextField fullWidth style={{ marginTop: '5%' }} id="outlined-basic" label={props.label} variant="outlined" value={props.value} onChange={(e) => props.set(e.target.value)} />
                <FormHelperText>{props.mensagemErro}</FormHelperText>
            </FormControl>
        </div>
    )
}

