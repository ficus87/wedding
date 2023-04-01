import { Close } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Waze, Map as MapIcon } from 'mdi-material-ui'
import React from 'react'

const NavigationDialog = ({ openDialog, setOpenDialog, lat, lng }) => {

    const openWithWaze = () => {
        window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`)
    };

    const openWithNativeMaps = () => {
        if /* if we're on iOS, open in Apple Maps */
            ((navigator.platform.indexOf("iPhone") !== -1) ||
            (navigator.platform.indexOf("iPad") !== -1) ||
            (navigator.platform.indexOf("iPod") !== -1))
            window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
        else /* else use Google */
            window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
    };
  return (
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
  )
}

export default NavigationDialog