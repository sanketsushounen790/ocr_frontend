import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Camera from './Camera';
import Convert from './Convert';

const CameraCaptureWrapper = () => {
    return (
        <Grid
            pb={3}
            container
            direction="row"
            alignItems="start"
            justifyContent="center"
            sx={{ 
                height: '110vh', 
                width: "100%", 
                //backgroundColor: "yellow", 
                border: 0 }}
        >
            <Grid item xs={12} md={6}>
                <Camera />
            </Grid>

            <Grid item xs={12} md={6}>
                <Convert />
            </Grid>
        </Grid>
    );
}

export default CameraCaptureWrapper