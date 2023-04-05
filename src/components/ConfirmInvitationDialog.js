import { Close, Send } from '@mui/icons-material'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../firebase';
import ConfirmInvitationItem from './ConfirmInvitationItem';

const ConfirmInvitationDialog = ({ open, setOpen, name, lastname }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [persons, setPersons] = useState([]);

    const comparator = useCallback(
        c =>
            c.name.toLowerCase().startsWith(name.toLowerCase()) &&
            c.lastname.toLowerCase().startsWith(lastname.toLowerCase()),
        [name, lastname]);

    useEffect(() => {
        if (open) {
            (async () => {
                const guestsQuery = query(collection(db, "guests"))
                const data = await getDocs(guestsQuery);
                setPersons(data.docs.filter(_ => {
                    const __ = _.data()
                    let found = comparator(__);
                    if (!found) {
                        found = Boolean(__.companions.find(comparator));
                    }
                    return found;
                }).map(_ => ({ ..._.data(), id: _.id })))
            })();
        } else {
            setPersons([]);
        }
    }, [open, comparator]);

    const onConfirm = () => {
        try {
            persons.forEach(async person => {
                const { id, ...data } = person;
                await updateDoc(doc(db, "guests", id), data);
            });
            alert("Grazie per aver confermato la tua presenza! :)")
            setOpen(false);
        } catch (e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    };
    
    return (
        <Dialog open={open} maxWidth="sm" fullWidth fullScreen={isMobile}>
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" sx={{ flex: 1 }}>Conferma presenze</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <List>
                    {persons.map((person, idx) => (
                        <React.Fragment key={`invitation-${person.name}-${person.lastname}`}>
                            <ConfirmInvitationItem
                                person={person}
                                checked={persons[idx].confirmed}
                                setChecked={() => setPersons(p => {
                                    const _ = [...p]
                                    _[idx].confirmed = !_[idx].confirmed
                                    return _
                                })} 
                            />
                            {person.companions.map((companion, i) => (
                                <ConfirmInvitationItem
                                    key={`companion-${companion.name}-${companion.lastname}`}
                                    person={companion}
                                    setChecked={() => setPersons(p => {
                                        const _ = [...p];
                                        _[idx].companions[i].confirmed = !_[idx].companions[i].confirmed
                                        return _
                                    })}
                                    checked={persons[idx].companions[i].confirmed}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Send />}
                        onClick={onConfirm}
                    >
                        Conferma
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<Close />}
                        onClick={() => setOpen(false)}
                    >
                        Annulla
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmInvitationDialog;