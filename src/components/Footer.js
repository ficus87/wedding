import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import FooterImage from '../assets/images/footer.jpg'
import { Waze, Map as MapIcon } from 'mdi-material-ui';
import { Close } from '@mui/icons-material';

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

const MAPS_LAT_INITIAL_CENTER = 41.7863848;
const MAPS_LNG_INITIAL_CENTER = 12.6665115;
const position = [MAPS_LAT_INITIAL_CENTER, MAPS_LNG_INITIAL_CENTER];

const Footer = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const openWithWaze = () => {
        window.open(`https://waze.com/ul?ll=${MAPS_LAT_INITIAL_CENTER},${MAPS_LNG_INITIAL_CENTER}&navigate=yes`)
    };

    const openWithNativeMaps = () => {
        if /* if we're on iOS, open in Apple Maps */
            ((navigator.platform.indexOf("iPhone") !== -1) ||
            (navigator.platform.indexOf("iPad") !== -1) ||
            (navigator.platform.indexOf("iPod") !== -1))
            window.open(`maps://maps.google.com/maps?daddr=${MAPS_LAT_INITIAL_CENTER},${MAPS_LNG_INITIAL_CENTER}&amp;ll=`);
        else /* else use Google */
            window.open(`https://maps.google.com/maps?daddr=${MAPS_LAT_INITIAL_CENTER},${MAPS_LNG_INITIAL_CENTER}&amp;ll=`);
    };

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
                                <MapContainer style={{ height: 430, width: "100%", maxWidth: 830 }} center={position} zoom={13} scrollWheelZoom>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker eventHandlers={{
                                        click: handleMarkClick,
                                    }} position={position} />
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
            <Dialog
                fullWidth
                maxWidth="sm"
                open={openDialog}
            >
                <DialogTitle>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="h6">Apri con</Typography>
                        <Tooltip title="Chiudi">
                            <IconButton
                                onClick={() => setOpenDialog(false)}
                            >
                                <Close />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </DialogTitle>

                <DialogActions>
                    <Button
                        sx={{
                            backgroundColor: "#32ccfe",
                            color: "white"
                        }}
                        variant="contained"
                        onClick={openWithWaze}
                    >
                        {'Waze '}<Waze />
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: "#ea4335!important",
                            color: "white!important"
                        }}
                        variant="contained"
                        onClick={openWithNativeMaps}
                    >
                        {'Mappe '}<MapIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default Footer