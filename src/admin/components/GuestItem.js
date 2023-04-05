import { Delete, GroupAdd } from '@mui/icons-material'
import { Checkbox, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Stack } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import AddGroupDialog from './AddGroupDialog'

const GuestItem = ({ guest: { name, lastname, companions, confirmed }, id }) => {
    const [openGroupAdd, setOpenGroupAdd] = useState(false);

    const handleDeleteGuest = async () => {
        try {
            await deleteDoc(doc(db, "guests", id));
            alert(`${name} ${lastname} eliminato correttamente dagli invitati`);
        } catch (e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    };

    return (
        <React.Fragment>
            <ListItem divider>
                <ListItemText 
                    primary={<span>
                        {name} {lastname}<Checkbox color="info" checked={confirmed} />
                    </span>}
                    secondaryTypographyProps={{ component: "div" }}
                    secondary={
                        <List disablePadding>
                            {companions?.map(({ name, lastname, confirmed }) => (
                                <ListItem key={`${name}-${lastname}-companion`} sx={{ pr: 0, py: 0 }}>
                                    {name} {lastname} <Checkbox color="info" checked={confirmed} />
                                </ListItem>
                            ))}
                        </List>
                    }
                />
                <ListItemSecondaryAction>
                    <Stack direction="row" spacing={2}>
                        <IconButton onClick={() => setOpenGroupAdd(true)}>
                            <GroupAdd />
                        </IconButton>
                        <IconButton onClick={handleDeleteGuest}>
                            <Delete />
                        </IconButton>
                    </Stack>
                </ListItemSecondaryAction>
            </ListItem>
            <AddGroupDialog initCompanions={companions || []} name={name} lastname={lastname} open={openGroupAdd} setOpen={setOpenGroupAdd} idMainGuest={id} />
        </React.Fragment>
    )
}

export default GuestItem