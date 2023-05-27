import { Box, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import HeaderImage from '../assets/images/header.jpeg';
import DecorationImage from '../assets/images/decoration.png';
import WelcomeImage from '../assets/images/welcome.jpg';

const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
        <Box
          component="img"
          width="100%"
          src={HeaderImage}
          alt="..."
        />
        <Box
          // maxWidth="xl"
          sx={{
            position: "absolute",
            pl: 2,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center"
          }}>
          <Box
            sx={{
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "left", sm: "center", md: "center" },
                fontFamily: "garamond",
                color: _ => _.palette.primary.main,
                fontSize: { xs: 22, sm: 34, md: 40, lg: 100 }
              }}
              variant={isMobile ? "body2" : "h2"}
            >
              Francesca
              {/* <br /> */}
              <Box component="br" sx={{ display: { xs: "block", sm: "none" } }} />
              {" "}Iannazzo
              {/* <br /> */}
              <Box component="br" sx={{ display: { xs: "block" } }} />
              &
              {/* <br /> */}
              <Box component="br" sx={{ display: { xs: "block" } }} />
              Giordano
              <Box component="br" sx={{ display: { xs: "block", sm: "none" } }} />
              {" "}Amici
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">

        <Container maxWidth="sm">
          <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
          <Typography variant="h6" sx={{ mb: 4, textAlign: "center" }}>Ci sposiamo!</Typography>
          <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>1 SETTEMBRE 2023</Typography>
          <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>Roma</Typography>
          <Box alt="..." sx={{ rotate: "180deg", mb: 4 }} width="100%" component="img" src={DecorationImage} />
          <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>Benvenuto/a al nostro matrimonio!</Typography>
          <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={WelcomeImage} />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Stiamo organizzando il nostro matrimonio e vogliamo che sia un giorno speciale per tutti.
            <br />
            <br />
            In attesa del grande giorno, abbiamo creato questo sito, dove puoi trovare tutta una serie di informazioni da condividere e i dettagli della nostra storia d'amore.
            <br />
            <br />
            È importante che tu sappia che nella sezione "Conferma la tua presenza" puoi confermare se vieni o no al matrimonio. Dacci risposta il prima possibile per favore: ci renderai più facile l'organizzazione dei preparativi.
            <br />
            <br />
            Goditi il sito e ci vediamo presto! Un abbraccione!
            <br />
          </Typography>
        </Container>
      </Box>
    </Stack>
  )
}

export default Homepage