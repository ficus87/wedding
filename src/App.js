import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Stack,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import FooterImage from './assets/images/footer.jpg'
import Content from './Content';
import { SidebarMenu } from './components';
const App = () => {

  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
  
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
          backgroundColor: "transparent",
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
            <Box sx={{ display: 'flex', alignItems: "flex-end", justifyContent: 'center' }}>
              <Typography component={Link} to="/" sx={{ mb: 0, pb: 0, textDecoration: 'none', color: 'inherit' }} variant="h3">
                F <Box component="small" sx={{ fontSize: 30, color: _ => _.palette.text.disabled }}>&</Box> G
              </Typography>
            </Box>
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
      <Box component="footer" sx={{ color: "white", backgroundColor: "#222" }}>
        <Stack spacing={1}>
          <Box width="100%" component="img" alt="..." src={FooterImage} />
          <Typography sx={{ pl: 2 }} variant="h4">
            Francesca Iannazzo & Giordano Amici
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Box pl={2} pb={2}>
              <Typography variant="subtitle1">
                1 Settembre 2023
              </Typography>
            </Box>
            <Box pr={2} pb={2} alignItems="flex-end" display="flex">
              Powered by Dami with Love
            </Box>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}

export default App;
