import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Stack,
    Typography,
    Grid,
    TextField,
    Button,
    useMediaQuery,
    useTheme,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    List
} from '@mui/material';
import { Add, Close, Delete } from '@mui/icons-material';
import { useForm } from '../../hooks'
import { isRequired } from '../../hooks/useForm'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AddGuestCompanionForm = ({ onAdd }) => {
    const validations = [
        ({ name }) => isRequired(name) || { name: "Obbligatorio" },
        ({ lastname }) => isRequired(lastname) || { lastname: "Obbligatorio" }
    ];
    const { values, changeHandler, errors, touched, isValid, reset } = useForm({ name: "", lastname: "" }, validations);

    return (
        <Stack component="form" direction="row" spacing={1} alignItems="center" width="100%">
            <TextField
                variant="outlined"
                label="Nome"
                sx={{ flex: 1 }}
                autoFocus
                color="info"
                value={values.name}
                onChange={({ target }) => changeHandler("name", target.value)}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
            />
            <TextField
                variant="outlined"
                sx={{ flex: 1 }}
                label="Cognome"
                value={values.lastname}
                onChange={({ target }) => changeHandler("lastname", target.value)}
                error={Boolean(touched.lastname && errors.lastname)}
                helperText={touched.lastname && errors.lastname}
            />
            <IconButton type="submit" disabled={!isValid} onClick={(e) => {
                e.preventDefault();
                onAdd(values);
                reset();
            }}>
                <Add />
            </IconButton>
        </Stack>
    );
}
const AddGroupDialog = ({ open, setOpen, idMainGuest, name, lastname, initCompanions }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [companions, setCompanions] = useState(initCompanions);

    useEffect(() => {
        if(!open) {
            setCompanions(initCompanions);
        }
    }, [open]);

    const handleAddGuest = async () => {
        try {
            await updateDoc(doc(db, "guests", idMainGuest), {
                companions
            });
            alert("Accompagnatori aggiunti correttamente");
            setOpen(false);
        } catch(e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth fullScreen={isMobile}>
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" sx={{ flex: 1 }}>Accompagnatori per {name} {lastname}</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <List>
                    {companions.map(({ name, lastname }, index) => (
                        <ListItem key={`${name}-${lastname}`}>
                            <ListItemText primary={`${name} ${lastname}`} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => setCompanions(_ => {
                                    let __ = [..._];
                                    __.splice(index, 1)
                                    return __;
                                })}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    <ListItem>
                        <AddGuestCompanionForm onAdd={(newItem) => setCompanions(_ => [..._, newItem])} />
                    </ListItem>
                </List>

            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Add />}
                        onClick={handleAddGuest}
                    >
                        Aggiungi
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
    )
}

export default AddGroupDialog