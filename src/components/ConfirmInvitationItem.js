import React from 'react';
import { Checkbox, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';

const ConfirmInvitationItem = ({ person, checked, setChecked }) => {
    const { name, lastname } = person;
    
    return (
        <ListItem divider>
            <ListItemText primary={`${name} ${lastname}`} />
            <ListItemSecondaryAction>
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