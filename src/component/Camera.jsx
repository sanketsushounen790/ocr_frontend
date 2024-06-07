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
            style={{ backgroundColor: "green" }}
        >
            <Grid item xs={12}
            md={6}
                style={{ width: "100%" }}
            >
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: "100%", backgroundColor: "brown" }}
                >
                    <Grid item md={6}>
                        <Button variant="contained" onClick={capturePhoto} >Chup Hinh</Button>
                    </Grid>

                    <Grid item md={6}>
                        <Button variant="contained" onClick={() => clear()} >Refresh</Button>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12} mt={4}>
                <Webcam
                    ref={webcamRef}
                    audio={true}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                />
            </Grid>

            <Grid item xs={12}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: "500px", backgroundColor: "brown" }}
                >
                    <Grid item xs={12}>
                        <Typography>Hinh anh thu duoc</Typography>
                    </Grid>

                </Grid>


                <div >
                    {imageUrl && (
                        <div>
                            <img src={imageUrl} alt="Screenshot" />
                        </div>
                    )}
                </div>
            </Grid>

        </Grid>
    );
};

export default Camera;