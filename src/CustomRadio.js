import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export default function (props) {
    return (
        <div style={{ marginTop: '5%' }}>
            <FormControl fullWidth error={props.erro} component="fieldset">
                <FormLabel component="legend">{props.questao}{<span style={{ color: 'red' }}> *</span>}</FormLabel>
                <RadioGroup style={{ marginTop: '5%' }} aria-label="gender" name="gender1" value={props.value} onChange={(e) => props.set(e.target.value)}>
                    {props.opcoes.map((ele)=>{
                        return <FormControlLabel value={ele} control={<Radio />} label={ele} />
                    })}
                <FormHelperText>{props.mensagemErro}</FormHelperText>
              </RadioGroup>
            </FormControl>
        </div>
    )
}
