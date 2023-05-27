import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material';
import { imagesName } from '../common';
import { useState } from 'react';
import { useEffect } from 'react';

const Footer = () => {

    const [image, setImage] = useState('');
    const [opacity, setOpacity] = useState(0);
    const randomImage = (currentImage = "") => {
        const newImage = imagesName[Math.floor(Math.random() * imagesName.length)]
        if(currentImage === newImage) {
            return randomImage(currentImage);
        } else {
            return newImage;
        }
    };
    useEffect(() => {
        let isMount = true;
        const _image = randomImage();
        // setOpacity(1);
        setImage(_image);
        const interval = setInterval(() => {
            setOpacity(0);
            setTimeout(() => {
                const _image = randomImage(image);
                if (isMount) {
                    setImage(_image);
                    // setOpacity(1);
                }
            }, 400);
        }, 5000);
        return () => {
            isMount = false;
            clearInterval(interval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (image) {
            setTimeout(() => {
                setOpacity(1);
            }, 400);
        }
    }, [image]);
    return (
        <React.Fragment>
            <Box component="footer" sx={{ color: "white", backgroundColor: "#222" }}>
                <Stack spacing={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{
                            height: "450px",
                            pt:0,
                            display: "inline-block",
                            textAlign: "center",
                            width: "auto",
                            mt: { xs: 0, sm: 2 }
                        }}>
                            <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                                {image &&
                                    // <Box width="100%" maxHeight="440px" maxWidth="830px" component="img" alt="..." src={require(`../assets/images/footer.jpg`)} />
                                    <Box
                                        width="auto"
                                        height="auto"
                                        maxHeight="434px"
                                        maxWidth="100%"
                                        component="img"
                                        sx={{
                                            transition: "opacity 0.4s ease-in",
                                            opacity,
                                        }}
                                        alt="..."
                                        src={require(`../assets/images/moreImages/${image}`)}
                                    />
                                }
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography sx={{ pl: 2 }} variant="h4">
                        Francesca & Giordano
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
        </React.Fragment>
    )
}

export default Footer