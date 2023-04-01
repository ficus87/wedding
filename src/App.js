import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Stack,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Collapse,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ReactComponent as Logo } from './assets/images/logo.svg';
import { Menu } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Content from './Content';
import { Footer, SidebarMenu } from './components';

const App = () => {
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
  const [navbar, setNavbar] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const onScroll = (e) => {
    const st = window.pageYOffset;
    if (st <= 0) {
        setNavbar(true);
    } else {
        setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawer(false);
  }, [location]);

  return (
    <React.Fragment>
      <SwipeableDrawer
        sx={{ display: { md: 'none' } }}
        anchor="right"
        onOpen={() => setDrawer(true)}
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <SidebarMenu />
      </SwipeableDrawer>
      <AppBar
        component={Box}
        sx={{
          boxShadow: "none",
          position: "sticky"
        }}
      >
        <Toolbar
          sx={{
            justifyContent: { xs: 'space-between', md: 'center' },
            display: "flex",
          }}
        >
          <Stack>
            <Collapse in={isMobile || navbar} style={{ transitionDelay: '0ms' }}>
              <Box component={Link} to="/" sx={{ height: { xs: 40, sm: 70 }, mt: 1, mb: { xs: 1 }, display: 'flex', alignItems: "flex-end", justifyContent: 'center' }}>
                <Logo height="100%" width="100%" />
              </Box>
            </Collapse>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <SidebarMenu />
            </Box>
          </Stack>
          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setDrawer(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Content />
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export default App;
