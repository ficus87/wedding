import React, { useState } from 'react'
import { Box, Container, Typography, Divider, Link } from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';
import { NavigationDialog } from '../components';
import { CHURCH, RECEIPT } from '../common';

const Where = () => {
  const [openChurchDialog, setOpenChurchDialog] = useState(false);
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  
  const handleChurchAddressClick = (e) => {
    e.preventDefault();
    setOpenChurchDialog(true);
  };

  const handleReceiptAddressClick = (e) => {
    e.preventDefault();
    setOpenReceiptDialog(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
        <Container maxWidth="sm">
          <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
          <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>La chiesa</Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
            Celebreremo il nostro matrimonio nell'abbazia di san Nilo.
            <br />
            Si trova in{" "} 
            <Link href="#" onClick={handleChurchAddressClick} color="inherit" variant="body1">
              Corso del popolo 128 - Grottaferrata
            </Link>
          </Typography>
          <Divider />
          <Typography variant="h3" sx={{ my: 4, textAlign: "center" }}>Il ricevimento</Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
              A seguire il ricevimento si svolgerà presso{" "}
              <Link href="#" onClick={handleReceiptAddressClick} color="inherit" variant="body1">
                Via di vermicino 333 - Roma
              </Link>
            </Typography>
          <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
        </Container>
      </Box>
      <NavigationDialog lat={CHURCH.LAT} lng={CHURCH.LNG} openDialog={openChurchDialog} setOpenDialog={setOpenChurchDialog} />
      <NavigationDialog lat={RECEIPT.LAT} lng={RECEIPT.LNG} openDialog={openReceiptDialog} setOpenDialog={setOpenReceiptDialog} />
    </React.Fragment>
  )
}

export default Where