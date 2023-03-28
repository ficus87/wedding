import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';

const ContactUs = () => {
  return (
    <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
      <Container maxWidth="sm">
        <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
        <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>Qualche dubbio?</Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
        Avete dubbi su cosa indossare? Non sapete se potete portare i bimbi? Se volete farci qualche domanda o commentare qualcosa, scriveteci qui. Leggeremo i vostri messaggi direttamente via email. Grazie!
        </Typography>
        <Divider />
        {/* FOOOORM text:nome text:cognome bottone:cerca */}
        {/* <Grid component="form" sx={{ mt: 4 }} container spacing={2}>
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
        </Grid> */}
        <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
      </Container>
    </Box>
  )
}

export default ContactUs