import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


export default function (props) {
    return (
        <div style={{ marginTop: '5%' }}>
            <FormControl variant="outlined" fullWidth error={props.erro} component="fieldset">
                <FormLabel label="Outlined" component="legend">{props.questao}{<span style={{ color: 'red' }}> *</span>}</FormLabel>
                <InputLabel style={{ marginTerrorMessageop: '7.5%' }} id="demo-simple-select-outlined-label"></InputLabel>
                <Select
                    style={{ marginTop: '5%' }}
                    labelId="demo-simple-select-outlined-label"f
                    id="demo-simple-select-outlined"
                    value={props.value}
                    onChange={(e) => props.set(e.target.value)}
                >
                    {props.opcoes.map((ele)=>{
                        return <MenuItem value={ele}>{ele}</MenuItem>
                    })}
                </Select>
                <FormHelperText>{props.mensagemErro}</FormHelperText>
            </FormControl>
        </div>
    )
}

