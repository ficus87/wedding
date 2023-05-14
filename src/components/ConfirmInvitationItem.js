import React from 'react';
import { Checkbox, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
// import { Check, Close } from '@mui/icons-material';

const ConfirmInvitationItem = ({ person, checked, setChecked }) => {
    const { name, lastname, prefix } = person;
    let completeName = `${name} ${lastname}`;
    if(prefix) {
        completeName = `${prefix} ${name}`;
    }
    return (
        <ListItem divider>
            <ListItemText primary={completeName} />
            <ListItemSecondaryAction>
                {/* <Button
                    color="primary"
                    variant="contained"
                    startIcon={checked ? <Check color="success" /> : <Close color="error" />}
                    onClick={() => setChecked(_ => !_)}
                >
                    Conferma
                </Button> */}
                <Checkbox
                    color="info"
                    checked={checked}
                    onChange={() => setChecked(_ => !_)}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ConfirmInvitationItem