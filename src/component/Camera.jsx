import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import useImageStore from "../store/useImageStore";

import { Button, Grid, Typography } from "@mui/material";


const videoConstraints = {
    width: 540,
    facingMode: "environment"
};

const Camera = () => {
    const webcamRef = useRef(null);
    //const [url, setUrl] = React.useState(null);
    const imageUrl = useImageStore((state) => state.imageUrl)
    const setImageUrl = useImageStore((state) => state.setImageUrl)
    const clear = useImageStore((state) => state.clear)

    const capturePhoto = React.useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageUrl(imageSrc);

    }, [webcamRef]);

    const onUserMedia = (e) => {
        console.log(e);
    };

    console.log(imageUrl)

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ 
                //backgroundColor: "green" 
            }}
        >

            <Grid
                mt={3}
                container
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                sx={{ 
                    width: "50%", 
                //backgroundColor: "brown" 
            }}

            >
                <Grid item >
                    <Button variant="contained" onClick={capturePhoto} >Chụp Hình</Button>
                </Grid>

                <Grid item >
                    <Button variant="contained" onClick={() => clear()} >Refresh</Button>
                </Grid>
            </Grid>



            <Grid item xs={12} mt={3}>
                <Webcam
                    ref={webcamRef}
                    audio={true}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                />
            </Grid>

            <Grid item xs={12} mt={1}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ 
                        width: "100%",
                        //backgroundColor: "brown" 
                        }}
                >

                    <Typography variant="h4" >Hình Ảnh Thu Được</Typography>


                </Grid>


                <Grid item xs={12} mb={3}>
                    {imageUrl && (
                        <div>
                            <img src={imageUrl} alt="Screenshot" />
                        </div>
                    )}
                </Grid>
            </Grid>

        </Grid>
    );
};

export default Camera;