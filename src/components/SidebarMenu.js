import { Divider, List, ListItemButton } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SELECTED_STYLE = {
    "&.Mui-selected": {
        backgroundColor: _ => `${_.palette.primary.main}44`
    },
    ":hover": {
        backgroundColor: _ => `${_.palette.primary.main}44`
    }
};

const SidebarMenu = () => {
    const location = useLocation();
    return (
        <List sx={{ display: { md: 'flex' } }}>
            <ListItemButton
                sx={SELECTED_STYLE}
                selected={location.pathname === "/"}
                component={Link}
                to="/">
                Benvenuti!
            </ListItemButton>
            <Divider sx={{ display: { xs: 'none', md: 'flex' } }} flexItem orientation="vertical" />
            <ListItemButton
                sx={SELECTED_STYLE}
                selected={location.pathname === "/blog"}
                component={Link}
                to="/blog">
                Blog di nozze
            </ListItemButton>
            <Divider sx={{ display: { xs: 'none', md: 'flex' } }} flexItem orientation="vertical" />
            <ListItemButton
                sx={SELECTED_STYLE}
                selected={location.pathname === "/where"}
                component={Link}
                to="/where">
                I luoghi
            </ListItemButton>
            <Divider sx={{ display: { xs: 'none', md: 'flex' } }} flexItem orientation="vertical" />
            <ListItemButton
                sx={SELECTED_STYLE}
                selected={location.pathname === "/invitation"}
                component={Link}
                to="/invitation">
                Conferma la tua presenza
            </ListItemButton>
            <Divider sx={{ display: { xs: 'none', md: 'flex' } }} flexItem orientation="vertical" />
            <ListItemButton
                sx={SELECTED_STYLE}
                selected={location.pathname === "/contact"}
                component={Link}
                to="/contact">
                Contattaci
            </ListItemButton>
            <Divider sx={{ display: { xs: 'none', md: 'flex' } }} flexItem orientation="vertical" />
            <ListItemButton
                sx={SELECTED_STYLE}
                selected={location.pathname === "/message"}
                component={Link}
                to="/message">
                Libro delle visite
            </ListItemButton>
        </List>
    )
}

export default SidebarMenu