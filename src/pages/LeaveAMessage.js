import React from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  Grid,
  TextField,
  Stack,
  Button,
  List,
  Card,
} from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';
import { useForm, useMessages } from '../hooks';
import { isRequired } from '../hooks/useForm';
import { Send } from '@mui/icons-material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const format = (data) => {
  return `${data.getDate()}/${String(data.getMonth() + 1).padStart(2, "0")}/${data.getFullYear()}, ${String(data.getHours()).padStart(2, "0")}:${String(data.getMinutes()).padStart(2, "0")}`
};

const LeaveAMessage = () => {
  const validations = [
    ({ message }) => isRequired(message) || { message: "Campo obbligatorio" },
    ({ name }) => isRequired(name) || { name: "Campo obbligatorio" }
  ];
  const messages = useMessages();
  const { reset, values, changeHandler, errors, touched, isValid } = useForm({
    message: "",
    name: ""
  }, validations);

  const handleSend = async () => {
    try {
      await addDoc(collection(db, "messages"), { ...values, datetime: new Date() });
      // alert(`${values.name} ${values.lastname} aggiunto correttamente agli invitati`)
      reset();
    } catch (e) {
      console.error(e);
      alert(`Errore: ${String(e)}`);
    }
  };
  
  return (
    <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
      <Container maxWidth="sm">
        <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
        <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>Lascia il tuo messaggio</Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          Riempi d'amore e allegria questa pagina!<br />
          Lasciaci un messaggio.<br />
          La tua energia è contagiosa!
        </Typography>
        <Divider />
        <Grid component="form" sx={{ mt: 4 }} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              multiline
              label="Scrivi qui"
              fullWidth
              color="info"
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
              value={values.message}
              onChange={({ target }) => changeHandler("message", target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Chi ci scrive?"
                  fullWidth
                  color="info"
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  value={values.name}
                  onChange={({ target }) => changeHandler("name", target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent={{ xs: "flex-end" }}
            >
              <Button
                variant="contained"
                color="info"
                disabled={!isValid}
                startIcon={<Send />}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSend()
                }}
              >Invia</Button>
            </Stack>
          </Grid>
        </Grid>
        <Box alt="..." sx={{ rotate: "180deg", my: 4 }} width="100%" component="img" src={DecorationImage} />
        <List>
          {messages.sort((a, b) => b.datetime.toDate() - a.datetime.toDate()).map(({ id, datetime, name, message }) => (
            <Card key={id} sx={{ width: "100%", p: 2, mb: 2, minHeight: "100px", display: "flex" }}>
              <Stack direction="column" flex={1} justifyContent="space-between">
                <span>
                  {message}
                </span>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">
                    {format(datetime.toDate())}
                  </Typography>
                  <Typography variant="subtitle2">
                    {name}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          ))}
        </List>
      </Container>
    </Box>
  )
}

export default LeaveAMessage