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
          Hai dubbi su cosa indossare? Non sai se puoi portare i bimbi?<br/> 
          Se vuoi farci qualche domanda o commentare qualcosa, scriveteci su whatsapp. Grazie!
        </Typography>
        <Divider />
        <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
      </Container>
    </Box>
  )
}

export default ContactUs