import React, { useState } from 'react'
import { Box, Container, Typography, Divider, Link } from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';
import { NavigationDialog } from '../components';
import { CHURCH, RECEIPT } from '../common';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const Where = () => {
  const [openChurchDialog, setOpenChurchDialog] = useState(false);
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  

  const handleChurchAddressClick = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    setOpenChurchDialog(true);
  };

  const handleReceiptAddressClick = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    setOpenReceiptDialog(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
        <Container maxWidth="sm">
          <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
          <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>La chiesa</Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
            La cerimonia inizierà alle 16:30 presso l'Abbazia greca di San Nilo.
            {/* Celebreremo il nostro matrimonio presso l'Abbazia greca di San Nilo. */}
            <br />
            {/* in{" "}  */}
            📍{" "}
            <Link href="#" onClick={handleChurchAddressClick} color="inherit" variant="body1">
             Corso del popolo 128 - Grottaferrata
            </Link>.
            <br/>
            É possibile parcheggiare all'interno.
          </Typography>
          <Box height={430} sx={{ my: _ => _.spacing(2), mr: { xs: 2, sm: 0 }, width: "100%", display: "flex", justifyContent: "center" }}>
            <MapContainer style={{ height: 430, width: "100%", maxWidth: 830 }} center={[CHURCH.LAT, CHURCH.LNG]} zoom={13} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker eventHandlers={{
                    click: handleChurchAddressClick,
                }} position={[CHURCH.LAT, CHURCH.LNG]} />
            </MapContainer>
          </Box>
          <Divider />
          <Typography variant="h3" sx={{ my: 4, textAlign: "center" }}>Il ricevimento</Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
              A seguire il ricevimento si svolgerà presso la Collinetta.
              <br/>
              📍{" "}
              <Link href="#" onClick={handleReceiptAddressClick} color="inherit" variant="body1">
                Via di vermicino 333 - Roma
              </Link>
            </Typography>
            <Box height={430} sx={{ my: _ => _.spacing(2), mr: { xs: 2, sm: 0 }, width: "100%", display: "flex", justifyContent: "center" }}>
            <MapContainer style={{ height: 430, width: "100%", maxWidth: 830 }} center={[RECEIPT.LAT, RECEIPT.LNG]} zoom={13} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker eventHandlers={{
                    click: handleReceiptAddressClick,
                }} position={[RECEIPT.LAT, RECEIPT.LNG]} />
            </MapContainer>
          </Box>
          <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
        </Container>
      </Box>
      <NavigationDialog lat={CHURCH.LAT} lng={CHURCH.LNG} openDialog={openChurchDialog} setOpenDialog={setOpenChurchDialog} />
      <NavigationDialog lat={RECEIPT.LAT} lng={RECEIPT.LNG} openDialog={openReceiptDialog} setOpenDialog={setOpenReceiptDialog} />
    </React.Fragment>
  )
}

export default Where