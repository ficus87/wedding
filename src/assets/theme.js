import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2d5863",
        contrastText: "#ffffff"
      }
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollbarColor: "#6b6b6b #2b2b2b",
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                backgroundColor: "transparent",
                // backgroundColor: "#2b2b2b",
                width: 5,
                height: 5,
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: "#6b6b6b",
                // border: "3px solid #2b2b2b",
              },
              "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                backgroundColor: "#959595",
              },
              "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                backgroundColor: "#959595",
              },
              "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#959595",
              },
              "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                backgroundColor: "#2b2b2b",
              },
            },
          },
        },
      },
});

export default theme;