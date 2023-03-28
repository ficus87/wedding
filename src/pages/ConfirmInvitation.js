import React from 'react';
import { Stack, Box, Container, Divider, Grid, Typography, Button, TextField } from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';
import { useForm } from '../hooks';

const ConfirmInvitation = () => {
  const validations = [];
  const { values, changeHandler } = useForm({}, validations);

  const handleSearch = () => {
    console.log(values);
  };

  return (
    <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
      <Container maxWidth="sm">
        <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
        <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>Ci accompagni o te lo perdi?</Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
        Per confermare la vostra presenza alle nozze vi basterà scrivere il vostro nome e cliccare su Cerca. Una volta trovati, dovrete solo indicarci se verrete o no al matrimonio (se volete, potete lasciare un messaggio. È opzionale, ma ci farebbe tanto piacere leggerlo!). :)
        </Typography>
        <Divider />
        {/* FOOOORM text:nome text:cognome bottone:cerca */}
        <Grid component="form" sx={{ mt: 4 }} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              variant="outlined"
              label="Nome"
              fullWidth
              color="info"
              value={values.firstname}
              onChange={({ target }) => changeHandler("firstname", target.value)}
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
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack 
              direction="row" 
              justifyContent={{ xs: "flex-end", sm: "center" }}
            >
              <Button 
                variant="contained"
                color="info"
                type="submit" 
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch()
                }}
              >Cerca</Button>
            </Stack>
          </Grid>
        </Grid>
        <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
      </Container>
    </Box>
  )
}

export default ConfirmInvitation