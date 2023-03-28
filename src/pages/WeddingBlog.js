import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';

const WeddingBlog = () => {
  return (
    <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
      <Container maxWidth="sm">
        <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
        <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>Blog di nozze</Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          Attenzione, attenzione! Resta collegato a questa sezione perché qua troverai le notizie più fresche sull'organizzazione del matrimonio ;)
        </Typography>
        <Divider />
        <Typography variant="h3" sx={{ my: 4, textAlign: "center" }}>La nostra storia</Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          Ciao a tutti!
          <br />
          <br />
          Questo è il blog di quello che sarà il giorno più importante della nostra vita: il nostro matrimonio!!!
          <br />
          <br />
          Sarà una giornata unica e vorremmo condividere con voi questo momento così speciale. Abbiamo ancora un sacco di cosette da ultimare. Questo blog ci servirà per aggiornarvi su tutte le novità e per raccontarvi come procede l'organizzazione, quanto ci stiamo stressando e quanto siamo felici!
          <br />
          <br />
          Speriamo che vi piaccia e che vi divertiate come noi! Un abbraccio fortissimo!!!
        </Typography>
        <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
      </Container>
    </Box>
  )
}

export default WeddingBlog