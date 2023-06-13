import { Add } from '@mui/icons-material';
import { Container, IconButton, List, Stack, Typography, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { AddGuestDialog, GuestItem } from './components';
import { useGuests } from './hooks';
import { useCallback } from 'react';

const Admin = () => {
    const guests = useGuests();
    const [search, setSearch] = useState("");
    const comparator = useCallback(
        c =>
            c.name.toLowerCase().trim().startsWith(search.toLowerCase().trim()) ||
            c.lastname.toLowerCase().trim().startsWith(search.toLowerCase().trim()),
        [search]);
    const [addGuest, setAddGuest] = useState(false);

    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h3">Invitati</Typography>
                        <TextField
                            value={search}
                            onChange={({ target }) => setSearch(target.value)}
                            label="Cerca invitato"
                            variant="outlined"
                            color="info"
                            sx={{ display: { xs: "none", sm: "block" } }}
                            size="small"
                        />
                        <Tooltip title="Aggiungi invitato">
                            <IconButton onClick={() => setAddGuest(true)}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Stack sx={{ display: { xs: "block", sm: "none" } }}>
                        <TextField
                            value={search}
                            onChange={({ target }) => setSearch(target.value)}
                            label="Cerca invitato"
                            variant="outlined"
                            color="info"
                            // sx={{ display: { xs: "none", sm: "block" } }}
                            size="small"
                        />
                    </Stack>
                    <List>
                        {guests.filter(guest => {
                            let found = comparator(guest);
                            if (!found) {
                                found = Boolean(guest?.companions?.find(comparator));
                            }
                            return found;
                        }).map(guest => (
                            <GuestItem key={guest.id} id={guest.id} guest={guest} />
                        ))}
                    </List>
                </Stack>
            </Container>
            <AddGuestDialog open={addGuest} setOpen={setAddGuest} />
        </React.Fragment>
    )
}

export default Admin;