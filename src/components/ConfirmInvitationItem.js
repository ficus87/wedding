import React from 'react';
import { Checkbox, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';

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
                <Checkbox
                    color="info"
                    checked={Boolean(checked)}
                    onChange={() => setChecked(_ => !_)}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ConfirmInvitationItem