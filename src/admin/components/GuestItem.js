import { Check, Close, Delete, Edit, GroupAdd } from '@mui/icons-material'
import { Tooltip, Typography, Checkbox, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Stack, Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import AddGroupDialog from './AddGroupDialog';
import moment from 'moment'
import AddGuestDialog from './AddGuestDialog'

const GuestItem = ({ guest: { sent, name, lastname, companions, confirmed, confirmDate }, id }) => {
    const [openGroupAdd, setOpenGroupAdd] = useState(false);
    const [confirmDatetime, setConfirmDatetime] = useState()
    const [openConfirm, setOpenConfirm] = useState(false);
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        if (confirmDate) {
            setConfirmDatetime(
                moment(confirmDate.toDate()).format("DD/MM/YYYY HH:mm")
            );
        }
    }, [setConfirmDatetime, confirmDate]);

    const handleDeleteGuest = async () => {
        try {
            await deleteDoc(doc(db, "guests", id));
            alert(`${name} ${lastname} eliminato correttamente dagli invitati`);
        } catch (e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    };
    const handleUpdateSentInvitation = async () => {
        try {
            await updateDoc(doc(db, "guests", id), { sent: true })
            alert(`${name} ${lastname} segnato come invito mandato`);
        } catch (e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    }

    return (
        <React.Fragment>
            <ListItem divider>
                <ListItemText
                    primary={<span>
                        {name} {lastname}<Checkbox sx={{ pointerEvents: "none" }} color="info" checked={confirmed} />
                    </span>}
                    secondaryTypographyProps={{ component: "div" }}
                    secondary={
                        <List disablePadding>
                            {companions?.map(({ name, lastname, confirmed }) => (
                                <ListItem key={`${name}-${lastname}-companion`} sx={{ pr: 0, py: 0 }}>
                                    {name} {lastname} <Checkbox sx={{ pointerEvents: "none" }} color="info" checked={confirmed} />
                                </ListItem>
                            ))}
                        </List>
                    }
                />
                <ListItemSecondaryAction>
                    <Stack>
                        <Typography variant="body2">
                            {confirmDatetime}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title={sent ? "In attesa di risposta" : "Invito da mandare"}>
                                <IconButton onClick={sent ? () => { } : handleUpdateSentInvitation}>
                                    {sent
                                        ? <Check />
                                        : <Close />
                                    }
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Gestione gruppi">
                                <IconButton onClick={() => setOpenGroupAdd(true)}>
                                    <GroupAdd />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Modifica">
                                <IconButton onClick={() => setEdit({ name, lastname, companions, confirmed, confirmDate, id })}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Elimina">
                                <IconButton onClick={() => setOpenConfirm(true)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </ListItemSecondaryAction>
            </ListItem>
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" sx={{ flex: 1 }}>Conferma elimina</Typography>
                        <IconButton onClick={() => setOpenConfirm(false)}>
                            <Close />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogActions>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button color="warning" onClick={() => setOpenConfirm(false)} size="small">
                            Annulla
                        </Button>
                        <Button onClick={() => {
                            handleDeleteGuest();
                            setOpenConfirm(false);
                        }} variant="contained" size="small" color="error">
                            Conferma
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
            <AddGroupDialog initCompanions={companions || []} name={name} lastname={lastname} open={openGroupAdd} setOpen={setOpenGroupAdd} idMainGuest={id} />
            <AddGuestDialog edit={edit} open={Boolean(edit)} setOpen={setEdit} />
        </React.Fragment>
    )
}

export default GuestItem