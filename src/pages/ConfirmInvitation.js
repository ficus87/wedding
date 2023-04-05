import React, { useState } from 'react';
import { Stack, Box, Container, Divider, Grid, Typography, Button, TextField } from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';
import { useForm } from '../hooks';
import { isRequired } from '../hooks/useForm';
import { ConfirmInvitationDialog } from '../components';

const ConfirmInvitation = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const validations = [
    ({ name }) => name?.length >= 3 || { name: "Minimo 3 caratteri" },
    ({ name }) => isRequired(name) || { name: "Obbligatorio" },
    ({ lastname }) => lastname?.length >= 3 || { lastname: "Minimo 3 caratteri" },
    ({ lastname }) => isRequired(lastname) || { lastname: "Obbligatorio" },
  ];
  const { values, changeHandler, errors, touched, isValid } = useForm({}, validations);

  return (
    <React.Fragment>
      <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
        <Container maxWidth="sm">
          <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
          <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>Ci accompagni o te lo perdi?</Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
            Per confermare la vostra presenza alle nozze vi basterà scrivere il vostro nome e cliccare su Cerca. Una volta trovati, dovrete solo indicarci se verrete o no al matrimonio (se volete, potete lasciare un messaggio. È opzionale, ma ci farebbe tanto piacere leggerlo!). :)
          </Typography>
          <Divider />
          <Grid component="form" sx={{ mt: 4 }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Nome"
                fullWidth
                color="info"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                value={values.name || ""}
                onChange={({ target }) => changeHandler("name", target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Cognome"
                color="info"
                fullWidth
                error={Boolean(touched.lastname && errors.lastname)}
                helperText={touched.lastname && errors.lastname}
                value={values.lastname || ""}
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
                  disabled={!isValid}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenConfirm(true);
                  }}
                >Cerca</Button>
              </Stack>
            </Grid>
          </Grid>
          <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
        </Container>
      </Box>
      <ConfirmInvitationDialog 
        lastname={values.lastname} 
        name={values.name} 
        onConfirm={() => console.log("onConfirm")} 
        open={openConfirm} 
        setOpen={setOpenConfirm} 
      />
    </React.Fragment>
  )
}

export default ConfirmInvitation