import React, { useState } from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import FooterImage from '../assets/images/footer.jpg'
import NavigationDialog from './NavigationDialog';
import { CHURCH } from '../common';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
// const useStyles = makeStyles((theme) => ({
//     mapMargin: {
//         [theme.breakpoints.down('xs')]: {
//             marginBottom: 30
//         }
//     },
// }));



const Footer = () => {
    const [openDialog, setOpenDialog] = useState(false);

    // se vogliamo mettere un link all'indirizzo sul 
    // click va chiamata questa funzione
    // const handleAddressClick = (e) => {
    //     e.preventDefault();
    //     setOpenDialog(true);
    // };

    const handleMarkClick = () => {
        setOpenDialog(true);
    };

    return (
        <React.Fragment>
            <Box component="footer" sx={{ color: "white", backgroundColor: "#222" }}>
                <Stack spacing={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                            <Box height={430} sx={{ my: _ => _.spacing(2), ml: _ => _.spacing(2), mr: { xs: 2, sm: 0 }, width: "100%", display: "flex", justifyContent: "center" }}>
                                <MapContainer style={{ height: 430, width: "100%", maxWidth: 830 }} center={[CHURCH.LAT, CHURCH.LNG]} zoom={13} scrollWheelZoom>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker eventHandlers={{
                                        click: handleMarkClick,
                                    }} position={[CHURCH.LAT, CHURCH.LNG]} />
                                </MapContainer>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                            <Box height={430} sx={{ mr: _ => _.spacing(2), my: _ => _.spacing(2), ml: { xs: 2, sm: 0 }, width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                <Box height={430} component="img" alt="..." src={FooterImage} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography sx={{ pl: 2 }} variant="h4">
                        Francesca Iannazzo & Giordano Amici
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                        <Box pl={2} pb={2} alignItems="flex-end" display="flex">
                            <Typography variant="subtitle1">
                                1 Settembre 2023
                            </Typography>
                        </Box>
                        <Box pr={2} pb={2} alignItems="flex-end" display="flex">
                            <Typography variant="subtitle1">
                                Powered by Dami with Love
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            <NavigationDialog lat={CHURCH.LAT} lng={CHURCH.LNG} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </React.Fragment>
    )
}

export default Footer