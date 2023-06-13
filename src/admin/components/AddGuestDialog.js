import React, { useEffect } from 'react'
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
    Button 
} from '@mui/material';
import { Add, Close, Update } from '@mui/icons-material';
import { useForm } from '../../hooks'
import { isRequired } from '../../hooks/useForm'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AddGuestDialog = ({ edit, open, setOpen }) => {
    const validations = [
        ({ name }) => isRequired(name) || { name: "Inserisci il nome per favore :)"},
        ({ lastname }) => isRequired(lastname) || { lastname: "Inserisci il cognome per favore :)"}
    ];
    const { values, changeHandler, errors, touched, isValid, reset, setValues } = useForm({ 
        name: "", 
        lastname: "", 
        prefix: "" 
    }, validations);

    useEffect(() => {
        if (!open) {
            reset();
        } else if (edit) {
            setValues({
                name: edit.name || "",
                lastname: edit.lastname || "",
                prefix: edit.prefix || "",
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleUpdateGuest = async () => {
        try {
            const { name, lastname, prefix } = values;
            await updateDoc(doc(db, "guests", edit.id), { name, lastname, prefix });
            alert(`${values.prefix}${values.prefix && " "}${values.name} ${values.prefix ? "" : values.lastname} aggiornato correttamente`)
            setOpen(false);
        } catch (e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    };
    const handleAddGuest = async () => {
        try {
            await addDoc(collection(db, "guests"), values);
            alert(`${values.prefix}${values.prefix && " "}${values.name} ${values.prefix ? "" : values.lastname} aggiunto correttamente agli invitati`)
            setOpen(false);
        } catch (e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    };

    return (
        <Dialog onClose={() => setOpen(false)} open={open} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" sx={{ flex: 1 }}>{edit ? "Aggiorna" : "Aggiungi"} invitato</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Grid pt={1} container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            variant="outlined"
                            label="Prefisso"
                            color="info"
                            fullWidth
                            value={values.prefix || ""}
                            onChange={({ target }) => changeHandler("prefix", target.value)}
                            error={Boolean(touched.prefix && errors.prefix)}
                            helperText={touched.prefix && errors.prefix}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            variant="outlined"
                            label="Nome"
                            color="info"
                            fullWidth
                            value={values.name || ""}
                            onChange={({ target }) => changeHandler("name", target.value)}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            variant="outlined"
                            label="Cognome"
                            color="info"
                            fullWidth
                            value={values.lastname || ""}
                            onChange={({ target }) => changeHandler("lastname", target.value)}
                            error={Boolean(touched.lastname && errors.lastname)}
                            helperText={touched.lastname && errors.lastname}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="success" 
                        startIcon={edit ? <Update /> : <Add />}
                        disabled={!isValid}
                        onClick={edit ? handleUpdateGuest : handleAddGuest}
                    >
                        {edit ? "Aggiorna" : "Aggiungi"}
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

export default AddGuestDialog