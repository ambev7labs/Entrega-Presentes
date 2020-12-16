import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';



export default function (props) {
    return (
        <div>
            <IconButton aria-label="delete" onClick={() => {
              if (props.total < 3) {
                props.set(props.total + 1);
              }
            }}>
              <Add fontSize="small" />
            </IconButton>

            <IconButton aria-label="delete"
              onClick={() => {
                if (props.total > 1) {
                  props.set(props.total - 1);
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
    )
}

