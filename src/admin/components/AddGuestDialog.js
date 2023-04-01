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
import { Add, Close } from '@mui/icons-material';
import { useForm } from '../../hooks'
import { isRequired } from '../../hooks/useForm'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const AddGuestDialog = ({ open, setOpen }) => {
    const validations = [
        ({ name }) => isRequired(name) || { name: "Inserisci il tuo nome per favore :)"},
        ({ lastname }) => isRequired(lastname) || { lastname: "Inserisci il tuo cognome per favore :)"}
    ];
    const { values, changeHandler, errors, touched, isValid, reset } = useForm({ name: "", lastname: "" }, validations);

    useEffect(() => {
        if(!open) {
            reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleAddGuest = async () => {
        try {
            await addDoc(collection(db, "guests"), values);
            alert(`${values.name} ${values.lastname} aggiunto correttamente agli invitati`)
            setOpen(false);
        } catch (e) {
            console.error(e);
            alert(`Errore: ${String(e)}`);
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Stack direction="row">
                    <Typography variant="h4">Aggiungi invitato</Typography>
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
                            label="Nome"
                            color="info"
                            fullWidth
                            value={values.name}
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
                            value={values.lastname}
                            onChange={({ target }) => changeHandler("lastname", target.value)}
                            error={Boolean(touched.lastname && errors.lastname)}
                            helperText={touched.lastname && errors.lastname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="success" 
                        startIcon={<Add />}
                        disabled={!isValid}
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

export default AddGuestDialog