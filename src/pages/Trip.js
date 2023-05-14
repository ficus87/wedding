import React from 'react'
import { Button, Box, Container, Divider, Typography, Chip, Snackbar, IconButton, List, ListItem } from '@mui/material';
import DecorationImage from '../assets/images/decoration.png';
import { useState } from 'react';
import { ContentCopy } from '@mui/icons-material';

const IBAN = "IT27N0329601601000067476165";

const Trip = () => {
    const [open, setOpen] = useState(false);
    const [disabledRipple, setDisableRipple] = useState(false);
    const disableRipple = () => { setDisableRipple(true) }
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
        navigator.clipboard.writeText(IBAN);
    };

    return (
        <Box sx={{ py: 2, backgroundColor: _ => _.palette.primary.main }} component="section">
            <Container maxWidth="sm">
                <Box alt="..." width="100%" sx={{ my: 4 }} component="img" src={DecorationImage} />
                <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>Lista di nozze</Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: "start" }}>
                La tua presenza è per noi il regalo più bello
                <br />
                <br />
                Ma se un dono farci vorrai
                <br />
                <br />
                Con questa lista di nozze non sbaglierai:
                </Typography>
                <List disablePadding>
                    <ListItem>Soldi</ListItem>
                    <ListItem>Monete</ListItem>
                    <ListItem>Quattrini</ListItem>
                    <ListItem>Palanche</ListItem>
                    <ListItem>Valuta</ListItem>
                    <ListItem>Denaro</ListItem>
                    <ListItem>Piotte</ListItem>
                    <ListItem>Euro</ListItem>
                    <ListItem>Bonifico</ListItem>
                </List>
                <Typography variant="body1" sx={{ mb: 4, textAlign: "start" }}>
                Il tuo contributo ci aiuterà a realizzare il nostro viaggio di nozze oltreoceano
                <br />
                <br />
                Grazie di cuore ❤️
                </Typography>
                <Box width="100%" mb={2} display="flex" justifyContent="center" alignItems="center">
                    <Chip
                        component={Button}
                        onClick={handleClick}
                        focusRipple={false}
                        centerRipple={false}
                        disableRipple={disabledRipple}
                        disableElevation={disabledRipple}
                        disableFocusRipple={disabledRipple}
                        disableTouchRipple={disabledRipple}
                        skipFocusWhenDisabled
                        sx={{
                            width: "75%"
                        }}
                        icon={
                            <IconButton 
                                sx={{ zIndex: 2000 }} 
                                component="span" 
                                onMouseDown={handleClick} 
                                onMouseEnter={e => {
                                    disableRipple()
                                    e.stopPropagation()
                                }}
                                onMouseLeave={e => e.stopPropagation()}
                                onMouseOver={e => e.stopPropagation()}
                                size="small">
                                <ContentCopy fontSize="small" />
                            </IconButton>
                        }
                        label={IBAN}
                        variant="outlined"
                    />
                </Box>
                <Snackbar
                    open={open}
                    onClose={() => setOpen(false)}
                    autoHideDuration={2000}
                    message="Copiato negli appunti!"
                />
                <Divider />
                <Box alt="..." sx={{ rotate: "180deg", mt: 4 }} width="100%" component="img" src={DecorationImage} />
            </Container>
        </Box>
    )
}

export default Trip