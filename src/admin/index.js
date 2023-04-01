import { Add } from '@mui/icons-material';
import { Container, IconButton, List, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { AddGuestDialog, GuestItem } from './components';
import { useGuests } from './hooks';

const Admin = () => {
    const guests = useGuests();
    const [addGuest, setAddGuest] = useState(false);
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h3">Invitati</Typography>
                        <IconButton onClick={() => setAddGuest(true)}>
                            <Add />
                        </IconButton>
                    </Stack>
                    <List>
                        {guests.map(guest => (
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